import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame, User, AlertCircle } from 'lucide-react';
import type { StudentProfile } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────
interface HallEntry {
  rank: number;
  emoji: string;
  name: string;
  title: string;
  topAchievement: string;
  highestGrade: string;
  brainrotScore: number;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface HallOfFameProps {
  profile: StudentProfile | null;
}

// ─── Fictional Data ───────────────────────────────────────────────────────────
const HALL_ENTRIES: HallEntry[] = [
  {
    rank: 1,
    emoji: '💀',
    name: 'Delulu Maximilian',
    title: 'Grand Arch-Procrastinator',
    topAchievement: 'First scholar to achieve terminal-level brainrot and still maintain a 4.20 GPA',
    highestGrade: 'A+ (Somehow)',
    brainrotScore: 99_420,
  },
  {
    rank: 2,
    emoji: '🧠',
    name: 'Professor NPC',
    title: 'Doctor of Undefined Behaviour',
    topAchievement: 'Completed all 42 courses simultaneously while appearing to be AFK',
    highestGrade: 'S-Tier',
    brainrotScore: 88_001,
  },
  {
    rank: 3,
    emoji: '💪',
    name: 'Sigma Grindset McMahon',
    title: 'Master of Hustle Culture Studies',
    topAchievement: 'Perfect score in Skibidi Linguistics; invented two new conjugations',
    highestGrade: 'Omega A',
    brainrotScore: 77_777,
  },
  {
    rank: 4,
    emoji: '🧬',
    name: 'Braincell Patricia',
    title: 'Last Known Functioning Neuron',
    topAchievement: 'Survived Advanced Overthinking without overthinking the coursework',
    highestGrade: 'A (Reluctantly)',
    brainrotScore: 66_666,
  },
  {
    rank: 5,
    emoji: '📱',
    name: 'TikTok Archaeologist PhD',
    title: 'Professor of Digital Fossils',
    topAchievement: 'Wrote dissertation entirely in trending audio captions',
    highestGrade: 'A+ (Went Viral)',
    brainrotScore: 58_300,
  },
  {
    rank: 6,
    emoji: '🎯',
    name: 'Rizz Wellington III',
    title: 'Chair of Applied Charisma',
    topAchievement: 'Raised personal rizz coefficient by 4.2 sigmas via academic study',
    highestGrade: 'Distinction (Smooth)',
    brainrotScore: 50_050,
  },
  {
    rank: 7,
    emoji: '🌿',
    name: 'Grasstouch McReality',
    title: 'Pioneer of Field-Based Research',
    topAchievement: 'Only known student to have touched grass voluntarily — twice',
    highestGrade: 'B+ (Outdoor)',
    brainrotScore: 43_200,
  },
  {
    rank: 8,
    emoji: '🤖',
    name: 'ChatGPT Denier',
    title: 'Artisanal Hand-Crafted Thought Producer',
    topAchievement: 'Wrote 10,000 words by hand. No one asked.',
    highestGrade: 'A- (Suspicious)',
    brainrotScore: 38_900,
  },
  {
    rank: 9,
    emoji: '🦆',
    name: 'Quackademic Extraordinaire',
    title: 'Visiting Duck from the Pond Dept.',
    topAchievement: 'Attended every single office hour; asked no questions',
    highestGrade: 'Quack',
    brainrotScore: 31_100,
  },
  {
    rank: 10,
    emoji: '😴',
    name: 'Napper McGradepoint',
    title: 'Associate Professor of Rest Studies',
    topAchievement: 'Achieved passing grade while technically asleep for 70% of exams',
    highestGrade: 'C+ (REM Cycle)',
    brainrotScore: 22_222,
  },
];

// ─── Medal colours ────────────────────────────────────────────────────────────
const rankStyle = (rank: number): { bg: string; text: string; border: string } => {
  if (rank === 1) return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' };
  if (rank === 2) return { bg: 'bg-slate-400/10', text: 'text-slate-300', border: 'border-slate-400/30' };
  if (rank === 3) return { bg: 'bg-orange-700/10', text: 'text-orange-400', border: 'border-orange-600/30' };
  return { bg: 'bg-transparent', text: 'text-[#C6FF00]', border: 'border-[#F0EBDD]/10' };
};

// ─── Row Component ────────────────────────────────────────────────────────────
interface EntryRowProps {
  entry: HallEntry;
  index: number;
}

const EntryRow: React.FC<EntryRowProps> = ({ entry, index }) => {
  const style = rankStyle(entry.rank);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`border ${style.border} ${style.bg} p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 hover:brightness-110 transition-all duration-200`}
    >
      {/* Rank */}
      <div className={`font-black text-2xl font-mono ${style.text} w-10 shrink-0 text-center`}>
        {entry.rank <= 3 ? (
          <span title={`#${entry.rank}`}>
            {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
          </span>
        ) : (
          `#${entry.rank}`
        )}
      </div>

      {/* Emoji avatar */}
      <div className="text-3xl w-12 text-center shrink-0 hidden sm:block">{entry.emoji}</div>

      {/* Name + title + achievement */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-black uppercase text-base text-[#F0EBDD]">{entry.name}</span>
          <span className="text-[#888888] text-xs hidden sm:inline">·</span>
          <span className="text-[#888888] text-xs italic">{entry.title}</span>
        </div>
        <p className="text-[#888888] text-xs mt-1 line-clamp-2 leading-relaxed">{entry.topAchievement}</p>
      </div>

      {/* Grade */}
      <div className="shrink-0 text-right hidden md:block">
        <p className="text-[#F0EBDD] font-black text-sm">{entry.highestGrade}</p>
        <p className="text-[#888888] text-xs uppercase tracking-widest mt-0.5">Top Grade</p>
      </div>

      {/* Score */}
      <div className="shrink-0 text-right">
        <p className={`font-black text-xl font-mono ${style.text}`}>
          {entry.brainrotScore.toLocaleString()}
        </p>
        <p className="text-[#888888] text-xs uppercase tracking-widest mt-0.5">Brainrot Score</p>
      </div>
    </motion.div>
  );
};

// ─── Hall of Fame Page ────────────────────────────────────────────────────────
const HallOfFame: React.FC<HallOfFameProps> = ({ profile }) => {
  const [sortedEntries] = useState<HallEntry[]>(
    [...HALL_ENTRIES].sort((a, b) => b.brainrotScore - a.brainrotScore)
  );

  // Compute a mock brainrot score from local profile data
  const localScore = profile
    ? Math.floor(
        (profile.completedCourses?.length ?? 0) * 1337 +
          (profile.totalCorrectAnswers ?? 0) * 42 +
          (profile.certificates?.length ?? 0) * 500
      )
    : 0;

  return (
    <main className="bg-[#090909] text-[#F0EBDD] min-h-screen pt-24 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <p className="text-[#C6FF00] text-xs font-black tracking-[0.35em] uppercase mb-4">
            RANKINGS
          </p>
          <h1
            className="font-black uppercase leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
          >
            HALL OF <span className="text-[#C6FF00]">FAME</span>
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl leading-relaxed">
            The most academically damaged individuals in the known universe, ranked by their
            Brainrot Score — a proprietary metric we absolutely made up.
          </p>
        </motion.div>

        {/* ── Disclaimer ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-3 border border-[#641C2B]/60 bg-[#641C2B]/10 p-4 mb-12 text-sm"
        >
          <AlertCircle size={18} className="text-[#641C2B] shrink-0 mt-0.5" />
          <p className="text-[#888888] leading-relaxed">
            <strong className="text-[#F0EBDD]">Disclaimer:</strong> All entries below are fictional
            sample profiles created for entertainment. This is not a real global leaderboard. Your
            local progress is stored only on your device and is never shared or uploaded anywhere.
          </p>
        </motion.div>

        {/* ── Sort indicator ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mb-6"
        >
          <Trophy size={14} className="text-[#C6FF00]" />
          <span className="text-[#888888] text-xs uppercase tracking-widest">
            Sorted by Brainrot Score · Descending · Top 10 Entries
          </span>
        </motion.div>

        {/* ── Table header (desktop) ───────────────────────────────────────── */}
        <div className="hidden md:grid grid-cols-[2.5rem_3rem_1fr_auto_auto] gap-4 px-5 py-2 mb-2 text-[#888888] text-[10px] uppercase tracking-widest border-b border-[#F0EBDD]/10">
          <span>Rank</span>
          <span></span>
          <span>Scholar</span>
          <span className="text-right">Top Grade</span>
          <span className="text-right">Score</span>
        </div>

        {/* ── Entries ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-2">
          {sortedEntries.map((entry, i) => (
            <EntryRow key={entry.rank} entry={entry} index={i} />
          ))}
        </div>

        {/* ── YOUR RANKING ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 border-t border-[#F0EBDD]/10 pt-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <User size={18} className="text-[#C6FF00]" />
            <h2 className="font-black uppercase text-2xl tracking-wide">YOUR RANKING</h2>
          </div>

          {profile ? (
            <div className="border border-[#C6FF00]/30 bg-[#C6FF00]/5 p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Name */}
                <div>
                  <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Scholar</p>
                  <p className="font-black text-xl text-[#F0EBDD] uppercase">
                    {profile.name ?? 'Anonymous'}
                  </p>
                  {profile.currentTitle && (
                    <p className="text-[#888888] text-xs italic mt-1">{profile.currentTitle}</p>
                  )}
                </div>

                {/* Courses completed */}
                <div>
                  <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Courses Completed</p>
                  <p className="font-black text-3xl font-mono text-[#C6FF00]">
                    {profile.completedCourses?.length ?? 0}
                  </p>
                </div>

                {/* Certificates */}
                <div>
                  <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Certificates</p>
                  <p className="font-black text-3xl font-mono text-[#C6FF00]">
                    {profile.certificates?.length ?? 0}
                  </p>
                </div>

                {/* Brainrot score */}
                <div>
                  <p className="text-[#888888] text-xs uppercase tracking-widest mb-2">Your Brainrot Score</p>
                  <p className="font-black text-3xl font-mono text-[#C6FF00]">
                    {localScore.toLocaleString()}
                  </p>
                  <p className="text-[#888888] text-xs mt-1">
                    {localScore >= HALL_ENTRIES[9].brainrotScore
                      ? '🏆 Leaderboard-worthy!'
                      : `${(HALL_ENTRIES[9].brainrotScore - localScore).toLocaleString()} pts to enter top 10`}
                  </p>
                </div>
              </div>

              {/* Progress bar towards #10 */}
              <div className="mt-8">
                <div className="flex justify-between text-xs text-[#888888] mb-2">
                  <span>Progress toward Top 10</span>
                  <span>
                    {Math.min(100, Math.round((localScore / HALL_ENTRIES[9].brainrotScore) * 100))}%
                  </span>
                </div>
                <div className="h-2 bg-[#F0EBDD]/10 w-full">
                  <motion.div
                    className="h-full bg-[#C6FF00]"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(100, (localScore / HALL_ENTRIES[9].brainrotScore) * 100)}%`,
                    }}
                    transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>

              {/* Motivational note */}
              <div className="mt-6 flex items-start gap-3 text-[#888888] text-sm">
                <Flame size={16} className="text-[#C6FF00] shrink-0 mt-0.5" />
                <p>
                  Complete more courses and score higher on exams to increase your Brainrot Score.
                  Your data lives only on this device — completely local, completely yours.
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-[#F0EBDD]/10 p-10 text-center">
              <Star size={32} className="text-[#888888] mx-auto mb-5" />
              <p className="font-black uppercase text-lg mb-3">No Profile Found</p>
              <p className="text-[#888888] max-w-md mx-auto leading-relaxed">
                Create a profile by completing your first course exam. Your stats will appear here —
                stored locally on your device, never uploaded anywhere.
              </p>
            </div>
          )}
        </motion.div>

        {/* ── Fine print ──────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-[#888888] text-xs text-center leading-relaxed"
        >
          * All fictional entries are for entertainment only. Brainrot University is a satirical platform.
          No actual academic credentials are awarded. Brainrot Scores are entirely made up.
        </motion.p>
      </div>
    </main>
  );
};

export default HallOfFame;
