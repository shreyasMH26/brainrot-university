import { useState, useCallback, useEffect } from 'react';
import type { StudentProfile, ExamResult, Certificate } from '../types';
import {
  loadProfile,
  saveProfile,
  clearProfile,
  createDefaultProfile,
  generateCertificateCode,
} from '../utils/storage';
import { checkAchievements } from '../utils/achievements';
import { calculateGrade } from '../utils/grading';
import { courses } from '../data/courses';
import { getProfessorById } from '../data/professors';

export function useStudentProgress() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [recentAchievements, setRecentAchievements] = useState<string[]>([]);

  useEffect(() => {
    const stored = loadProfile();
    setProfile(stored);
    setIsLoaded(true);
  }, []);

  const updateProfile = useCallback(
    (updater: (prev: StudentProfile) => StudentProfile) => {
      setProfile((prev) => {
        if (!prev) return prev;
        const updated = updater(prev);
        saveProfile(updated);
        return updated;
      });
    },
    []
  );

  const createProfile = useCallback((name: string) => {
    const newProfile = createDefaultProfile(name);
    saveProfile(newProfile);
    setProfile(newProfile);
    return newProfile;
  }, []);

  const resetProfile = useCallback(() => {
    clearProfile();
    setProfile(null);
  }, []);

  const enrollCourse = useCallback(
    (courseId: string) => {
      updateProfile((prev) => {
        if (prev.enrolledCourses.includes(courseId)) return prev;
        const updated = {
          ...prev,
          enrolledCourses: [...prev.enrolledCourses, courseId],
        };
        const { newlyUnlocked } = checkAchievements(updated);
        if (newlyUnlocked.length > 0) {
          setRecentAchievements(newlyUnlocked.map((a) => a.id));
        }
        return updated;
      });
    },
    [updateProfile]
  );

  const submitExamResult = useCallback(
    (result: Omit<ExamResult, 'id'>, quizDurationMs?: number, questionTimeMs?: number) => {
      updateProfile((prev) => {
        // Prevent duplicate: same quizId, same score, within 5 seconds
        const recentDupe = prev.examResults.find(
          (r) =>
            r.quizId === result.quizId &&
            r.percentage === result.percentage &&
            Date.now() - new Date(r.completedAt).getTime() < 5000
        );
        if (recentDupe) return prev;

        const fullResult: ExamResult = {
          ...result,
          id: crypto.randomUUID(),
        };

        // Count retakes
        const retakeCount = prev.examResults.filter(
          (r) => r.quizId === result.quizId
        ).length;

        // Mark course completed if passed
        const newCompleted = result.certificateEligible
          ? [...new Set([...prev.completedCourses, result.courseId])]
          : prev.completedCourses;

        // Build certificate if eligible and not already earned
        const existingCert = prev.certificates.find(
          (c) => c.courseId === result.courseId
        );
        let newCertificates = prev.certificates;

        if (result.certificateEligible && !existingCert) {
          const course = courses.find((c) => c.id === result.courseId);
          const prof = course ? getProfessorById(course.professorId) : undefined;
          if (course) {
            const cert: Certificate = {
              id: crypto.randomUUID(),
              studentName: prev.name,
              courseId: result.courseId,
              courseTitle: result.courseName,
              departmentName: course.departmentId,
              grade: result.grade,
              gradeLabel: result.gradeLabel,
              professorName: prof?.name || 'Professor Braincell',
              issuedAt: new Date().toISOString(),
              certificateCode: generateCertificateCode(result.courseId),
            };
            newCertificates = [...prev.certificates, cert];
          }
        }

        const updated: StudentProfile = {
          ...prev,
          examResults: [...prev.examResults, fullResult],
          completedCourses: newCompleted,
          certificates: newCertificates,
          consecutiveQuizzes: prev.consecutiveQuizzes + 1,
          totalCorrectAnswers: prev.totalCorrectAnswers + result.score,
        };

        const { newlyUnlocked, newTitle } = checkAchievements(updated, {
          quizId: result.quizId,
          percentage: result.percentage,
          quizDurationMs,
          courseId: result.courseId,
          retakeCount,
          questionTimeMs,
        });

        updated.currentTitle = newTitle;

        if (newlyUnlocked.length > 0) {
          setTimeout(() => {
            setRecentAchievements(newlyUnlocked.map((a) => a.id));
          }, 500);
        }

        return updated;
      });
    },
    [updateProfile]
  );

  const incrementCrestClick = useCallback(() => {
    updateProfile((prev) => {
      const newCount = prev.crestClickCount + 1;
      const updated = { ...prev, crestClickCount: newCount };
      if (newCount >= 7) {
        const { newlyUnlocked } = checkAchievements(updated);
        if (newlyUnlocked.length > 0) {
          setRecentAchievements(newlyUnlocked.map((a) => a.id));
        }
      }
      return updated;
    });
  }, [updateProfile]);

  const activateKonami = useCallback(() => {
    updateProfile((prev) => {
      if (prev.konamiActivated) return prev;
      const updated = { ...prev, konamiActivated: true };
      const { newlyUnlocked } = checkAchievements(updated);
      if (newlyUnlocked.length > 0) {
        setRecentAchievements(newlyUnlocked.map((a) => a.id));
      }
      return updated;
    });
  }, [updateProfile]);

  const unlockSecretCourse = useCallback(() => {
    updateProfile((prev) => {
      if (prev.secretCourseUnlocked) return prev;
      return { ...prev, secretCourseUnlocked: true };
    });
  }, [updateProfile]);

  const clearRecentAchievements = useCallback(() => {
    setRecentAchievements([]);
  }, []);

  const updateName = useCallback(
    (name: string) => {
      updateProfile((prev) => {
        const updated = { ...prev, name };
        const { newlyUnlocked } = checkAchievements(updated);
        if (newlyUnlocked.length > 0) {
          setRecentAchievements(newlyUnlocked.map((a) => a.id));
        }
        return updated;
      });
    },
    [updateProfile]
  );

  return {
    profile,
    isLoaded,
    recentAchievements,
    createProfile,
    resetProfile,
    enrollCourse,
    submitExamResult,
    incrementCrestClick,
    activateKonami,
    unlockSecretCourse,
    clearRecentAchievements,
    updateName,
    calculateGrade,
  };
}
