import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import CourseCard from '../components/CourseCard';
import { courses as allCourses } from '../data/courses';
import { departments } from '../data/departments';
import type { StudentProfile } from '../types';

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────
interface CoursesProps {
  profile: StudentProfile | null;
  onEnroll: (courseId: string) => void;
}

// ─────────────────────────────────────────────
// Data: exclude the secret course
// ─────────────────────────────────────────────
const publicCourses = allCourses.filter((c) => c.id !== 'SECRET-666');

// Collect unique difficulty levels
const DIFFICULTIES = Array.from(new Set(publicCourses.map((c) => c.difficulty))).sort();

// ─────────────────────────────────────────────
// Animation
// ─────────────────────────────────────────────
const staggerGrid = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
function FilterTab({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200"
      style={
        active
          ? {
              backgroundColor: color ?? '#C6FF00',
              color: '#090909',
            }
          : {
              backgroundColor: 'rgba(255,255,255,0.05)',
              color: '#888888',
              border: '1px solid rgba(255,255,255,0.08)',
            }
      }
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function Courses({ profile, onEnroll }: CoursesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDeptId, setActiveDeptId] = useState<string>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  const [showDifficultyPanel, setShowDifficultyPanel] = useState(false);

  const enrolledCourses = profile?.enrolledCourses ?? [];
  const completedCourses = profile?.completedCourses ?? [];

  // ── Filtered courses ────────────────────────
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return publicCourses.filter((course) => {
      const matchesDept = activeDeptId === 'all' || course.departmentId === activeDeptId;
      const matchesDiff = activeDifficulty === 'all' || course.difficulty === activeDifficulty;
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        course.tags.some((t) => t.toLowerCase().includes(q));
      return matchesDept && matchesDiff && matchesSearch;
    });
  }, [searchQuery, activeDeptId, activeDifficulty]);

  const activeFiltersCount =
    (activeDeptId !== 'all' ? 1 : 0) + (activeDifficulty !== 'all' ? 1 : 0);

  function clearFilters() {
    setActiveDeptId('all');
    setActiveDifficulty('all');
    setSearchQuery('');
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#090909' }}>
      {/* ── Page header ─────────────────────────────── */}
      <motion.header
        className="border-b border-white/10 px-6 py-14 text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="mx-auto max-w-3xl">
          <div
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase"
            style={{ backgroundColor: 'rgba(198,255,0,0.1)', color: '#C6FF00' }}
          >
            {publicCourses.length} Courses Available
          </div>
          <h1
            className="mb-3 font-black leading-none tracking-tighter"
            style={{
              color: '#F0EBDD',
              fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            COURSE CATALOGUE OF
            <br />
            <span style={{ color: '#C6FF00' }}>QUESTIONABLE MERIT</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: '#888888' }}>
            Carefully curated academic experiences of dubious educational value.
            All courses are fully accredited by institutions we made up.
          </p>
        </div>
      </motion.header>

      {/* ── Filters bar ─────────────────────────────── */}
      <div
        className="sticky top-0 z-10 border-b border-white/10 px-6 py-4 backdrop-blur-md"
        style={{ backgroundColor: 'rgba(9,9,9,0.9)' }}
      >
        <div className="mx-auto max-w-7xl space-y-3">
          {/* Search */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: '#888888' }}
              />
              <input
                type="text"
                placeholder="Search courses by name, code, or tag…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none transition-all"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F0EBDD',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
                  style={{ color: '#888888' }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Difficulty toggle */}
            <button
              type="button"
              onClick={() => setShowDifficultyPanel((p) => !p)}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  activeDifficulty !== 'all' ? 'rgba(198,255,0,0.12)' : 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: activeDifficulty !== 'all' ? '#C6FF00' : '#888888',
              }}
            >
              <SlidersHorizontal size={14} />
              Difficulty
              {activeDifficulty !== 'all' && (
                <span
                  className="ml-1 rounded-full px-1.5 py-0.5 text-xs font-bold"
                  style={{ backgroundColor: '#C6FF00', color: '#090909' }}
                >
                  1
                </span>
              )}
            </button>

            {/* Clear all */}
            {(activeFiltersCount > 0 || searchQuery) && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm transition-opacity hover:opacity-80"
                style={{ color: '#888888' }}
              >
                <X size={13} />
                Clear
              </button>
            )}
          </div>

          {/* Difficulty sub-panel */}
          <AnimatePresence>
            {showDifficultyPanel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-1 pb-2">
                  <FilterTab
                    label="All Difficulties"
                    active={activeDifficulty === 'all'}
                    onClick={() => setActiveDifficulty('all')}
                  />
                  {DIFFICULTIES.map((d) => (
                    <FilterTab
                      key={d}
                      label={d}
                      active={activeDifficulty === d}
                      onClick={() => setActiveDifficulty(d)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Department tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <FilterTab
              label="All Departments"
              active={activeDeptId === 'all'}
              onClick={() => setActiveDeptId('all')}
            />
            {departments.map((dept) => (
              <FilterTab
                key={dept.id}
                label={dept.code}
                active={activeDeptId === dept.id}
                onClick={() => setActiveDeptId(dept.id)}
                color={dept.color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Course grid ─────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Result count */}
        <motion.p
          className="mb-6 text-xs tracking-widest uppercase"
          style={{ color: '#888888' }}
          key={filtered.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filtered.length} course{filtered.length !== 1 ? 's' : ''} found
          {(activeDeptId !== 'all' || activeDifficulty !== 'all' || searchQuery) &&
            ' · filtered'}
        </motion.p>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 py-24 text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <div className="mb-3 text-5xl">🔍</div>
              <h3
                className="mb-2 text-lg font-bold"
                style={{ color: '#F0EBDD' }}
              >
                No courses found
              </h3>
              <p className="mb-6 text-sm" style={{ color: '#888888' }}>
                Try adjusting your filters or search query.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full px-5 py-2 text-sm font-bold transition-opacity hover:opacity-80"
                style={{ backgroundColor: '#C6FF00', color: '#090909' }}
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerGrid}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((course) => (
                <motion.div key={course.id} variants={cardItem} layout>
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
        </AnimatePresence>
      </main>
    </div>
  );
}
