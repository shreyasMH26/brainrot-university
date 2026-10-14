import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Star,
  ArrowRight,
} from 'lucide-react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { getDepartmentById } from '../data/departments';
import { getProfessorById } from '../data/professors';
import type { StudentProfile } from '../types';

interface CourseDetailProps {
  profile: StudentProfile | null;
  onEnroll: (courseId: string) => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

export default function CourseDetail({ profile, onEnroll: _onEnroll }: CourseDetailProps) {
  const { courseId } = useParams<{ courseId: string }>();

  // Guard: unknown course
  const course = courseId ? getCourseById(courseId) : undefined;
  if (!course) return <Navigate to="/courses" replace />;

  // Guard: secret course locked
  if (course.id === 'SECRET-666' && !(profile?.secretCourseUnlocked ?? false)) {
    return <Navigate to="/courses" replace />;
  }

  const department = getDepartmentById(course.departmentId);
  const professor = getProfessorById(course.professorId);
  const isCompleted = profile?.completedCourses.includes(course.id) ?? false;
  const examResult = profile?.examResults.find((r) => r.courseId === course.id);

  return (
    <div className="min-h-screen bg-[#090909] text-white pt-28 sm:pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* Back button */}
        <motion.div {...fadeUp(0)}>
          <Link
            to="/courses"
            className="mb-8 inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Course Catalogue
          </Link>
        </motion.div>

        {/* Hero Course Header */}
        <motion.div {...fadeUp(0.05)} className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="rounded-full px-3 py-1 text-xs font-mono uppercase tracking-widest bg-white/10 text-white border border-white/10">
              {course.code}
            </span>
            <span className="rounded-full px-3 py-1 text-xs font-mono uppercase tracking-wider bg-white/5 text-white/70 border border-white/10">
              {course.difficulty} Difficulty
            </span>
            {department && (
              <Link
                to={`/departments/${department.id}`}
                className="rounded-full px-3 py-1 text-xs font-mono uppercase tracking-wider bg-white/5 text-white/70 border border-white/10 hover:text-white transition-colors"
              >
                {department.emoji} {department.name}
              </Link>
            )}
          </div>

          <h1
            className="font-heading font-medium uppercase text-white leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)' }}
          >
            {course.title}
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-3xl">
            {course.description}
          </p>

          {/* Status banner if completed */}
          {isCompleted && examResult && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#C6FF00]/30 bg-[#C6FF00]/5 px-5 py-3">
              <CheckCircle2 size={18} className="text-[#C6FF00]" />
              <div className="text-xs font-mono">
                <span className="text-[#C6FF00] font-bold uppercase mr-2">Passed Examination</span>
                <span className="text-white/60">
                  Grade: {examResult.gradeLabel} ({examResult.percentage}%)
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Main Grid: Details & Syllabus */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Syllabus & Curriculum */}
          <div className="lg:col-span-2 space-y-8">
            {/* Syllabus */}
            <div className="rounded-2xl border border-white/10 bg-[#111111]/90 p-8">
              <h2 className="font-heading text-lg font-medium text-white mb-6 uppercase tracking-wide flex items-center gap-2">
                <BookOpen size={18} className="text-white/40" />
                Syllabus & Lecture Topics
              </h2>

              <div className="space-y-4">
                {course.syllabus?.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <span className="font-mono text-xs font-bold text-white/40 w-6 shrink-0 pt-0.5">
                      0{i + 1}
                    </span>
                    <p className="text-sm text-white/80 font-light leading-relaxed">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Examination Callout */}
            <div className="rounded-2xl border border-white/10 bg-[#111111]/90 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-heading text-lg font-medium text-white mb-1">
                  Ready to test your comprehension?
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-light">
                  Complete the official multiple-choice evaluation to record your score.
                </p>
              </div>
              <Link
                to={`/exam/${course.id}`}
                className="bg-white text-black font-medium text-xs sm:text-sm px-7 py-3.5 rounded-full hover:bg-white/85 active:scale-[0.98] transition-all whitespace-nowrap flex items-center gap-2 shrink-0 shadow-md"
              >
                <span>{isCompleted ? 'Retake Exam' : 'Begin Examination'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Col: Course Info & Faculty */}
          <div className="space-y-6">
            {/* Metadata Card */}
            <div className="rounded-2xl border border-white/10 bg-[#111111]/90 p-6 space-y-4 font-mono text-xs">
              <h3 className="text-[11px] uppercase tracking-widest text-white/40 font-mono mb-2">
                Module Specifications
              </h3>

              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/50 flex items-center gap-1.5">
                  <Star size={13} className="text-white/40" /> Credits
                </span>
                <span className="text-white font-medium">{course.credits} Credits</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/50 flex items-center gap-1.5">
                  <Clock size={13} className="text-white/40" /> Duration
                </span>
                <span className="text-white font-medium">{course.duration}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/50 flex items-center gap-1.5">
                  <GraduationCap size={13} className="text-white/40" /> Department
                </span>
                <span className="text-white font-medium">{department?.name}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-white/50 flex items-center gap-1.5">
                  <Award size={13} className="text-white/40" /> Accreditation
                </span>
                <span className="text-[#C6FF00] font-medium">None (Zero)</span>
              </div>
            </div>

            {/* Instructor Card */}
            {professor && (
              <div className="rounded-2xl border border-white/10 bg-[#111111]/90 p-6 space-y-3">
                <h3 className="text-[11px] uppercase tracking-widest text-white/40 font-mono">
                  Presiding Faculty
                </h3>
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                    {professor.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading font-medium text-white text-sm truncate">
                      {professor.name}
                    </p>
                    <p className="text-[11px] text-white/50 font-mono truncate">{professor.title}</p>
                  </div>
                </div>
                {professor.quote && (
                  <p className="text-xs italic text-white/60 font-light pt-2 border-t border-white/5 leading-relaxed">
                    &ldquo;{professor.quote}&rdquo;
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
