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
      whileHover={compact ? {} : { y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-2xl overflow-hidden bg-[#111111]/90 border border-white/10 hover:border-white/25 transition-colors duration-300"
    >
      <div className={`p-6 flex flex-col gap-4 ${compact ? 'p-4 gap-3' : ''}`}>
        {/* Avatar + name row */}
        <div className="flex items-center gap-4">
          {/* Circular emoji avatar */}
          <div
            className="shrink-0 flex items-center justify-center rounded-2xl text-2xl sm:text-3xl bg-white/5 border border-white/10"
            style={{
              width: compact ? 48 : 60,
              height: compact ? 48 : 60,
            }}
          >
            {professor.emoji ?? '🧠'}
          </div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <h3
              className={`font-heading font-medium text-white leading-tight truncate ${
                compact ? 'text-sm' : 'text-base sm:text-lg'
              }`}
            >
              {professor.name}
            </h3>
            {professor.title && (
              <p className="text-xs text-white/50 font-mono leading-snug">{professor.title}</p>
            )}
            {/* Department badge */}
            {dept?.name && (
              <span
                className="mt-1 inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full self-start bg-white/5 border border-white/10"
                style={{ color: deptColor }}
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
              <div className="relative pl-7 pr-3 py-3 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm italic text-white/70 font-light leading-relaxed">
                <Quote
                  size={12}
                  className="absolute top-3.5 left-2.5 text-white/40"
                />
                &ldquo;{professor.quote}&rdquo;
              </div>
            )}

            {/* Bio */}
            {professor.bio && (
              <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                {professor.bio}
              </p>
            )}

            {/* Qualifications */}
            {professor.qualifications && professor.qualifications.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-2 border-t border-white/5">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  Pedagogical Credentials
                </h4>
                <ul className="space-y-1">
                  {professor.qualifications.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-white/70 font-mono">
                      <GraduationCap
                        size={12}
                        className="mt-0.5 shrink-0 text-white/40"
                      />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Courses count */}
            {professor.courseIds && professor.courseIds.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-white/50 font-mono pt-2 border-t border-white/5">
                <BookOpen size={12} className="text-white/40" />
                <span>
                  Supervising{' '}
                  <span className="font-medium text-white">{professor.courseIds.length}</span>{' '}
                  {professor.courseIds.length === 1 ? 'module' : 'modules'}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
