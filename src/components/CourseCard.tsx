import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Star, User, ArrowRight } from 'lucide-react';
import type { Course } from '../types';
import { getProfessorById } from '../data/professors';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  isCompleted?: boolean;
  onEnroll?: () => void;
  compact?: boolean;
}

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string }> = {
  easy: { label: 'Easy', color: '#C6FF00' },
  medium: { label: 'Medium', color: '#FFFFFF' },
  hard: { label: 'Hard', color: '#ffaa40' },
  extreme: { label: 'EXTREME', color: '#ff5555' },
};

export default function CourseCard({
  course,
  isEnrolled: _isEnrolled = false,
  isCompleted = false,
  onEnroll: _onEnroll,
  compact = false,
}: CourseCardProps) {
  const navigate = useNavigate();
  const diff = DIFFICULTY_CONFIG[course.difficulty?.toLowerCase() ?? 'medium'] ?? DIFFICULTY_CONFIG.medium;

  const handleTitleClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group rounded-2xl overflow-hidden flex flex-col bg-[#111111]/90 border border-white/10 hover:border-white/25 transition-colors duration-300"
    >
      <div className={`p-6 flex flex-col gap-3 flex-1 ${compact ? 'p-4 gap-2.5' : ''}`}>
        {/* Top row: course code + difficulty */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">
            {course.code}
          </span>
          <span
            className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10"
            style={{ color: diff.color }}
          >
            {diff.label}
          </span>
        </div>

        {/* Title */}
        <button
          onClick={handleTitleClick}
          className="text-left cursor-pointer focus:outline-none"
        >
          <h3
            className={`font-heading font-medium text-white group-hover:text-white/80 transition-colors leading-snug ${
              compact ? 'text-base' : 'text-lg'
            }`}
          >
            {course.title}
          </h3>
        </button>

        {!compact && course.description && (
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Meta info */}
        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50 font-mono ${compact ? 'gap-x-3' : ''}`}>
          {course.professorId && (
            <span className="flex items-center gap-1.5">
              <User size={12} className="text-white/40" />
              {getProfessorById(course.professorId)?.name ?? course.professorId}
            </span>
          )}
          {course.credits !== undefined && (
            <span className="flex items-center gap-1.5">
              <Star size={12} className="text-white/40" />
              {course.credits} cr
            </span>
          )}
          {course.duration && (
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-white/40" />
              {course.duration}
            </span>
          )}
        </div>

        {/* Tags */}
        {!compact && course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={handleTitleClick}
            className="w-full py-2.5 rounded-full text-xs font-medium tracking-wide text-black bg-white hover:bg-white/85 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>{isCompleted ? 'View Syllabus (Completed)' : 'View Syllabus & Exam'}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
