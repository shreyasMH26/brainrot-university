import type { GradeLevel, GradeResult } from '../types';

export const GRADE_THRESHOLDS: Array<{
  min: number;
  grade: GradeLevel;
  label: string;
  feedback: string;
  eligible: boolean;
}> = [
  {
    min: 95,
    grade: 'SIGMA_SUMMA_CUM_LAUDE',
    label: 'SIGMA SUMMA CUM LAUDE',
    feedback:
      'Extraordinary. You have achieved a score so high that it threatens the academic fabric of this unaccredited institution. Your braincell has transcended. The university acknowledges this without understanding how it happened.',
    eligible: true,
  },
  {
    min: 85,
    grade: 'CERTIFIED_AURA_ENGINEER',
    label: 'CERTIFIED AURA ENGINEER',
    feedback:
      'Outstanding performance. Your aura is not only present but measurable. You have demonstrated that you possess both brainrot and academic rigour — a combination we did not think possible when we founded this place. Which was never.',
    eligible: true,
  },
  {
    min: 70,
    grade: 'FUNCTIONAL_NPC',
    label: 'FUNCTIONAL NPC',
    feedback:
      'You passed. You followed the script sufficiently. Your answers were correct enough. A functional NPC is not glamorous but it is passing, and passing is all this institution can legally require of you — by which we mean morally, since we have no legal standing.',
    eligible: true,
  },
  {
    min: 50,
    grade: 'ACADEMICALLY_COOKED',
    label: 'ACADEMICALLY COOKED',
    feedback:
      'You passed. Barely. Like a meal left in the oven approximately forty minutes too long. The structure is there. The nutritional value is debatable. We recommend a retake, some water, and a moment of honest self-reflection.',
    eligible: true,
  },
  {
    min: 25,
    grade: 'PROFESSIONAL_DELULU',
    label: 'PROFESSIONAL DELULU',
    feedback:
      'You have failed this examination. However, your confidence throughout was admirable. A Professional Delulu is someone who answers incorrectly with the energy of someone who answered correctly. We respect this. The grade, however, stands.',
    eligible: false,
  },
  {
    min: 0,
    grade: 'DROPOUT_IN_SPIRIT',
    label: 'DROP-OUT IN SPIRIT',
    feedback:
      'This result suggests you may have confused answering questions with roulette. A Drop-Out in Spirit has not technically left the institution, which makes it worse. The certificate cannot be issued. The shame, however, can.',
    eligible: false,
  },
];

export function calculateGrade(
  correct: number,
  total: number,
  passingScore: number = 50
): GradeResult {
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  const incorrect = total - correct;

  const threshold = GRADE_THRESHOLDS.find((t) => percentage >= t.min)!;

  return {
    percentage,
    correct,
    incorrect,
    grade: threshold.grade,
    gradeLabel: threshold.label,
    feedback: threshold.feedback,
    eligible: percentage >= passingScore,
  };
}

export function getGradeColor(grade: GradeLevel): string {
  const colors: Record<GradeLevel, string> = {
    SIGMA_SUMMA_CUM_LAUDE: '#C6FF00',
    CERTIFIED_AURA_ENGINEER: '#88FF88',
    FUNCTIONAL_NPC: '#F0EBDD',
    ACADEMICALLY_COOKED: '#FF6B35',
    PROFESSIONAL_DELULU: '#641C2B',
    DROPOUT_IN_SPIRIT: '#888888',
  };
  return colors[grade];
}

export function getGradeEmoji(grade: GradeLevel): string {
  const emojis: Record<GradeLevel, string> = {
    SIGMA_SUMMA_CUM_LAUDE: '💎',
    CERTIFIED_AURA_ENGINEER: '✨',
    FUNCTIONAL_NPC: '🤖',
    ACADEMICALLY_COOKED: '🔥',
    PROFESSIONAL_DELULU: '🌀',
    DROPOUT_IN_SPIRIT: '💀',
  };
  return emojis[grade];
}
