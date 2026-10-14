import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame, User, AlertCircle } from 'lucide-react';
import type { StudentProfile } from '../types';

interface HallEntry {
  rank: number;
  emoji: string;
  name: string;
  title: string;
  topAchievement: string;
  highestGrade: string;
  brainrotScore: number;
}

interface HallOfFameProps {
  profile: StudentProfile | null;
}

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
    topAchievement: 'Completed all 26 courses simultaneously while appearing to be AFK',
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

const EntryRow: React.FC<{ entry: HallEntry; index: number }> = ({ entry, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className="border border-white/10 bg-[#111111]/80 hover:border-white/25 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 transition-all duration-200"
    >
      {/* Rank */}
      <div className="font-mono font-bold text-lg text-white/50 w-10 shrink-0 text-center">
        {entry.rank <= 3 ? (
          <span className="text-xl">
            {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
          </span>
        ) : (
          `#${entry.rank}`
        )}
      </div>

      {/* Emoji avatar */}
      <div className="text-2xl w-10 text-center shrink-0 hidden sm:block">{entry.emoji}</div>

      {/* Name + title + achievement */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-heading font-medium uppercase text-base text-white">
            {entry.name}
          </span>
          <span className="text-white/30 text-xs hidden sm:inline">·</span>
          <span className="text-white/50 text-xs font-mono">{entry.title}</span>
        </div>
        <p className="text-white/60 text-xs mt-1 font-light leading-relaxed">
          {entry.topAchievement}
        </p>
      </div>

      {/* Grade */}
      <div className="shrink-0 text-right hidden md:block">
        <p className="text-white font-mono text-xs">{entry.highestGrade}</p>
        <p className="text-white/40 text-[10px] uppercase font-mono tracking-widest mt-0.5">Top Grade</p>
      </div>

      {/* Score */}
      <div className="shrink-0 text-right">
        <p className="font-mono font-bold text-lg text-[#C6FF00]">
          {entry.brainrotScore.toLocaleString()}
        </p>
        <p className="text-white/40 text-[10px] uppercase font-mono tracking-widest mt-0.5">Aura Score</p>
      </div>
    </motion.div>
  );
};

const HallOfFame: React.FC<HallOfFameProps> = ({ profile }) => {
  const [sortedEntries] = useState<HallEntry[]>(
    [...HALL_ENTRIES].sort((a, b) => b.brainrotScore - a.brainrotScore)
  );

  const localScore = profile
    ? Math.floor(
        (profile.completedCourses?.length ?? 0) * 1337 +
          (profile.totalCorrectAnswers ?? 0) * 42 +
          (profile.certificates?.length ?? 0) * 500
      )
    : 0;

  return (
    <main className="bg-[#090909] text-white min-h-screen pt-28 sm:pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:text-left"
        >
          <div className="mb-4 inline-block rounded-full px-3.5 py-1 text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 text-white/70">
            Aura Leaderboard
          </div>
          <h1
            className="font-heading font-medium leading-[0.95] tracking-tight uppercase text-white mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            HALL OF <span className="text-white/40">FAME</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-light max-w-2xl leading-relaxed">
            The most academically damaged individuals in the known universe, ranked by their Brainrot
            Score — a proprietary metric we absolutely made up.
          </p>
        </motion.div>

        {/* Disclaimer Banner */}
        <div className="flex gap-3 border border-white/10 bg-[#111111]/80 rounded-2xl p-4 mb-10 text-xs text-white/60 font-light">
          <AlertCircle size={16} className="text-white/40 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white font-medium">Archival Notice:</strong> All entries below are
            fictional sample profiles created for satirical purposes. Your local exam results are stored
            only on your device and are never transmitted to external servers.
          </p>
        </div>

        {/* Sort indicator */}
        <div className="flex items-center gap-2 mb-4 text-xs font-mono text-white/40">
          <Trophy size={14} className="text-[#C6FF00]" />
          <span>RANKED BY AURA SCORE · TOP 10 SCHOLARS</span>
        </div>

        {/* Entries list */}
        <div className="flex flex-col gap-3">
          {sortedEntries.map((entry, i) => (
            <EntryRow key={entry.rank} entry={entry} index={i} />
          ))}
        </div>

        {/* YOUR RANKING */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="flex items-center gap-2.5 mb-6">
            <User size={16} className="text-white/40" />
            <h2 className="font-heading text-xl uppercase font-medium text-white tracking-wide">
              Your Academic Standing
            </h2>
          </div>

          {profile ? (
            <div className="rounded-2xl border border-white/10 bg-[#111111]/90 p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
                <div>
                  <p className="text-[10px] uppercase text-white/40 tracking-wider mb-1">Scholar</p>
                  <p className="font-heading text-lg text-white uppercase">{profile.name ?? 'Anonymous'}</p>
                  {profile.currentTitle && (
                    <p className="text-xs text-white/50 font-mono mt-0.5">{profile.currentTitle}</p>
                  )}
                </div>

                <div>
                  <p className="text-[10px] uppercase text-white/40 tracking-wider mb-1">Courses Passed</p>
                  <p className="font-bold text-2xl text-white">
                    {profile.completedCourses?.length ?? 0}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-white/40 tracking-wider mb-1">Certificates</p>
                  <p className="font-bold text-2xl text-white">
                    {profile.certificates?.length ?? 0}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase text-white/40 tracking-wider mb-1">Your Aura Score</p>
                  <p className="font-bold text-2xl text-[#C6FF00]">
                    {localScore.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex justify-between text-xs font-mono text-white/50 mb-2">
                  <span>Threshold to Top 10</span>
                  <span>
                    {Math.min(100, Math.round((localScore / HALL_ENTRIES[9].brainrotScore) * 100))}%
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full w-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-700"
                    style={{
                      width: `${Math.min(100, (localScore / HALL_ENTRIES[9].brainrotScore) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-white/50 font-light">
                <Flame size={14} className="text-[#C6FF00] shrink-0 mt-0.5" />
                <p>
                  Complete examinations in the catalogue to boost your local aura points. All progress
                  remains persistent on your browser storage.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#111111]/60 p-12 text-center">
              <Star size={24} className="text-white/30 mx-auto mb-3" />
              <p className="font-heading text-lg text-white mb-2">No Student Profile Registered</p>
              <p className="text-xs sm:text-sm text-white/50 max-w-md mx-auto mb-6 font-light">
                Sit for an examination in the Examination Hall to establish your profile and compute your
                local aura score.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HallOfFame;
