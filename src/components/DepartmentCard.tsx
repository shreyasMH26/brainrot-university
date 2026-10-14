import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BookOpen, Zap, ArrowRight } from 'lucide-react';
import type { Department } from '../types';

interface DepartmentCardProps {
  department: Department;
  courseCount?: number;
}

export default function DepartmentCard({ department, courseCount }: DepartmentCardProps) {
  const accent = department.color ?? '#C6FF00';
  const previewCourses = department.courses?.slice(0, 3) ?? [];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group rounded-2xl overflow-hidden flex flex-col bg-[#111111]/90 border border-white/10 hover:border-white/25 transition-colors duration-300 h-full"
    >
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Emoji + name */}
        <div className="flex items-start gap-4">
          <div className="shrink-0 text-3xl w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10">
            {department.emoji ?? '🎓'}
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-lg font-heading font-medium text-white group-hover:text-white/80 transition-colors leading-tight">
              {department.name}
            </h3>
            {department.professor && (
              <p className="text-xs text-white/50 font-mono">
                Head: <span style={{ color: accent }}>{department.professor}</span>
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        {department.description && (
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed line-clamp-3">
            {department.description}
          </p>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-4 flex-wrap text-xs text-white/50 font-mono pt-1">
          {department.stats?.students !== undefined && (
            <div className="flex items-center gap-1.5">
              <Users size={12} className="text-white/40" />
              <span>{department.stats.students.toLocaleString()} students</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <BookOpen size={12} className="text-white/40" />
            <span>{courseCount ?? department.courses?.length ?? 0} courses</span>
          </div>
          {department.stats?.creditHours !== undefined && (
            <div className="flex items-center gap-1.5">
              <Zap size={12} className="text-white/40" />
              <span>{department.stats.creditHours} credits</span>
            </div>
          )}
        </div>

        {/* Course preview */}
        {previewCourses.length > 0 && (
          <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
            <p className="text-[10px] uppercase font-mono tracking-widest text-white/40">
              Curriculum Sampling
            </p>
            <ul className="space-y-1.5">
              {previewCourses.map((courseCode, i) => (
                <li key={i} className="text-xs text-white/70 flex items-center gap-2 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  {courseCode}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <Link
            to={`/departments/${department.id}`}
            className="w-full text-center py-2.5 rounded-full text-xs font-medium tracking-wide text-black bg-white hover:bg-white/85 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Department</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
