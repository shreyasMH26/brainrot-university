import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Quote } from 'lucide-react';
import type { Professor } from '../types';
import { getDepartmentById } from '../data/departments';

interface ProfessorCardProps {
  professor: Professor;
  compact?: boolean;
}

export default function ProfessorCard({ professor, compact = false }: ProfessorCardProps) {
  const dept = getDepartmentById(professor.departmentId);
  const deptColor = dept?.color ?? '#C6FF00';

  return (
    <motion.div
      whileHover={compact ? {} : { y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: '#0f0f0f',
        border: '1px solid rgba(240,235,221,0.1)',
      }}
    >
      <div className={`p-5 flex flex-col gap-4 ${compact ? 'p-4 gap-3' : ''}`}>
        {/* Avatar + name row */}
        <div className="flex items-center gap-4">
          {/* Circular emoji avatar */}
          <div
            className="shrink-0 flex items-center justify-center rounded-full text-3xl"
            style={{
              width: compact ? 52 : 68,
              height: compact ? 52 : 68,
              border: `3px solid ${deptColor}`,
              backgroundColor: `${deptColor}18`,
              fontSize: compact ? '1.5rem' : '2rem',
            }}
          >
            {professor.emoji ?? '🧠'}
          </div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <h3
              className={`font-bold text-[#F0EBDD] leading-tight truncate ${
                compact ? 'text-sm' : 'text-base'
              }`}
            >
              {professor.name}
            </h3>
            {professor.title && (
              <p className="text-xs text-[#888888] leading-snug">{professor.title}</p>
            )}
            {/* Department badge */}
            {dept?.name && (
              <span
                className="mt-1 inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full self-start"
                style={{
                  backgroundColor: `${deptColor}20`,
                  color: deptColor,
                }}
              >
                {dept.name}
              </span>
            )}
          </div>
        </div>

        {!compact && (
          <>
            {/* Signature quote */}
            {professor.quote && (
              <div
                className="relative pl-4 pr-2 py-3 rounded-lg"
                style={{ backgroundColor: 'rgba(240,235,221,0.04)' }}
              >
                <Quote
                  size={14}
                  className="absolute top-2 left-2 opacity-40"
                  style={{ color: deptColor }}
                />
                <p className="text-sm italic text-[#888888] leading-relaxed">
                  {professor.quote}
                </p>
              </div>
            )}

            {/* Bio */}
            {professor.bio && (
              <p className="text-sm text-[#888888] leading-relaxed">{professor.bio}</p>
            )}

            {/* Qualifications */}
            {professor.qualifications && professor.qualifications.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#F0EBDD]">
                  Qualifications
                </h4>
                <ul className="space-y-1">
                  {professor.qualifications.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#888888]">
                      <GraduationCap
                        size={12}
                        className="mt-0.5 shrink-0"
                        style={{ color: deptColor }}
                      />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Courses count */}
            {professor.courseIds && professor.courseIds.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-[#888888] pt-1 border-t border-white/5">
                <BookOpen size={12} style={{ color: deptColor }} />
                <span>
                  Teaching{' '}
                  <span className="font-bold text-[#F0EBDD]">{professor.courseIds.length}</span>{' '}
                  {professor.courseIds.length === 1 ? 'course' : 'courses'}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
