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
  const displayDescription = showDetails ? achievement.description : 'Secret Achievement';
  const displayIcon = showDetails ? achievement.icon : '🔒';

  return (
    <motion.div
      initial={isNew ? { scale: 0.5, opacity: 0, y: 20 } : false}
      animate={isNew ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative rounded-xl p-5 flex flex-col items-center text-center gap-3 overflow-hidden"
      style={{
        backgroundColor: '#0f0f0f',
        border: unlocked
          ? '1px solid rgba(198,255,0,0.3)'
          : '1px solid rgba(240,235,221,0.08)',
        opacity: unlocked ? 1 : 0.6,
      }}
    >
      {/* New badge */}
      {isNew && unlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
          className="absolute top-2 right-2 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded"
          style={{ backgroundColor: '#C6FF00', color: '#090909' }}
        >
          NEW
        </motion.div>
      )}

      {/* Icon */}
      <div className="relative">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
            !unlocked ? 'blur-[2px] grayscale' : ''
          }`}
          style={{
            backgroundColor: unlocked ? 'rgba(198,255,0,0.1)' : 'rgba(136,136,136,0.1)',
          }}
        >
          {displayIcon}
        </div>
        {/* Lock overlay */}
        {!unlocked && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full"
            style={{ backgroundColor: 'rgba(9,9,9,0.55)' }}
          >
            <Lock size={20} className="text-[#888888]" />
          </div>
        )}
        {/* Unlocked glow ring */}
        {unlocked && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: ['0 0 0px #C6FF0060', '0 0 16px #C6FF0060', '0 0 0px #C6FF0060'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1">
        <h3
          className="text-sm font-bold uppercase tracking-wide"
          style={{ color: unlocked ? '#F0EBDD' : '#888888' }}
        >
          {displayTitle}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: '#888888' }}>
          {displayDescription}
        </p>
      </div>
    </motion.div>
  );
}
