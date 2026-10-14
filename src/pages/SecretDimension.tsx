import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Skull, AlertOctagon, Sparkles, BookOpen } from 'lucide-react';
import type { StudentProfile } from '../types';

interface SecretDimensionProps {
  profile: StudentProfile | null;
  onUnlockSecret: () => void;
}

export default function SecretDimension({ profile: _profile, onUnlockSecret }: SecretDimensionProps) {
  return (
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center px-6 pt-28 pb-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-[#111111]/90 border border-white/20 rounded-3xl p-8 sm:p-10 text-center space-y-6 relative z-10 shadow-2xl"
      >
        <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 text-white">
          <Skull size={40} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#C6FF00] uppercase tracking-widest">
            <AlertOctagon size={14} /> CLASSIFIED ARCHIVE UNLOCKED
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-medium uppercase text-white tracking-tight">
            THE FORBIDDEN SECTOR
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            You clicked the university crest seven times. You weren&apos;t supposed to find this. By entering
            this chamber, your academic standing has officially integer overflowed into negative territory.
          </p>
        </div>

        <div className="bg-[#0c0c0c] border border-white/10 rounded-2xl p-6 text-left space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#C6FF00]">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles size={14} /> SECRET-666
            </span>
            <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-white/70">
              99 CREDITS
            </span>
          </div>
          <h3 className="font-heading text-base font-medium text-white">
            The Forbidden Curriculum
          </h3>
          <p className="text-white/60 font-light text-xs leading-relaxed">
            A classified masterclass exploring what happens when you spend 18 consecutive hours in a dark
            room consuming algorithmic feeds.
          </p>

          <Link
            to="/courses/SECRET-666"
            onClick={onUnlockSecret}
            className="block w-full text-center bg-white text-black font-medium py-3 rounded-full text-xs uppercase tracking-wider hover:bg-white/85 transition mt-4 shadow-md"
          >
            Access Secret Syllabus →
          </Link>
        </div>

        <div className="flex justify-center pt-2">
          <Link
            to="/"
            className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1.5 transition"
          >
            <BookOpen size={14} /> Return to Campus
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
