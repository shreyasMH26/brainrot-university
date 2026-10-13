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
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="pointer-events-auto relative flex items-center gap-4 rounded-xl px-5 py-4 shadow-2xl"
            style={{
              backgroundColor: '#0f0f0f',
              border: '1px solid rgba(198,255,0,0.35)',
              minWidth: 280,
              maxWidth: 340,
              boxShadow: '0 8px 40px rgba(198,255,0,0.12)',
            }}
          >
            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 rounded-b-xl"
              style={{ backgroundColor: '#C6FF00' }}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />

            {/* Icon */}
            <div
              className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: 'rgba(198,255,0,0.12)' }}
            >
              {current.icon ?? '🏆'}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Trophy size={11} style={{ color: '#C6FF00' }} />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C6FF00]">
                  Achievement Unlocked!
                </span>
              </div>
              <p className="text-sm font-bold text-[#F0EBDD] truncate">{current.title}</p>
              <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="shrink-0 text-[#888888] hover:text-[#F0EBDD] transition-colors p-1 -mr-1"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>

            {/* Counter (if multiple) */}
            {matched.length > 1 && (
              <div
                className="absolute top-2 right-8 text-[9px] font-bold text-[#888888]"
              >
                {currentIndex + 1}/{matched.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
