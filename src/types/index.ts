// ============================================================
// TYPES — Brainrot University
// ============================================================

export interface Department {
  id: string;
  code: string;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  emoji: string;
  professor: string;
  professorTitle: string;
  courses: string[]; // course IDs
  stats: {
    students: number;
    courses: number;
    creditHours: number;
  };
}

export interface Course {
  id: string;
  code: string;
  title: string;
  departmentId: string;
  professorId: string;
  difficulty: string;
  difficultyColor: string;
  credits: number;
  duration: string;
  description: string;
  syllabus: string[];
  quizId: string;
  tags: string[];
}

export interface Professor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  bio: string;
  quote: string;
  qualifications: string[];
  courseIds: string[];
  emoji: string;
  specialty: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  feedback: string[];
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
  secret: boolean;
  unlockHint?: string;
}

export type GradeLevel =
  | 'SIGMA_SUMMA_CUM_LAUDE'
  | 'CERTIFIED_AURA_ENGINEER'
  | 'FUNCTIONAL_NPC'
  | 'ACADEMICALLY_COOKED'
  | 'PROFESSIONAL_DELULU'
  | 'DROPOUT_IN_SPIRIT';

export interface GradeResult {
  percentage: number;
  correct: number;
  incorrect: number;
  grade: GradeLevel;
  gradeLabel: string;
  feedback: string;
  eligible: boolean;
}

export interface ExamResult {
  id: string;
  quizId: string;
  courseId: string;
  courseName: string;
  score: number;
  total: number;
  percentage: number;
  grade: GradeLevel;
  gradeLabel: string;
  answers: number[];
  completedAt: string;
  certificateEligible: boolean;
}

export interface Certificate {
  id: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  departmentName: string;
  grade: string;
  gradeLabel: string;
  professorName: string;
  issuedAt: string;
  certificateCode: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  studentId: string;
  createdAt: string;
  enrolledCourses: string[];
  completedCourses: string[];
  examResults: ExamResult[];
  certificates: Certificate[];
  achievements: string[];
  currentTitle: string;
  crestClickCount: number;
  konamiActivated: boolean;
  secretCourseUnlocked: boolean;
  consecutiveQuizzes: number;
  totalCorrectAnswers: number;
  darkModeEnabled: boolean;
}

export interface HallOfFameEntry {
  id: string;
  name: string;
  title: string;
  achievement: string;
  grade: string;
  score: number;
  emoji: string;
  isReal: boolean;
}

export type PageName =
  | 'home'
  | 'departments'
  | 'courses'
  | 'course-detail'
  | 'exam'
  | 'results'
  | 'portal'
  | 'hall-of-fame'
  | 'faculty'
  | 'secret';
