import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import type { Achievement } from '../types';
import { achievements as allAchievements } from '../data/achievements';

interface AchievementToastProps {
  achievementIds: string[];
  onDismiss: () => void;
}

export default function AchievementToast({ achievementIds, onDismiss }: AchievementToastProps) {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const matched: Achievement[] = achievementIds
    .map((id) => allAchievements.find((a) => a.id === id))
    .filter((a): a is Achievement => Boolean(a));

  const current = matched[currentIndex];

  useEffect(() => {
    if (!visible || !current) return;
    const timer = setTimeout(() => {
      if (currentIndex < matched.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setVisible(false);
        setTimeout(onDismiss, 400);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [visible, currentIndex, matched.length, onDismiss, current]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(onDismiss, 400);
  };

  if (!current) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={`${current.id}-${currentIndex}`}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pointer-events-auto relative flex items-center gap-4 rounded-2xl p-4 shadow-2xl bg-[#111111]/95 border border-white/20 backdrop-blur-xl max-w-sm"
          >
            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl bg-white"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />

            {/* Icon */}
            <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-2xl bg-white/5 border border-white/10">
              {current.icon ?? '🏆'}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Trophy size={11} className="text-[#C6FF00]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6FF00]">
                  Accolade Unlocked
                </span>
              </div>
              <p className="text-xs font-heading font-medium text-white truncate">{current.title}</p>
              <p className="text-[11px] text-white/50 font-light line-clamp-2 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="shrink-0 text-white/40 hover:text-white transition-colors p-1"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
