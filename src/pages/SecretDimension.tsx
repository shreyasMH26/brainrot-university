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
    <div className="min-h-screen bg-[#090909] text-[#F0EBDD] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Glitchy visual background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C6FF00_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full bg-[#0f0f0f] border-2 border-[#C6FF00] rounded-2xl p-8 text-center space-y-6 relative z-10 shadow-[0_0_50px_rgba(198,255,0,0.15)]"
      >
        <div className="inline-flex p-4 rounded-full bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-[#C6FF00]">
          <Skull size={48} className="animate-bounce" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#C6FF00] uppercase tracking-widest">
            <AlertOctagon size={14} /> CLASSIFIED ARCHIVE UNLOCKED
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase text-[#F0EBDD] tracking-tight">
            THE FORBIDDEN SECTOR
          </h1>
          <p className="text-xs text-[#888888] leading-relaxed">
            You clicked the university crest seven times. You weren't supposed to find this. By entering this room, your GPA has officially integer overflowed into negative territory.
          </p>
        </div>

        <div className="bg-[#090909] border border-[#F0EBDD]/10 rounded-xl p-5 text-left space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#C6FF00]">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles size={14} /> SECRET-666
            </span>
            <span className="text-[10px] bg-[#C6FF00]/10 px-2 py-0.5 rounded">99 CREDITS</span>
          </div>
          <h3 className="text-sm font-bold text-[#F0EBDD] font-sans">
            The Forbidden Curriculum
          </h3>
          <p className="text-[#888888] font-sans text-xs">
            A forbidden masterclass exploring what happens when you spend 18 hours straight in a dark room consuming algorithmic brainrot.
          </p>

          <Link
            to="/courses/SECRET-666"
            onClick={onUnlockSecret}
            className="block w-full text-center bg-[#C6FF00] text-[#090909] font-sans font-black py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-[#d4ff33] active:scale-95 transition mt-3"
          >
            Access Secret Syllabus →
          </Link>
        </div>

        <div className="flex justify-center">
          <Link
            to="/"
            className="text-xs text-[#888888] hover:text-[#F0EBDD] flex items-center gap-1.5 transition"
          >
            <BookOpen size={14} /> Return to Sanity
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
