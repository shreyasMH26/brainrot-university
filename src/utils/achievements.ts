import type { StudentProfile, Achievement } from '../types';
import { achievements } from '../data/achievements';
import { courses } from '../data/courses';

export type AchievementUnlockResult = {
  newlyUnlocked: Achievement[];
  newTitle: string;
};

const ACADEMIC_TITLES = [
  { required: 0, title: 'Prospective Dropout' },
  { required: 1, title: 'Freshman of Delusion' },
  { required: 3, title: 'Certified Braincell Survivor' },
  { required: 5, title: 'Academic Comeback Merchant' },
  { required: 8, title: 'Chronically Enrolled' },
  { required: 12, title: 'Sigma Scholar' },
  { required: 16, title: 'Dean\'s Questionable List' },
  { required: 20, title: 'Master of Academic Damage' },
  { required: 25, title: 'Supreme Chancellor of Brainrot' },
];

function getAcademicTitle(profile: StudentProfile): string {
  // Check for special titles based on achievements
  if (profile.achievements.includes('all-courses')) {
    return 'Supreme Chancellor of Brainrot';
  }
  if (profile.achievements.includes('secret-course')) {
    return 'The Forbidden Scholar';
  }
  if (profile.achievements.includes('perfect-score') && profile.completedCourses.length >= 10) {
    return 'Quantum Genius';
  }
  if (profile.achievements.includes('konami-code')) {
    return 'Chronically Online Since Birth';
  }

  // Default title based on completed quizzes
  const completed = profile.examResults.length;
  let title = 'Prospective Dropout';
  for (const tier of ACADEMIC_TITLES) {
    if (completed >= tier.required) {
      title = tier.title;
    }
  }
  return title;
}

export function checkAchievements(
  profile: StudentProfile,
  context: {
    quizId?: string;
    percentage?: number;
    quizDurationMs?: number;
    courseId?: string;
    retakeCount?: number;
    questionIndex?: number;
    questionTimeMs?: number;
  } = {}
): AchievementUnlockResult {
  const newlyUnlocked: Achievement[] = [];
  const already = new Set(profile.achievements);

  function unlock(id: string) {
    if (!already.has(id)) {
      const ach = achievements.find((a) => a.id === id);
      if (ach) {
        newlyUnlocked.push(ach);
        already.add(id);
      }
    }
  }

  // Enrollment
  if (profile.enrolledCourses.length >= 1) {
    unlock('enrolled');
  }

  // Quiz count
  const totalQuizzes = profile.examResults.length;
  if (totalQuizzes >= 1) unlock('first-steps');
  if (totalQuizzes >= 3) unlock('three-quizzes');
  if (totalQuizzes >= 5) unlock('five-quizzes');
  if (totalQuizzes >= 10) unlock('ten-quizzes');

  // Certificates
  if (profile.certificates.length >= 1) unlock('first-certificate');
  if (profile.certificates.length >= 5) unlock('five-certificates');

  // Score-based
  if (context.percentage !== undefined) {
    if (context.percentage === 100) unlock('perfect-score');
    if (context.percentage >= 90) unlock('high-achiever');
    const passingScore = 50;
    if (
      context.percentage >= passingScore &&
      context.percentage <= passingScore + 5
    ) {
      unlock('barely-passed');
    }
    if (context.percentage < passingScore) {
      unlock('failed-first');
    }
  }

  // Department completions
  const deptCourses: Record<string, string[]> = {};
  courses
    .filter((c) => c.id !== 'SECRET-666')
    .forEach((c) => {
      if (!deptCourses[c.departmentId]) deptCourses[c.departmentId] = [];
      deptCourses[c.departmentId].push(c.id);
    });

  const achievementMap: Record<string, string> = {
    delusion: 'delusion-department',
    unproductive: 'unproductive-department',
    rizz: 'rizz-department',
    grass: 'grass-department',
    brainrot: 'brainrot-department',
  };

  for (const [deptId, achievementId] of Object.entries(achievementMap)) {
    const deptCourseIds = deptCourses[deptId] || [];
    const allCompleted = deptCourseIds.every((id) =>
      profile.completedCourses.includes(id)
    );
    if (allCompleted && deptCourseIds.length > 0) {
      unlock(achievementId);
    }
  }

  // All courses
  const standardCourses = courses.filter((c) => c.id !== 'SECRET-666');
  if (
    standardCourses.every((c) => profile.completedCourses.includes(c.id))
  ) {
    unlock('all-courses');
  }

  // Secret course
  if (profile.completedCourses.includes('SECRET-666')) {
    unlock('secret-course');
  }

  // Crest clicks
  if (profile.crestClickCount >= 7) unlock('crest-clicker');

  // Konami
  if (profile.konamiActivated) unlock('konami-code');

  // Retake master
  if (context.retakeCount !== undefined && context.retakeCount >= 3) {
    unlock('retake-master');
  }

  // Midnight study
  const hour = new Date().getHours();
  if ((hour >= 2 && hour < 4) && totalQuizzes > 0) {
    unlock('midnight-study');
  }

  // Name = Braincell
  if (profile.name.toLowerCase() === 'braincell') {
    unlock('name-braincell');
  }

  // Speed runner
  if (context.quizDurationMs !== undefined && context.quizDurationMs < 30000) {
    unlock('speedrunner');
  }

  // Method actor — spent 60+ seconds on a DEL-101 question
  if (
    context.courseId === 'DEL-101' &&
    context.questionTimeMs !== undefined &&
    context.questionTimeMs > 60000
  ) {
    unlock('overthinker-irl');
  }

  // Update profile achievements
  profile.achievements = Array.from(already);

  // Calculate new title
  const newTitle = getAcademicTitle(profile);
  profile.currentTitle = newTitle;

  return { newlyUnlocked, newTitle };
}
