import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Users } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import ProfessorCard from '../components/ProfessorCard';
import { getCoursesByDepartment } from '../data/courses';
import { getDepartmentById } from '../data/departments';
import { getProfessorById } from '../data/professors';
import type { StudentProfile } from '../types';

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────
interface DepartmentDetailProps {
  profile: StudentProfile | null;
  onEnroll: (courseId: string) => void;
}

// ─────────────────────────────────────────────
// Animation helpers
// ─────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─────────────────────────────────────────────
// Stat card helper
// ─────────────────────────────────────────────
function StatBadge({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-white/10 px-5 py-4"
      style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
    >
      <span style={{ color }}>{icon}</span>
      <div>
        <div className="text-xs tracking-widest uppercase" style={{ color: '#888888' }}>
          {label}
        </div>
        <div className="text-lg font-black" style={{ color: '#F0EBDD' }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function DepartmentDetail({ profile, onEnroll }: DepartmentDetailProps) {
  const { deptId } = useParams<{ deptId: string }>();
  const department = deptId ? getDepartmentById(deptId) : undefined;

  // Guard: unknown department → redirect
  if (!department) return <Navigate to="/departments" replace />;

  const courses = getCoursesByDepartment(department.id);
  const professor = getProfessorById(
    // professor id is the department's professorsId field — derive from courses
    courses[0]?.professorId ?? '',
  );

  const enrolledCourses = profile?.enrolledCourses ?? [];
  const completedCourses = profile?.completedCourses ?? [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#090909' }}>
      {/* ── Hero banner ─────────────────────────────── */}
      <motion.div
        className="relative overflow-hidden border-b border-white/10"
        style={{ background: department.bgColor }}
        {...fadeUp(0)}
      >
        {/* decorative glow */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: department.color }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-14">
          {/* Back link */}
          <motion.a
            href="/departments"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: '#888888' }}
            {...fadeUp(0)}
          >
            <ArrowLeft size={15} />
            Back to Departments
          </motion.a>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Left: dept info */}
            <motion.div className="flex-1" {...fadeUp(0.05)}>
              <div
                className="mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: department.color,
                }}
              >
                {department.code}
              </div>

              <h1
                className="mb-3 font-black leading-none"
                style={{
                  color: '#F0EBDD',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                <span className="mr-3 text-5xl">{department.emoji}</span>
                {department.name}
              </h1>

              <p className="max-w-2xl text-base leading-relaxed" style={{ color: '#888888' }}>
                {department.description}
              </p>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            {...fadeUp(0.15)}
          >
            <StatBadge
              icon={<Users size={18} />}
              label="Enrolled Students"
              value={department.stats.students}
              color={department.color}
            />
            <StatBadge
              icon={<BookOpen size={18} />}
              label="Courses"
              value={department.stats.courses}
              color={department.color}
            />
            <StatBadge
              icon={<Clock size={18} />}
              label="Credit Hours"
              value={department.stats.creditHours}
              color={department.color}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Body ────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-12 space-y-14">
        {/* Professor profile */}
        {professor && (
          <motion.section {...fadeUp(0.1)}>
            <h2
              className="mb-6 text-sm font-bold tracking-widest uppercase"
              style={{ color: '#888888' }}
            >
              Department Lead
            </h2>
            <div className="max-w-xl">
              <ProfessorCard professor={professor} />
            </div>
          </motion.section>
        )}

        {/* Courses grid */}
        <section>
          <motion.div
            className="mb-6 flex items-center justify-between"
            {...fadeUp(0.1)}
          >
            <h2
              className="text-sm font-bold tracking-widest uppercase"
              style={{ color: '#888888' }}
            >
              Department Courses
              <span
                className="ml-2 rounded-full px-2 py-0.5 text-xs"
                style={{ backgroundColor: 'rgba(198,255,0,0.12)', color: '#C6FF00' }}
              >
                {courses.length}
              </span>
            </h2>
          </motion.div>

          {courses.length === 0 ? (
            <motion.div
              className="rounded-xl border border-white/10 py-20 text-center"
              {...fadeUp(0.2)}
            >
              <p style={{ color: '#888888' }}>No courses found in this department.</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {courses.map((course) => (
                <motion.div key={course.id} variants={cardItem}>
                  <CourseCard
                    course={course}
                    isEnrolled={enrolledCourses.includes(course.id)}
                    isCompleted={completedCourses.includes(course.id)}
                    onEnroll={() => onEnroll(course.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}
