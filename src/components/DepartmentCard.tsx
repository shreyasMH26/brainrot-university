import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BookOpen, Zap } from 'lucide-react';
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
      whileHover={{ y: -5, boxShadow: `0 16px 48px ${accent}14` }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: '#0f0f0f',
        border: `1px solid rgba(240,235,221,0.1)`,
      }}
    >
      {/* Accent top bar */}
      <div className="h-1 w-full" style={{ backgroundColor: accent }} />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Emoji + name */}
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 text-4xl w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${accent}18` }}
          >
            {department.emoji ?? '🎓'}
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-lg font-extrabold text-[#F0EBDD] leading-tight">
              {department.name}
            </h3>
            {department.professor && (
              <p className="text-xs text-[#888888]">
                Head: <span style={{ color: accent }}>{department.professor}</span>
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        {department.description && (
          <p className="text-sm text-[#888888] leading-relaxed line-clamp-3">
            {department.description}
          </p>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-4 flex-wrap">
          {department.stats?.students !== undefined && (
            <div className="flex items-center gap-1.5 text-xs text-[#888888]">
              <Users size={12} style={{ color: accent }} />
              <span>
                <span className="font-bold text-[#F0EBDD]">{department.stats.students.toLocaleString()}</span>{' '}
                students
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-[#888888]">
            <BookOpen size={12} style={{ color: accent }} />
            <span>
              <span className="font-bold text-[#F0EBDD]">
                {courseCount ?? department.courses?.length ?? 0}
              </span>{' '}
              courses
            </span>
          </div>
          {department.stats?.creditHours !== undefined && (
            <div className="flex items-center gap-1.5 text-xs text-[#888888]">
              <Zap size={12} style={{ color: accent }} />
              <span>
                <span className="font-bold text-[#F0EBDD]">{department.stats.creditHours}</span>{' '}
                credit hrs
              </span>
            </div>
          )}
        </div>

        {/* Course preview */}
        {previewCourses.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#888888]">
              Featured Courses
            </p>
            <ul className="space-y-1">
              {previewCourses.map((courseCode, i) => (
                <li key={i} className="text-xs text-[#F0EBDD] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  {courseCode}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Link
            to={`/departments/${department.id}`}
            className="block w-full text-center py-2.5 rounded text-sm font-bold transition-colors duration-150"
            style={{
              backgroundColor: `${accent}18`,
              color: accent,
              border: `1px solid ${accent}40`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${accent}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${accent}18`;
            }}
          >
            Explore Department →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
