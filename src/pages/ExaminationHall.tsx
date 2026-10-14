import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Award,
} from 'lucide-react';
import { getQuizByCourseId } from '../data/quizzes';
import { getCourseById, courses as allCourses } from '../data/courses';
import { calculateGrade } from '../utils/grading';
import type { StudentProfile, ExamResult } from '../types';

type Step = 'pre' | 'exam' | 'review' | 'results';

interface Props {
  profile: StudentProfile | null;
  onSubmitResult: (
    result: Omit<ExamResult, 'id'>,
    quizDurationMs?: number,
    questionTimeMs?: number
  ) => void;
}

const TIMER_SECONDS = 60;

const ExaminationHall: React.FC<Props> = ({ profile, onSubmitResult }) => {
  const { courseId } = useParams<{ courseId: string }>();

  const quiz = courseId ? getQuizByCourseId(courseId) : undefined;
  const course = courseId ? getCourseById(courseId) : undefined;

  const [step, setStep] = useState<Step>('pre');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [showConfirm, setShowConfirm] = useState(false);
  const [retakeMode, setRetakeMode] = useState(false);
  const [questionTimings, setQuestionTimings] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const alreadyCompleted =
    profile && courseId ? (profile.completedCourses ?? []).includes(courseId) : false;

  // Auto-advance on timer expiry
  const handleTimeUp = useCallback(() => {
    if (!quiz) return;
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      if (updated[currentQuestion] === undefined) updated[currentQuestion] = -1;
      return updated;
    });
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setQuestionStartTime(new Date());
    } else {
      setStep('review');
    }
  }, [quiz, currentQuestion]);

  // Timer logic
  useEffect(() => {
    if (step !== 'exam' || !timerEnabled) return;

    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return TIMER_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step, currentQuestion, timerEnabled, handleTimeUp]);

  const beginExam = () => {
    const now = new Date();
    setStartTime(now);
    setQuestionStartTime(now);
    setStep('exam');
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuestionTimings([]);
    setTimeLeft(TIMER_SECONDS);
  };

  const selectAnswer = (answerIndex: number) => {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = answerIndex;
      return updated;
    });
  };

  const goNext = () => {
    if (!quiz) return;
    if (questionStartTime) {
      const elapsed = Date.now() - questionStartTime.getTime();
      setQuestionTimings((prev) => {
        const updated = [...prev];
        updated[currentQuestion] = elapsed;
        return updated;
      });
    }
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setQuestionStartTime(new Date());
      if (timerEnabled) setTimeLeft(TIMER_SECONDS);
    } else {
      setStep('review');
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
      setQuestionStartTime(new Date());
      if (timerEnabled) setTimeLeft(TIMER_SECONDS);
    }
  };

  const submitExam = () => {
    if (!quiz || !course || !startTime) return;

    const quizDurationMs = Date.now() - startTime.getTime();
    const avgQuestionTimeMs =
      questionTimings.length > 0
        ? questionTimings.reduce((a, b) => a + b, 0) / questionTimings.length
        : undefined;

    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) correctCount++;
    });

    const gradeResult = calculateGrade(correctCount, quiz.questions.length, quiz.passingScore);

    const result: Omit<ExamResult, 'id'> = {
      quizId: quiz.id,
      courseId: courseId!,
      courseName: course.title,
      score: correctCount,
      total: quiz.questions.length,
      percentage: gradeResult.percentage,
      grade: gradeResult.grade,
      gradeLabel: gradeResult.gradeLabel,
      completedAt: new Date().toISOString(),
      answers: selectedAnswers,
      certificateEligible: gradeResult.eligible,
    };

    onSubmitResult(result, quizDurationMs, avgQuestionTimeMs);
    setShowConfirm(false);
    setStep('results');
  };

  const handleRetake = () => {
    setRetakeMode(true);
    beginExam();
  };

  // ──────────────────────────────────────────────────────────────────────
  // 1. GENERAL EXAMINATION DIRECTORY (No specific courseId)
  // ──────────────────────────────────────────────────────────────────────
  if (!quiz || !course) {
    const publicCoursesList = allCourses.filter((c) => c.id !== 'SECRET-666');

    return (
      <div className="min-h-screen bg-[#090909] text-white pt-28 sm:pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="mb-4 inline-block rounded-full px-3.5 py-1 text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 text-white/70">
              Testing Facility · Open Access
            </div>
            <h1
              className="font-heading font-medium leading-[0.95] tracking-tight uppercase text-white"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
            >
              EXAMINATION HALL
            </h1>
            <p className="text-xs sm:text-sm text-white/60 font-light max-w-xl mx-auto leading-relaxed">
              Sit for rigorous multiple-choice assessments. Choose any module below to begin your
              evaluation. All tests can be retaken at will.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {publicCoursesList.map((c) => {
              const q = getQuizByCourseId(c.id);
              const isPassed = profile?.completedCourses?.includes(c.id);

              return (
                <div
                  key={c.id}
                  className="rounded-2xl border border-white/10 bg-[#111111]/90 p-6 flex flex-col justify-between hover:border-white/30 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">
                        {c.code}
                      </span>
                      <span className="text-white/40 uppercase">{c.difficulty}</span>
                    </div>

                    <h3 className="font-heading font-medium text-base text-white leading-snug">
                      {c.title}
                    </h3>

                    <div className="text-xs font-mono text-white/50 space-y-1 pt-1">
                      <p>{q ? `${q.questions.length} Questions` : '6 Questions'} · 60s per question</p>
                      <p>Pass Mark: {q?.passingScore ?? 60}%</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    {isPassed ? (
                      <span className="text-xs font-mono text-[#C6FF00] flex items-center gap-1.5">
                        <CheckCircle size={13} />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-white/40">Ready to sit</span>
                    )}

                    <Link
                      to={`/exam/${c.id}`}
                      className="bg-white text-black font-medium text-xs px-4 py-2 rounded-full hover:bg-white/80 active:scale-[0.98] transition-all flex items-center gap-1.5"
                    >
                      <span>{isPassed ? 'Retake Exam' : 'Enter Exam'}</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────
  // 2. ALREADY COMPLETED SCREEN
  // ──────────────────────────────────────────────────────────────────────
  if (alreadyCompleted && step === 'pre' && !retakeMode) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md w-full rounded-2xl border border-white/10 bg-[#111111]/90 p-8"
        >
          <Award className="w-12 h-12 text-[#C6FF00] mx-auto" />
          <h1 className="font-heading text-2xl font-medium text-white uppercase">
            Examination Completed
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            You have already sat for and passed{' '}
            <span className="text-white font-medium">{course.title}</span>. Your grade is registered
            in your student record.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleRetake}
              className="flex items-center justify-center gap-2 border border-white/20 bg-white/5 text-white text-xs font-medium px-5 py-2.5 rounded-full hover:bg-white/10 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Exam
            </button>
            <Link
              to={`/courses/${courseId}`}
              className="flex items-center justify-center gap-2 bg-white text-black text-xs font-medium px-5 py-2.5 rounded-full hover:bg-white/85 transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Back to Syllabus
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const questions = quiz.questions;
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  // ──────────────────────────────────────────────────────────────────────
  // 3. PRE-EXAM SCREEN
  // ──────────────────────────────────────────────────────────────────────
  if (step === 'pre') {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg w-full rounded-2xl border border-white/10 bg-[#111111]/90 p-8 space-y-6"
        >
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Examination Evaluation
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-medium text-white leading-tight uppercase">
              {course.title}
            </h1>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              {course.description ?? ''}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center font-mono">
            {[
              { label: 'Questions', value: totalQuestions },
              { label: 'Pass Mark', value: `${quiz.passingScore ?? 60}%` },
              { label: 'Per Question', value: `${TIMER_SECONDS}s` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-white/5 bg-white/5 p-3.5">
                <div className="text-lg font-bold text-white">{value}</div>
                <div className="text-[10px] uppercase text-white/40 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/5 bg-white/5 p-4 text-xs text-white/60 space-y-2 font-light">
            <p className="font-medium text-white/80 font-mono uppercase tracking-wide">
              Evaluation Rules:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>{TIMER_SECONDS}-second timer per question (can be toggled).</li>
              <li>Review all responses before final submission.</li>
              <li>Calculates your official Brainrot University academic standing.</li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-white/60">
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
                className="rounded border-white/20 bg-white/5 accent-white"
              />
              <span>60s Question Timer</span>
            </label>

            <button
              onClick={beginExam}
              className="bg-white text-black font-medium text-xs px-6 py-2.5 rounded-full hover:bg-white/85 active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-md"
            >
              <span>Begin Exam</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────
  // 4. EXAM QUESTION SCREEN
  // ──────────────────────────────────────────────────────────────────────
  if (step === 'exam') {
    const q = questions[currentQuestion];
    const LABELS = ['A', 'B', 'C', 'D'];

    return (
      <div className="min-h-screen bg-[#090909] text-white flex flex-col pt-24 pb-12">
        {/* Top Header bar */}
        <div className="border-b border-white/10 px-6 sm:px-12 py-4 flex items-center justify-between">
          <span className="text-xs font-mono text-white/50 truncate max-w-xs">{course.title}</span>
          <div className="flex items-center gap-4">
            {timerEnabled && (
              <div
                className={`flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-full border ${
                  timeLeft <= 10
                    ? 'border-red-500/40 bg-red-500/10 text-red-400'
                    : 'border-white/10 bg-white/5 text-white/70'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                {String(timeLeft % 60).padStart(2, '0')}
              </div>
            )}
            <span className="text-xs font-mono text-white/40">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/5 w-full">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question & Options */}
        <div className="flex-1 max-w-3xl w-full mx-auto px-6 py-10 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                  Question {currentQuestion + 1}
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-medium text-white mt-2 leading-relaxed">
                  {q.text}
                </h2>
              </div>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  const isSelected = selectedAnswers[currentQuestion] === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => selectAnswer(i)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                        isSelected
                          ? 'border-white bg-white/10 text-white shadow-md'
                          : 'border-white/10 bg-[#111111]/80 hover:border-white/30 text-white/80'
                      }`}
                    >
                      <span
                        className={`font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'border-white bg-white text-black font-bold'
                            : 'border-white/20 text-white/50'
                        }`}
                      >
                        {LABELS[i]}
                      </span>
                      <span className="text-xs sm:text-sm font-light leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-8">
            <button
              onClick={goPrev}
              disabled={currentQuestion === 0}
              className="flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white disabled:opacity-20 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={goNext}
              disabled={!hasAnswered}
              className="bg-white text-black font-medium text-xs px-6 py-2.5 rounded-full hover:bg-white/85 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow-md"
            >
              <span>{currentQuestion === totalQuestions - 1 ? 'Review Exam' : 'Next Question'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────
  // 5. REVIEW SCREEN
  // ──────────────────────────────────────────────────────────────────────
  if (step === 'review') {
    return (
      <div className="min-h-screen bg-[#090909] text-white pt-28 sm:pt-32 pb-24 px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Final Examination Review
            </span>
            <h1 className="font-heading text-3xl font-medium text-white uppercase">
              Confirm Submission
            </h1>
            <p className="text-xs sm:text-sm text-white/60 font-light">
              Review your answers below before finalizing your academic grading.
            </p>
          </div>

          <div className="space-y-3">
            {questions.map((q, i) => {
              const ans = selectedAnswers[i];
              const isAnswered = ans !== undefined && ans >= 0;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-[#111111]/80 p-4 flex items-center justify-between"
                >
                  <div className="min-w-0 pr-4">
                    <span className="text-[10px] font-mono text-white/40 uppercase block">
                      Question {i + 1}
                    </span>
                    <p className="text-xs text-white/80 font-light truncate">{q.text}</p>
                    <p className="text-xs text-white/50 font-mono mt-1">
                      {isAnswered ? `Selected: Option ${ans + 1}` : 'Unanswered'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentQuestion(i);
                      setStep('exam');
                    }}
                    className="text-xs font-mono underline text-white/60 hover:text-white shrink-0"
                  >
                    Change
                  </button>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setStep('exam');
              }}
              className="text-xs font-mono text-white/50 hover:text-white"
            >
              ← Back to Questions
            </button>

            <button
              onClick={() => setShowConfirm(true)}
              className="bg-white text-black font-medium text-xs sm:text-sm px-8 py-3 rounded-full hover:bg-white/85 transition-all shadow-md"
            >
              Submit Examination
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-6">
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-8 max-w-sm w-full text-center space-y-4">
              <h3 className="font-heading text-lg font-medium text-white">Final Confirmation</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Are you ready to submit your evaluation and calculate your permanent aura score?
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 rounded-full border border-white/20 text-xs font-mono text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={submitExam}
                  className="flex-1 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-white/85"
                >
                  Submit Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────
  // 6. RESULTS SCREEN
  // ──────────────────────────────────────────────────────────────────────
  if (step === 'results') {
    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) correctCount++;
    });
    const gradeResult = calculateGrade(correctCount, totalQuestions, quiz.passingScore);

    return (
      <div className="min-h-screen bg-[#090909] text-white pt-28 sm:pt-32 pb-24 px-6">
        <div className="max-w-xl mx-auto rounded-3xl border border-white/10 bg-[#111111]/90 p-8 sm:p-10 text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Examination Results
            </span>
            <h1 className="font-heading text-3xl font-medium text-white uppercase">
              {course.title}
            </h1>
          </div>

          {/* Grade Badge */}
          <div className="py-6 rounded-2xl border border-white/5 bg-white/5 space-y-2">
            <div className="text-5xl font-mono font-bold text-white">
              {gradeResult.percentage}%
            </div>
            <div className="text-sm font-mono uppercase tracking-widest text-[#C6FF00]">
              {gradeResult.gradeLabel}
            </div>
            <p className="text-xs font-mono text-white/40">
              {correctCount} of {totalQuestions} Questions Correct
            </p>
          </div>

          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            {gradeResult.eligible
              ? 'Congratulations. Your academic performance has exceeded expectations. Your official certificate is registered in the Student Portal.'
              : 'Your performance was delightfully cooked. You are encouraged to retake the evaluation whenever you are ready.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={handleRetake}
              className="py-3 px-6 rounded-full border border-white/20 text-xs font-mono text-white hover:bg-white/5 transition"
            >
              Retake Examination
            </button>
            <Link
              to="/portal"
              className="py-3 px-6 rounded-full bg-white text-black text-xs font-medium hover:bg-white/85 transition"
            >
              View Student Portal →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ExaminationHall;
