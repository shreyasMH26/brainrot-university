import type { StudentProfile, ExamResult, Certificate } from '../types';

const STORAGE_KEY = 'bu-student-profile';
const VERSION = '1.0';

export function generateStudentId(): string {
  const prefix = 'BU';
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `${prefix}${year}-${random}`;
}

export function generateCertificateCode(courseId: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const course = courseId.replace(/-/g, '').toUpperCase().slice(0, 6);
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `BU-${course}-${timestamp}-${random}`;
}

export function createDefaultProfile(name: string): StudentProfile {
  return {
    id: crypto.randomUUID(),
    name,
    studentId: generateStudentId(),
    createdAt: new Date().toISOString(),
    enrolledCourses: [],
    completedCourses: [],
    examResults: [],
    certificates: [],
    achievements: [],
    currentTitle: 'Prospective Dropout',
    crestClickCount: 0,
    konamiActivated: false,
    secretCourseUnlocked: false,
    consecutiveQuizzes: 0,
    totalCorrectAnswers: 0,
    darkModeEnabled: false,
  };
}

export function loadProfile(): StudentProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Version migration could happen here
    if (!parsed.version || parsed.version !== VERSION) {
      // Migrate or return null for full reset
    }
    return parsed.data as StudentProfile;
  } catch {
    return null;
  }
}

export function saveProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: VERSION, data: profile }));
  } catch {
    console.error('Failed to save profile to localStorage');
  }
}

export function clearProfile(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasCompletedExam(profile: StudentProfile, quizId: string): boolean {
  return profile.examResults.some((r) => r.quizId === quizId);
}

export function getLatestExamResult(
  profile: StudentProfile,
  quizId: string
): ExamResult | undefined {
  return profile.examResults
    .filter((r) => r.quizId === quizId)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0];
}

export function getCertificateForCourse(
  profile: StudentProfile,
  courseId: string
): Certificate | undefined {
  return profile.certificates.find((c) => c.courseId === courseId);
}

export function getRetakeCount(profile: StudentProfile, quizId: string): number {
  return profile.examResults.filter((r) => r.quizId === quizId).length;
}

export function getAverageScore(profile: StudentProfile): number {
  if (profile.examResults.length === 0) return 0;
  const sum = profile.examResults.reduce((acc, r) => acc + r.percentage, 0);
  return Math.round(sum / profile.examResults.length);
}
