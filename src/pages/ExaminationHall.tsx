import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Award,
  RotateCcw,
  BookOpen,
  Eye,
  Send,
  Timer,
  TimerOff,
} from 'lucide-react';
import { getQuizByCourseId } from '../data/quizzes';
import { getCourseById } from '../data/courses';
import { calculateGrade, getGradeColor, getGradeEmoji } from '../utils/grading';
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

  const isEnrolled = profile && courseId
    ? (profile.enrolledCourses ?? []).includes(courseId)
    : false;

  const alreadyCompleted = profile && courseId
    ? (profile.completedCourses ?? []).includes(courseId)
    : false;

  // Timer logic
  useEffect(() => {
    if (step !== 'exam' || !timerEnabled) return;

    setTimeLeft(TIMER_SECONDS);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-advance on timeout
          handleTimeUp();
          return TIMER_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, currentQuestion, timerEnabled]);

  const handleTimeUp = useCallback(() => {
    if (!quiz) return;
    // Mark current question as unanswered (-1) and move on
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

  const beginExam = () => {
    const now = new Date();
    setStartTime(now);
    setQuestionStartTime(now);
    setSelectedAnswers([]);
    setQuestionTimings([]);
    setCurrentQuestion(0);
    setStep('exam');
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
    // Record time spent on this question
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
    if (!quiz || !course || !profile || !startTime) return;

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

  // ─── Guard: no quiz/course ────────────────────────────────────────────
  if (!quiz || !course) {
    return (
      <div className="min-h-screen bg-[#090909] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <AlertTriangle className="w-16 h-16 text-[#C6FF00] mx-auto" />
          <h1 className="text-2xl font-bold text-[#F0EBDD]">Course Not Found</h1>
          <p className="text-[#888888]">This exam does not exist in our records.</p>
          <Link to="/courses" className="text-[#C6FF00] underline">
            Browse Courses
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── Guard: no profile ────────────────────────────────────────────────
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#090909] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4 max-w-md px-8"
        >
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto" />
          <h1 className="text-2xl font-bold text-[#F0EBDD]">Identity Required</h1>
          <p className="text-[#888888]">
            You need a student profile to sit an examination.
          </p>
          <Link
            to="/portal"
            className="inline-block bg-[#C6FF00] text-[#090909] font-bold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Go to Student Portal
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── Guard: not enrolled ──────────────────────────────────────────────
  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-[#090909] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 max-w-md px-8"
        >
          <BookOpen className="w-16 h-16 text-[#C6FF00] mx-auto" />
          <h1 className="text-2xl font-bold text-[#F0EBDD]">Enrollment Required</h1>
          <p className="text-[#888888]">
            You must enroll in <span className="text-[#F0EBDD] font-semibold">{course.title}</span> before
            you can sit the exam.
          </p>
          <Link
            to={`/courses/${courseId}`}
            className="inline-block bg-[#C6FF00] text-[#090909] font-bold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            Enroll Now
          </Link>
        </motion.div>
      </div>
    );
  }

  // ─── Guard: already completed ─────────────────────────────────────────
  if (alreadyCompleted && step === 'pre' && !retakeMode) {
    return (
      <div className="min-h-screen bg-[#090909] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md px-8"
        >
          <Award className="w-16 h-16 text-[#C6FF00] mx-auto" />
          <h1 className="text-2xl font-bold text-[#F0EBDD]">Already Completed</h1>
          <p className="text-[#888888]">
            You have already completed{' '}
            <span className="text-[#F0EBDD] font-semibold">{course.title}</span>. Your grade is
            on file.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRetake}
              className="flex items-center gap-2 bg-[#641C2B] text-[#F0EBDD] font-bold px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Exam
            </button>
            <Link
              to={`/courses/${courseId}`}
              className="flex items-center gap-2 bg-[#C6FF00] text-[#090909] font-bold px-6 py-3 rounded-lg hover:opacity-90 transition justify-center"
            >
              <BookOpen className="w-4 h-4" />
              Back to Course
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
  // PRE-EXAM SCREEN
  // ──────────────────────────────────────────────────────────────────────
  if (step === 'pre') {
    return (
      <div className="min-h-screen bg-[#090909] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg w-full bg-[#F0EBDD]/5 border border-[#F0EBDD]/10 rounded-2xl p-8 space-y-6"
        >
          <div className="text-center space-y-2">
            <span className="text-[#C6FF00] text-xs font-mono uppercase tracking-widest">
              Examination Hall
            </span>
            <h1 className="text-3xl font-black text-[#F0EBDD] leading-tight">
              {course.title}
            </h1>
            <p className="text-[#888888] text-sm">{course.description ?? ''}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Questions', value: totalQuestions },
              { label: 'Pass Mark', value: `${quiz.passingScore ?? 60}%` },
              { label: 'Per Question', value: `${TIMER_SECONDS}s` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-[#090909] border border-[#F0EBDD]/10 rounded-xl p-4"
              >
                <div className="text-2xl font-black text-[#C6FF00]">{value}</div>
                <div className="text-[#888888] text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#641C2B]/20 border border-[#641C2B]/40 rounded-xl p-4 text-sm text-[#F0EBDD]/80 space-y-1">
            <p className="font-semibold text-[#F0EBDD]">⚠ Before You Begin</p>
            <ul className="list-disc list-inside space-y-1 text-[#888888]">
              <li>Each question has a {TIMER_SECONDS}-second timer (can be toggled).</li>
              <li>You may review previous questions but cannot change answered ones.</li>
              <li>Review all answers before submitting.</li>
              <li>Academic integrity is expected. No googling. (We know.)</li>
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setTimerEnabled((v) => !v)}
                className={`w-10 h-5 rounded-full transition-colors ${
                  timerEnabled ? 'bg-[#C6FF00]' : 'bg-[#888888]/40'
                } relative`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                    timerEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </div>
              <span className="text-[#888888] text-sm flex items-center gap-1">
                {timerEnabled ? (
                  <Timer className="w-3 h-3" />
                ) : (
                  <TimerOff className="w-3 h-3" />
                )}
                Question Timer
              </span>
            </label>

            <button
              onClick={beginExam}
              className="flex items-center gap-2 bg-[#C6FF00] text-[#090909] font-black px-6 py-3 rounded-xl hover:opacity-90 active:scale-95 transition"
            >
              Begin Examination
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────
  // EXAM SCREEN
  // ──────────────────────────────────────────────────────────────────────
  if (step === 'exam') {
    const q = questions[currentQuestion];
    const LABELS = ['A', 'B', 'C', 'D'];

    return (
      <div className="min-h-screen bg-[#090909] flex flex-col">
        {/* Top bar */}
        <div className="border-b border-[#F0EBDD]/10 px-6 py-4 flex items-center justify-between">
          <span className="text-[#888888] text-sm font-mono">
            {course.title}
          </span>
          <div className="flex items-center gap-4">
            {timerEnabled && (
              <motion.div
                key={`timer-${currentQuestion}`}
                className={`flex items-center gap-1.5 font-mono font-bold text-sm px-3 py-1 rounded-full ${
                  timeLeft <= 10
                    ? 'bg-[#641C2B]/30 text-[#ff6b6b]'
                    : 'bg-[#C6FF00]/10 text-[#C6FF00]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                {String(timeLeft % 60).padStart(2, '0')}
              </motion.div>
            )}
            <span className="text-[#888888] text-sm font-mono">
              {currentQuestion + 1} / {totalQuestions}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#F0EBDD]/5">
          <motion.div
            className="h-full bg-[#C6FF00]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="max-w-2xl w-full space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Question */}
                <div className="space-y-2">
                  <span className="text-[#C6FF00] text-xs font-mono uppercase tracking-widest">
                    Question {currentQuestion + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-[#F0EBDD] leading-snug">
                    {q.text}
                  </h2>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {q.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQuestion] === idx;
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => selectAnswer(idx)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all duration-150 ${
                          isSelected
                            ? 'border-[#C6FF00] bg-[#C6FF00]/10 text-[#F0EBDD]'
                            : 'border-[#F0EBDD]/10 bg-[#F0EBDD]/3 text-[#888888] hover:border-[#F0EBDD]/30 hover:text-[#F0EBDD]'
                        }`}
                      >
                        <span
                          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                            isSelected
                              ? 'bg-[#C6FF00] text-[#090909]'
                              : 'bg-[#F0EBDD]/10 text-[#888888]'
                          }`}
                        >
                          {LABELS[idx]}
                        </span>
                        <span className="leading-relaxed">{option}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={goPrev}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 text-[#888888] hover:text-[#F0EBDD] disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <button
                onClick={goNext}
                disabled={!hasAnswered}
                className="flex items-center gap-2 bg-[#C6FF00] text-[#090909] font-bold px-6 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition"
              >
                {currentQuestion < totalQuestions - 1 ? (
                  <>
                    Next Question
                    <ChevronRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Review Answers
                    <Eye className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────
  // REVIEW SCREEN
  // ──────────────────────────────────────────────────────────────────────
  if (step === 'review') {
    const LABELS = ['A', 'B', 'C', 'D'];

    return (
      <div className="min-h-screen bg-[#090909] px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <span className="text-[#C6FF00] text-xs font-mono uppercase tracking-widest">
              Review
            </span>
            <h1 className="text-3xl font-black text-[#F0EBDD]">Check Your Answers</h1>
            <p className="text-[#888888] text-sm">
              Verify your selections before final submission. You cannot change answers here.
            </p>
          </motion.div>

          <div className="space-y-4">
            {questions.map((q, qIdx) => {
              const selected = selectedAnswers[qIdx];
              return (
                <motion.div
                  key={qIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIdx * 0.04 }}
                  className="bg-[#F0EBDD]/5 border border-[#F0EBDD]/10 rounded-xl p-5 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[#C6FF00] font-black text-sm mt-0.5">Q{qIdx + 1}</span>
                    <p className="text-[#F0EBDD] font-medium leading-snug">{q.text}</p>
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full ${
                      selected === undefined || selected === -1
                        ? 'bg-[#641C2B]/30 text-[#ff6b6b]'
                        : 'bg-[#C6FF00]/10 text-[#C6FF00]'
                    }`}
                  >
                    <span className="font-bold">
                      {selected === undefined || selected === -1
                        ? '— Not answered'
                        : `${LABELS[selected]}: ${q.options[selected]}`}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button
              onClick={() => {
                setStep('exam');
                setCurrentQuestion(0);
              }}
              className="flex items-center gap-2 justify-center border border-[#F0EBDD]/20 text-[#F0EBDD] font-bold px-6 py-3 rounded-xl hover:bg-[#F0EBDD]/5 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Exam
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 justify-center bg-[#C6FF00] text-[#090909] font-black px-8 py-3 rounded-xl hover:opacity-90 active:scale-95 transition"
            >
              <Send className="w-4 h-4" />
              Submit Exam
            </button>
          </div>
        </div>

        {/* Confirm Modal */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#141414] border border-[#F0EBDD]/10 rounded-2xl p-8 max-w-sm w-full space-y-5 text-center"
              >
                <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto" />
                <h2 className="text-xl font-black text-[#F0EBDD]">Final Submission</h2>
                <p className="text-[#888888] text-sm">
                  You are about to submit your exam. This action cannot be undone. Are you sure?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 border border-[#F0EBDD]/20 text-[#F0EBDD] font-bold py-2.5 rounded-xl hover:bg-[#F0EBDD]/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitExam}
                    className="flex-1 bg-[#C6FF00] text-[#090909] font-black py-2.5 rounded-xl hover:opacity-90 transition"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────
  // RESULTS SCREEN
  // ──────────────────────────────────────────────────────────────────────
  if (step === 'results') {
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) correctCount++;
    });
    const gradeResult = calculateGrade(correctCount, totalQuestions, quiz.passingScore);
    const gradeColor = getGradeColor(gradeResult.grade);
    const gradeEmoji = getGradeEmoji(gradeResult.grade);
    const passed = gradeResult.eligible;
    const LABELS = ['A', 'B', 'C', 'D'];

    return (
      <div className="min-h-screen bg-[#090909] px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Score reveal */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              className="inline-block"
            >
              <div
                className="text-4xl font-black rounded-3xl p-6 flex flex-col items-center justify-center mx-auto border-4 max-w-md"
                style={{ color: gradeColor, borderColor: gradeColor, background: `${gradeColor}15` }}
              >
                <div className="text-5xl mb-2">{gradeEmoji}</div>
                <div className="text-xl tracking-wider text-center">{gradeResult.gradeLabel}</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-1"
            >
              <div className="text-5xl font-black text-[#F0EBDD]">
                {gradeResult.percentage}%
              </div>
              <p className="text-[#888888] max-w-md mx-auto">{gradeResult.feedback}</p>
              <p className={`font-bold text-lg ${passed ? 'text-[#C6FF00]' : 'text-[#ff6b6b]'}`}>
                {passed ? '✓ PASSED' : '✗ FAILED'}
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-6 flex-wrap"
            >
              {[
                { label: 'Correct', value: correctCount, color: '#C6FF00' },
                { label: 'Incorrect', value: totalQuestions - correctCount, color: '#ff6b6b' },
                { label: 'Total', value: totalQuestions, color: '#F0EBDD' },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="bg-[#F0EBDD]/5 border border-[#F0EBDD]/10 rounded-xl px-6 py-4 text-center"
                >
                  <div className="text-2xl font-black" style={{ color }}>
                    {value}
                  </div>
                  <div className="text-[#888888] text-xs">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Question Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <h2 className="text-[#F0EBDD] font-black text-lg">Question Breakdown</h2>
            {questions.map((q, i) => {
              const isCorrect = selectedAnswers[i] === q.correctIndex;
              const userAnswer = selectedAnswers[i];
              return (
                <div
                  key={i}
                  className={`rounded-xl border p-4 space-y-2 ${
                    isCorrect
                      ? 'border-[#C6FF00]/30 bg-[#C6FF00]/5'
                      : 'border-[#ff6b6b]/30 bg-[#ff6b6b]/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-[#C6FF00] flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#ff6b6b] flex-shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-[#F0EBDD] font-medium text-sm leading-snug line-clamp-2">
                        {q.text}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                        <span className="text-[#888888]">
                          Your answer:{' '}
                          <span className={isCorrect ? 'text-[#C6FF00]' : 'text-[#ff6b6b]'}>
                            {userAnswer === undefined || userAnswer === -1
                              ? 'Not answered'
                              : `${LABELS[userAnswer]}: ${q.options[userAnswer]}`}
                          </span>
                        </span>
                        {!isCorrect && (
                          <span className="text-[#888888]">
                            Correct:{' '}
                            <span className="text-[#C6FF00]">
                              {LABELS[q.correctIndex]}: {q.options[q.correctIndex]}
                            </span>
                          </span>
                        )}
                      </div>
                      {userAnswer !== undefined && userAnswer !== -1 && q.feedback && q.feedback[userAnswer] && (
                        <p className="text-[#888888] text-xs italic">{q.feedback[userAnswer]}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-3 justify-center pt-2"
          >
            <button
              onClick={handleRetake}
              className="flex items-center gap-2 border border-[#F0EBDD]/20 text-[#F0EBDD] font-bold px-6 py-3 rounded-xl hover:bg-[#F0EBDD]/5 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Retry
            </button>
            <Link
              to={`/courses/${courseId}`}
              className="flex items-center gap-2 border border-[#F0EBDD]/20 text-[#F0EBDD] font-bold px-6 py-3 rounded-xl hover:bg-[#F0EBDD]/5 transition"
            >
              <BookOpen className="w-4 h-4" />
              Back to Course
            </Link>
            {passed && (
              <Link
                to="/portal"
                className="flex items-center gap-2 bg-[#C6FF00] text-[#090909] font-black px-6 py-3 rounded-xl hover:opacity-90 active:scale-95 transition"
              >
                <Award className="w-4 h-4" />
                View Certificate
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default ExaminationHall;
