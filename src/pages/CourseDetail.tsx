import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FlaskConical,
  GraduationCap,
  Tag,
  User,
} from 'lucide-react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { getDepartmentById } from '../data/departments';
import { getProfessorById } from '../data/professors';
import type { Certificate, StudentProfile } from '../types';

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────
interface CourseDetailProps {
  profile: StudentProfile | null;
  onEnroll: (courseId: string) => void;
}

// ─────────────────────────────────────────────
// Tiny animation helper
// ─────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

// ─────────────────────────────────────────────
// Info row helper
// ─────────────────────────────────────────────
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-b-0">
      <span className="mt-0.5 shrink-0" style={{ color: '#888888' }}>
        {icon}
      </span>
      <div>
        <div className="text-xs tracking-widest uppercase" style={{ color: '#888888' }}>
          {label}
        </div>
        <div className="mt-0.5 text-sm font-medium" style={{ color: '#F0EBDD' }}>
          {value}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Grade badge colour helper
// ─────────────────────────────────────────────
function gradeColor(grade: string): string {
  const map: Record<string, string> = {
    SIGMA_SUMMA_CUM_LAUDE: '#C6FF00',
    CERTIFIED_AURA_ENGINEER: '#88FF88',
    FUNCTIONAL_NPC: '#F0EBDD',
    ACADEMICALLY_COOKED: '#FF6B35',
    PROFESSIONAL_DELULU: '#641C2B',
    DROPOUT_IN_SPIRIT: '#888888',
  };
  return map[grade] ?? '#888888';
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function CourseDetail({ profile, onEnroll }: CourseDetailProps) {
  const { courseId } = useParams<{ courseId: string }>();

  // ── Guard: unknown course ──────────────────
  const course = courseId ? getCourseById(courseId) : undefined;
  if (!course) return <Navigate to="/courses" replace />;

  // ── Guard: secret course locked ───────────
  if (course.id === 'SECRET-666' && !(profile?.secretCourseUnlocked ?? false)) {
    return <Navigate to="/courses" replace />;
  }

  const department = getDepartmentById(course.departmentId);
  const professor = getProfessorById(course.professorId);

  const isEnrolled = profile?.enrolledCourses.includes(course.id) ?? false;
  const isCompleted = profile?.completedCourses.includes(course.id) ?? false;

  // Get certificate if it exists
  const certificate: Certificate | undefined = profile?.certificates.find(
    (c) => c.courseId === course.id,
  );

  // Get exam result for grade display
  const examResult = profile?.examResults.find((r) => r.courseId === course.id);

  const isSecret = course.id === 'SECRET-666';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#090909' }}>
      {/* ── Hero ────────────────────────────────────── */}
      <motion.div
        className="relative overflow-hidden border-b border-white/10"
        style={{
          background: isSecret
            ? 'linear-gradient(135deg, rgba(100,28,43,0.3) 0%, rgba(9,9,9,0) 60%)'
            : `linear-gradient(135deg, ${department?.bgColor ?? 'rgba(255,255,255,0.02)'} 0%, rgba(9,9,9,0) 70%)`,
        }}
        {...fadeUp(0)}
      >
        {/* decorative glow */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: isSecret ? '#641C2B' : (department?.color ?? '#C6FF00') }}
        />

        <div className="relative mx-auto max-w-5xl px-6 py-12">
          {/* Back button */}
          <motion.div {...fadeUp(0)}>
            <Link
              to="/courses"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: '#888888' }}
            >
              <ArrowLeft size={15} />
              Back to Courses
            </Link>
          </motion.div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: title block */}
            <motion.div className="flex-1" {...fadeUp(0.05)}>
              {/* Badges row */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {/* Course code */}
                <span
                  className="rounded-full px-3 py-1 text-xs font-black tracking-widest uppercase"
                  style={{
                    backgroundColor: isSecret
                      ? 'rgba(100,28,43,0.4)'
                      : `${department?.bgColor ?? 'rgba(198,255,0,0.1)'}`,
                    color: isSecret ? '#FF6B35' : (department?.color ?? '#C6FF00'),
                    border: `1px solid ${isSecret ? 'rgba(100,28,43,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                >
                  {course.code}
                </span>

                {/* Difficulty badge */}
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: `${course.difficultyColor}18`,
                    color: course.difficultyColor,
                    border: `1px solid ${course.difficultyColor}30`,
                  }}
                >
                  {course.difficulty}
                </span>

                {/* Department badge */}
                {department && (
                  <Link
                    to={`/departments/${department.id}`}
                    className="rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: '#888888',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {department.name}
                  </Link>
                )}
              </div>

              {/* Title */}
              <h1
                className="mb-4 font-black leading-tight"
                style={{
                  color: '#F0EBDD',
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                {isSecret && <span className="mr-2">🔓</span>}
                {course.title}
              </h1>

              {/* Status banner: completed */}
              {isCompleted && examResult && (
                <motion.div
                  className="mb-4 flex items-center gap-3 rounded-xl border px-5 py-3"
                  style={{
                    backgroundColor: 'rgba(198,255,0,0.06)',
                    borderColor: 'rgba(198,255,0,0.2)',
                  }}
                  {...fadeUp(0.1)}
                >
                  <CheckCircle2 size={18} style={{ color: '#C6FF00' }} />
                  <div>
                    <div className="text-sm font-bold" style={{ color: '#C6FF00' }}>
                      Course Completed
                    </div>
                    <div className="text-xs" style={{ color: '#888888' }}>
                      Score:{' '}
                      <span style={{ color: '#F0EBDD' }}>
                        {examResult.score}/{examResult.total} ({examResult.percentage}%)
                      </span>
                    </div>
                  </div>
                  {/* Grade badge */}
                  <span
                    className="ml-auto rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide"
                    style={{
                      backgroundColor: `${gradeColor(examResult.grade)}18`,
                      color: gradeColor(examResult.grade),
                    }}
                  >
                    {examResult.gradeLabel}
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Right: info panel */}
            <motion.aside
              className="w-full rounded-2xl border border-white/10 p-6 lg:w-72 shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              {...fadeUp(0.12)}
            >
              <h2
                className="mb-4 text-xs font-bold tracking-widest uppercase"
                style={{ color: '#888888' }}
              >
                Course Info
              </h2>

              {professor && (
                <InfoRow
                  icon={<User size={15} />}
                  label="Professor"
                  value={
                    <span>
                      {professor.emoji} {professor.name}
                    </span>
                  }
                />
              )}
              <InfoRow
                icon={<GraduationCap size={15} />}
                label="Credits"
                value={`${course.credits} credit${course.credits !== 1 ? 's' : ''}`}
              />
              <InfoRow
                icon={<Clock size={15} />}
                label="Duration"
                value={course.duration}
              />
              <InfoRow
                icon={<FlaskConical size={15} />}
                label="Difficulty"
                value={
                  <span style={{ color: course.difficultyColor }}>{course.difficulty}</span>
                }
              />
              <InfoRow
                icon={<Tag size={15} />}
                label="Tags"
                value={
                  <div className="mt-1 flex flex-wrap gap-1">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2 py-0.5 text-xs"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          color: '#888888',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                }
              />

              {/* CTA buttons */}
              <div className="mt-6 space-y-3">
                {!isEnrolled && !isCompleted && (
                  <button
                    type="button"
                    onClick={() => onEnroll(course.id)}
                    className="w-full rounded-xl py-3 text-sm font-black uppercase tracking-wide transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: '#C6FF00', color: '#090909' }}
                  >
                    Enrol in Course
                  </button>
                )}

                {isEnrolled && !isCompleted && (
                  <Link
                    to={`/exam/${course.id}`}
                    className="block w-full rounded-xl py-3 text-center text-sm font-black uppercase tracking-wide transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: '#C6FF00', color: '#090909' }}
                  >
                    Start Examination →
                  </Link>
                )}

                {isCompleted && (
                  <Link
                    to={`/exam/${course.id}`}
                    className="block w-full rounded-xl py-3 text-center text-sm font-bold uppercase tracking-wide border transition-opacity hover:opacity-80"
                    style={{
                      borderColor: 'rgba(255,255,255,0.15)',
                      color: '#888888',
                    }}
                  >
                    Retake Examination
                  </Link>
                )}

                {/* Certificate download */}
                {certificate && (
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition-all hover:opacity-80"
                    style={{
                      borderColor: 'rgba(198,255,0,0.25)',
                      color: '#C6FF00',
                      backgroundColor: 'rgba(198,255,0,0.06)',
                    }}
                    onClick={() => {
                      // Certificate download / view logic handled by parent or certificate util
                      const blob = new Blob(
                        [JSON.stringify(certificate, null, 2)],
                        { type: 'application/json' },
                      );
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `certificate-${certificate.certificateCode}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <Download size={14} />
                    Download Certificate
                  </button>
                )}
              </div>

              {/* Certificate code display */}
              {certificate && (
                <div
                  className="mt-3 rounded-lg px-4 py-2.5 text-center text-xs"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', color: '#888888' }}
                >
                  Cert Code:{' '}
                  <span
                    className="font-mono font-bold"
                    style={{ color: '#C6FF00' }}
                  >
                    {certificate.certificateCode}
                  </span>
                </div>
              )}
            </motion.aside>
          </div>
        </div>
      </motion.div>

      {/* ── Body ────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-6 py-12 space-y-12">
        {/* Course Overview */}
        <motion.section {...fadeUp(0.1)}>
          <h2
            className="mb-5 flex items-center gap-2 text-sm font-bold tracking-widest uppercase"
            style={{ color: '#888888' }}
          >
            <BookOpen size={15} />
            Course Overview
          </h2>
          <div
            className="rounded-2xl border border-white/10 p-6 leading-relaxed"
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              color: '#F0EBDD',
            }}
          >
            <p className="text-base">{course.description}</p>
          </div>
        </motion.section>

        {/* Syllabus */}
        <motion.section {...fadeUp(0.15)}>
          <h2
            className="mb-5 flex items-center gap-2 text-sm font-bold tracking-widest uppercase"
            style={{ color: '#888888' }}
          >
            <Award size={15} />
            Syllabus
          </h2>

          <ol className="space-y-3">
            {course.syllabus.map((entry, idx) => (
              <motion.li
                key={idx}
                className="flex items-start gap-4 rounded-xl border border-white/8 px-5 py-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + idx * 0.06, duration: 0.35 }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black"
                  style={{ backgroundColor: 'rgba(198,255,0,0.12)', color: '#C6FF00' }}
                >
                  {idx + 1}
                </span>
                <span className="text-sm leading-relaxed" style={{ color: '#F0EBDD' }}>
                  {entry}
                </span>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        {/* Bottom CTA: enrol or exam */}
        <motion.div
          className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 py-10 text-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
          {...fadeUp(0.2)}
        >
          <p className="text-sm" style={{ color: '#888888' }}>
            {isCompleted
              ? 'You have completed this course. Ready to challenge yourself again?'
              : isEnrolled
              ? 'You\'re enrolled — head to the examination when ready.'
              : 'Ready to commit to your own academic downfall?'}
          </p>

          {!isEnrolled && !isCompleted && (
            <button
              type="button"
              onClick={() => onEnroll(course.id)}
              className="rounded-xl px-8 py-3 text-sm font-black uppercase tracking-widest transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#C6FF00', color: '#090909' }}
            >
              Enrol Now — It's Free (emotionally it's not)
            </button>
          )}

          {isEnrolled && !isCompleted && (
            <Link
              to={`/exam/${course.id}`}
              className="rounded-xl px-8 py-3 text-sm font-black uppercase tracking-widest transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#C6FF00', color: '#090909' }}
            >
              Begin Examination →
            </Link>
          )}

          {isCompleted && (
            <Link
              to={`/exam/${course.id}`}
              className="rounded-xl border px-8 py-3 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-80"
              style={{
                borderColor: 'rgba(255,255,255,0.15)',
                color: '#888888',
              }}
            >
              Retake Examination
            </Link>
          )}
        </motion.div>
      </main>
    </div>
  );
}
