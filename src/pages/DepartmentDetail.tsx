import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Users } from 'lucide-react';
import { Navigate, Link, useParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import ProfessorCard from '../components/ProfessorCard';
import { getCoursesByDepartment } from '../data/courses';
import { getDepartmentById } from '../data/departments';
import { getProfessorById } from '../data/professors';
import type { StudentProfile } from '../types';

interface DepartmentDetailProps {
  profile: StudentProfile | null;
  onEnroll: (courseId: string) => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut', delay },
});

export default function DepartmentDetail({ profile, onEnroll }: DepartmentDetailProps) {
  const { deptId } = useParams<{ deptId: string }>();
  const department = deptId ? getDepartmentById(deptId) : undefined;

  // Guard: unknown department → redirect
  if (!department) return <Navigate to="/departments" replace />;

  const courses = getCoursesByDepartment(department.id);
  const professor = getProfessorById(courses[0]?.professorId ?? '');

  const enrolledCourses = profile?.enrolledCourses ?? [];
  const completedCourses = profile?.completedCourses ?? [];

  return (
    <div className="min-h-screen bg-[#090909] text-white pt-28 sm:pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Back Link */}
        <motion.div {...fadeUp(0)}>
          <Link
            to="/departments"
            className="mb-8 inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Departments
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div {...fadeUp(0.05)} className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{department.emoji}</span>
            <span className="text-xs font-mono uppercase tracking-widest text-white/40">
              Department of {department.name}
            </span>
          </div>

          <h1
            className="font-heading font-medium uppercase text-white leading-[0.95] tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            {department.name}
          </h1>

          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl">
            {department.description}
          </p>

          {/* Stats Bar */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-[#111111]/80 p-4 flex items-center gap-3">
              <Users size={16} className="text-white/40" />
              <div>
                <p className="text-[10px] uppercase text-white/40">Students</p>
                <p className="text-sm font-bold text-white">
                  {department.stats?.students.toLocaleString() ?? '100,000+'}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111111]/80 p-4 flex items-center gap-3">
              <BookOpen size={16} className="text-white/40" />
              <div>
                <p className="text-[10px] uppercase text-white/40">Courses</p>
                <p className="text-sm font-bold text-white">{courses.length} Modules</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111111]/80 p-4 flex items-center gap-3">
              <Clock size={16} className="text-white/40" />
              <div>
                <p className="text-[10px] uppercase text-white/40">Credit Hours</p>
                <p className="text-sm font-bold text-white">
                  {department.stats?.creditHours ?? '20'} Hours
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Head of Department */}
        {professor && (
          <div className="mb-14">
            <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
              Presiding Department Chair
            </p>
            <div className="max-w-xl">
              <ProfessorCard professor={professor} />
            </div>
          </div>
        )}

        {/* Courses in this department */}
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-heading text-xl uppercase font-medium text-white">
              Department Curriculum ({courses.length})
            </h2>
            <span className="text-xs font-mono text-white/40">OPEN ACCESS</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isCompleted={completedCourses.includes(course.id)}
                isEnrolled={enrolledCourses.includes(course.id)}
                onEnroll={() => onEnroll(course.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
