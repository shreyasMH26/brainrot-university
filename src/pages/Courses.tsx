import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import CourseCard from '../components/CourseCard';
import { courses as allCourses } from '../data/courses';
import { departments } from '../data/departments';
import type { StudentProfile } from '../types';

interface CoursesProps {
  profile: StudentProfile | null;
  onEnroll: (courseId: string) => void;
}

// Data: exclude secret course from public listing
const publicCourses = allCourses.filter((c) => c.id !== 'SECRET-666');

// Collect unique difficulty levels
const DIFFICULTIES = Array.from(new Set(publicCourses.map((c) => c.difficulty))).sort();

const staggerGrid = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

function FilterTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-white text-black shadow-sm'
          : 'bg-white/5 text-white/60 border border-white/10 hover:text-white hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
}

export default function Courses({ profile, onEnroll }: CoursesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDeptId, setActiveDeptId] = useState<string>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  const [showDifficultyPanel, setShowDifficultyPanel] = useState(false);

  const completedCourses = profile?.completedCourses ?? [];
  const enrolledCourses = profile?.enrolledCourses ?? [];

  // Filtered courses
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
    <div className="min-h-screen bg-[#090909] text-white pt-28 sm:pt-32 pb-24">
      {/* ── Page Header ─────────────────────────────── */}
      <motion.header
        className="px-6 pb-12 text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-block rounded-full px-3.5 py-1 text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 text-white/70">
            {publicCourses.length} Courses Catalogued
          </div>
          <h1
            className="mb-4 font-heading font-medium leading-[0.95] tracking-tight uppercase text-white"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            COURSE CATALOGUE OF
            <br />
            <span className="text-white/40">QUESTIONABLE MERIT</span>
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed text-white/60 font-light max-w-lg mx-auto">
            Carefully curated academic experiences of dubious educational value. All courses are fully
            open-access with zero applications required.
          </p>
        </div>
      </motion.header>

      {/* ── Sticky Filters Bar ─────────────────────────────── */}
      <div className="sticky top-16 z-20 border-y border-white/10 px-6 py-4 backdrop-blur-xl bg-[#090909]/85">
        <div className="mx-auto max-w-7xl space-y-3">
          {/* Search & Actions */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="text"
                placeholder="Search by course title, code, or topic…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full py-2.5 pl-11 pr-10 text-xs sm:text-sm outline-none transition-all bg-white/5 border border-white/10 text-white placeholder-white/35 focus:border-white/30 focus:bg-white/10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Difficulty Toggle */}
            <button
              type="button"
              onClick={() => setShowDifficultyPanel((p) => !p)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeDifficulty !== 'all'
                  ? 'bg-white text-black'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <SlidersHorizontal size={13} />
              <span>Difficulty</span>
              {activeDifficulty !== 'all' && (
                <span className="ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold bg-black text-white">
                  1
                </span>
              )}
            </button>

            {/* Clear Filters */}
            {(activeFiltersCount > 0 || searchQuery) && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-mono text-white/50 hover:text-white transition-colors"
              >
                <X size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Difficulty Sub-panel */}
          <AnimatePresence>
            {showDifficultyPanel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                  <span className="text-[11px] font-mono text-white/40 uppercase mr-2">
                    Difficulty:
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveDifficulty('all')}
                    className={`rounded-full px-3 py-1 text-xs font-mono transition-all ${
                      activeDifficulty === 'all'
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  {DIFFICULTIES.map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setActiveDifficulty(diff)}
                      className={`rounded-full px-3 py-1 text-xs font-mono transition-all uppercase ${
                        activeDifficulty === diff
                          ? 'bg-white text-black'
                          : 'bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Department Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <FilterTab
              label="All Departments"
              active={activeDeptId === 'all'}
              onClick={() => setActiveDeptId('all')}
            />
            {departments.map((dept) => (
              <FilterTab
                key={dept.id}
                label={`${dept.emoji ?? '🎓'} ${dept.name}`}
                active={activeDeptId === dept.id}
                onClick={() => setActiveDeptId(dept.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Course Grid ─────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 pt-10">
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-white/40">
          <span>SHOWING {filtered.length} OF {publicCourses.length} COURSES</span>
          {activeFiltersCount > 0 && (
            <span className="text-[#C6FF00]">FILTERS ACTIVE</span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#111111]/60 p-16 text-center">
            <p className="font-heading text-xl text-white mb-2">No courses match your criteria</p>
            <p className="text-sm text-white/50 mb-6 font-light">
              Try adjusting your search terms or clearing current department filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="bg-white text-black text-xs font-medium px-6 py-2.5 rounded-full hover:bg-white/80 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerGrid}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((course) => (
              <motion.div key={course.id} variants={cardItem}>
                <CourseCard
                  course={course}
                  isCompleted={completedCourses.includes(course.id)}
                  isEnrolled={enrolledCourses.includes(course.id)}
                  onEnroll={() => onEnroll(course.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
