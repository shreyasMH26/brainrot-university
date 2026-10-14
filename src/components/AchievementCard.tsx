import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import type { Achievement } from '../types';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
  isNew?: boolean;
}

export default function AchievementCard({ achievement, unlocked, isNew = false }: AchievementCardProps) {
  const isSecret = achievement.secret ?? false;
  const showDetails = unlocked || !isSecret;

  const displayTitle = showDetails ? achievement.title : '???';
  const displayDescription = showDetails ? achievement.description : 'Secret Accolade';
  const displayIcon = showDetails ? achievement.icon : '🔒';

  return (
    <motion.div
      initial={isNew ? { scale: 0.9, opacity: 0 } : false}
      animate={isNew ? { scale: 1, opacity: 1 } : {}}
      className={`relative rounded-2xl p-6 flex flex-col items-center text-center gap-3 overflow-hidden border transition-all duration-300 ${
        unlocked
          ? 'bg-[#111111]/90 border-white/20'
          : 'bg-[#0d0d0d]/60 border-white/5 opacity-50'
      }`}
    >
      {/* Icon */}
      <div className="relative my-1">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${
            unlocked
              ? 'bg-white/5 border-white/15'
              : 'bg-white/5 border-white/5 blur-[2px] grayscale'
          }`}
        >
          {displayIcon}
        </div>
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
            <Lock size={16} className="text-white/40" />
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="flex flex-col gap-1">
        <h3
          className={`font-heading text-sm font-medium uppercase tracking-tight ${
            unlocked ? 'text-white' : 'text-white/40'
          }`}
        >
          {displayTitle}
        </h3>
        <p className="text-xs text-white/50 font-light leading-relaxed">
          {displayDescription}
        </p>
      </div>
    </motion.div>
  );
}
