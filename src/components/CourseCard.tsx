import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Star, User, BookOpen } from 'lucide-react';
import type { Course } from '../types';
import { getProfessorById } from '../data/professors';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  isCompleted?: boolean;
  onEnroll?: () => void;
  compact?: boolean;
}

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  easy: { label: 'Easy', color: '#C6FF00', bg: 'rgba(198,255,0,0.12)' },
  medium: { label: 'Medium', color: '#F0EBDD', bg: 'rgba(240,235,221,0.1)' },
  hard: { label: 'Hard', color: '#ff8c42', bg: 'rgba(255,140,66,0.12)' },
  extreme: { label: 'EXTREME', color: '#ff4444', bg: 'rgba(255,68,68,0.12)' },
};

export default function CourseCard({
  course,
  isEnrolled = false,
  isCompleted = false,
  onEnroll,
  compact = false,
}: CourseCardProps) {
  const navigate = useNavigate();
  const diff = DIFFICULTY_CONFIG[course.difficulty?.toLowerCase() ?? 'medium'] ?? DIFFICULTY_CONFIG.medium;

  const handleTitleClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(198,255,0,0.08)' }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: '#0f0f0f',
        border: '1px solid rgba(240,235,221,0.1)',
      }}
    >
      {/* Header stripe */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: isCompleted ? '#C6FF00' : isEnrolled ? '#641C2B' : 'rgba(240,235,221,0.1)' }}
      />

      <div className={`p-5 flex flex-col gap-3 flex-1 ${compact ? 'p-4 gap-2' : ''}`}>
        {/* Top row: course code + difficulty */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ backgroundColor: '#641C2B', color: '#F0EBDD' }}
          >
            {course.code}
          </span>
          <span
            className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
            style={{ color: diff.color, backgroundColor: diff.bg }}
          >
            {diff.label}
          </span>
        </div>

        {/* Title */}
        <button
          onClick={handleTitleClick}
          className="text-left group"
        >
          <h3
            className={`font-bold text-[#F0EBDD] leading-snug group-hover:text-[#C6FF00] transition-colors duration-150 ${
              compact ? 'text-base' : 'text-lg'
            }`}
          >
            {course.title}
          </h3>
        </button>

        {!compact && course.description && (
          <p className="text-sm text-[#888888] leading-relaxed line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Meta info */}
        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#888888] ${compact ? 'gap-x-3' : ''}`}>
          {course.professorId && (
            <span className="flex items-center gap-1">
              <User size={11} />
              {getProfessorById(course.professorId)?.name ?? course.professorId}
            </span>
          )}
          {course.credits !== undefined && (
            <span className="flex items-center gap-1">
              <Star size={11} />
              {course.credits} credits
            </span>
          )}
          {course.duration && (
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {course.duration}
            </span>
          )}
        </div>

        {/* Tags */}
        {!compact && course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'rgba(240,235,221,0.07)', color: '#888888' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Spacer + CTA */}
        <div className="mt-auto pt-3">
          {isCompleted ? (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#C6FF00]">
              <CheckCircle size={15} />
              Completed ✓
            </div>
          ) : isEnrolled ? (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#888888]">
              <BookOpen size={15} />
              Enrolled ✓
            </div>
          ) : (
            <button
              onClick={onEnroll}
              className="w-full py-2 rounded text-sm font-bold text-[#090909] bg-[#C6FF00] hover:bg-[#d4ff33] active:scale-95 transition-all duration-150"
            >
              Enroll
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
