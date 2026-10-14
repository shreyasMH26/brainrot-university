import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  GraduationCap,
  Trophy,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import type { StudentProfile, Certificate as CertificateType } from '../types';
import { achievements } from '../data/achievements';
import AchievementCard from '../components/AchievementCard';
import Certificate from '../components/Certificate';
import { getAverageScore } from '../utils/storage';

interface StudentPortalProps {
  profile: StudentProfile | null;
  onCreateProfile: (name: string) => void;
  onResetProfile: () => void;
  onUpdateName: (name: string) => void;
}

export default function StudentPortal({
  profile,
  onCreateProfile,
  onResetProfile,
  onUpdateName,
}: StudentPortalProps) {
  const [nameInput, setNameInput] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameVal, setEditNameVal] = useState('');
  const [selectedCert, setSelectedCert] = useState<CertificateType | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetInput, setResetInput] = useState('');
  const [achievementFilter, setAchievementFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    onCreateProfile(nameInput.trim());
  };

  const handleUpdateNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editNameVal.trim()) return;
    onUpdateName(editNameVal.trim());
    setIsEditingName(false);
  };

  const handleConfirmReset = () => {
    if (resetInput === 'DROPOUT') {
      onResetProfile();
      setShowResetConfirm(false);
      setResetInput('');
    }
  };

  // ─────────────────────────────────────────────────────────────
  // 1. NO PROFILE STATE
  // ─────────────────────────────────────────────────────────────
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[#111111]/90 border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-2xl"
        >
          <div className="space-y-2">
            <span className="text-4xl">☠️</span>
            <h1 className="font-heading text-2xl font-medium text-white uppercase tracking-tight">
              STUDENT IDENTITY REGISTRATION
            </h1>
            <p className="text-xs text-white/50 font-light">
              Begin your path to comprehensive academic downfall.
            </p>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-widest text-white/40 mb-2">
                Scholar Alias / Real Name
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Delulu Dave or Queen of Procrastination"
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 font-mono"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-medium py-3 rounded-full text-xs sm:text-sm tracking-wide uppercase hover:bg-white/85 active:scale-[0.98] transition shadow-md"
            >
              Generate Student ID & Begin
            </button>
          </form>

          <p className="text-[10px] text-white/40 font-mono leading-relaxed border-t border-white/5 pt-4">
            Notice: All records, titles, and IDs are purely fictional and saved locally in your browser.
            No personal data leaves this device.
          </p>
        </motion.div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. HAS PROFILE DASHBOARD
  // ─────────────────────────────────────────────────────────────
  const avgScore = getAverageScore(profile);
  const filteredAchievements = achievements.filter((a) => {
    const isUnlocked = profile.achievements.includes(a.id);
    if (achievementFilter === 'unlocked') return isUnlocked;
    if (achievementFilter === 'locked') return !isUnlocked;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#090909] text-white pt-28 sm:pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header / ID Card Section */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Virtual Student ID Card */}
          <div className="md:col-span-1 bg-[#121212] text-white rounded-3xl p-6 border border-white/20 shadow-2xl relative overflow-hidden flex flex-col justify-between aspect-[1.58/1]">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#C6FF00] uppercase block">
                  BRAINROT UNIVERSITY ✳︎
                </span>
                <span className="text-[8px] text-white/40 font-mono">OFFICIAL SCHOLAR CARD</span>
              </div>
              <div className="text-xl">☠️</div>
            </div>

            <div className="my-3 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-lg font-medium uppercase tracking-tight text-white truncate">
                  {profile.name}
                </h2>
                <button
                  onClick={() => {
                    setEditNameVal(profile.name);
                    setIsEditingName(true);
                  }}
                  className="text-[10px] font-mono text-white/40 hover:text-white underline"
                >
                  edit
                </button>
              </div>
              <p className="text-[10px] font-mono text-[#C6FF00] bg-white/5 px-2 py-0.5 rounded-full inline-block border border-white/5">
                {profile.currentTitle}
              </p>
            </div>

            <div className="flex justify-between items-end border-t border-white/10 pt-2 text-[9px] font-mono text-white/50">
              <div>
                <span className="text-white/30 block">STUDENT ID</span>
                <span className="font-bold text-white">{profile.studentId}</span>
              </div>
              <div className="text-right">
                <span className="text-white/30 block">ENROLLED</span>
                <span className="font-bold text-white">
                  {new Date(profile.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 h-full">
            {[
              { label: 'Enrolled Modules', value: profile.enrolledCourses.length, icon: BookOpen },
              { label: 'Passed Exams', value: profile.completedCourses.length, icon: GraduationCap },
              { label: 'Avg Exam Score', value: `${avgScore}%`, icon: Trophy },
              { label: 'Certificates', value: profile.certificates.length, icon: Award },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="bg-[#111111]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between"
              >
                <Icon size={18} className="text-white/40" />
                <div className="mt-4">
                  <div className="text-2xl sm:text-3xl font-mono font-bold text-white">{value}</div>
                  <div className="text-xs text-white/50 font-light mt-1 leading-snug">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Name Edit Modal */}
        {isEditingName && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[#111111] border border-white/20 rounded-2xl p-6 max-w-sm w-full space-y-4">
              <h3 className="font-heading text-lg font-medium text-white">Update Scholar Alias</h3>
              <form onSubmit={handleUpdateNameSubmit} className="space-y-4">
                <input
                  type="text"
                  value={editNameVal}
                  onChange={(e) => setEditNameVal(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-full px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-white/50 font-mono"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="px-4 py-2 rounded-full text-xs font-mono text-white/50 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-white text-black font-medium px-5 py-2 rounded-full text-xs hover:bg-white/85"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Certificates Section */}
        {profile.certificates.length > 0 && (
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="font-heading text-xl uppercase font-medium text-white flex items-center gap-2">
                <Award size={18} className="text-[#C6FF00]" />
                Earned Credentials ({profile.certificates.length})
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {profile.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-2xl border border-white/10 bg-[#111111]/90 p-6 flex flex-col justify-between hover:border-white/25 transition-all"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-white/40 uppercase">
                      CERT #{cert.id.slice(0, 8)}
                    </span>
                    <h3 className="font-heading text-base font-medium text-white leading-snug">
                      {cert.courseTitle}
                    </h3>
                    <p className="text-xs font-mono text-[#C6FF00]">{cert.gradeLabel}</p>
                  </div>

                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="mt-6 w-full py-2.5 rounded-full border border-white/20 text-xs font-medium text-white hover:bg-white/10 transition flex items-center justify-center gap-2"
                  >
                    <span>Inspect Certificate</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificate Modal */}
        {selectedCert && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative max-w-4xl w-full my-8">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white text-xs font-mono"
              >
                [ CLOSE ✕ ]
              </button>
              <Certificate certificate={selectedCert} />
            </div>
          </div>
        )}

        {/* Achievements Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
            <h2 className="font-heading text-xl uppercase font-medium text-white flex items-center gap-2">
              <Trophy size={18} className="text-[#C6FF00]" />
              Academic Accolades ({profile.achievements.length} / {achievements.length})
            </h2>

            <div className="flex gap-1.5 bg-white/5 border border-white/10 rounded-full p-1 text-xs font-mono">
              {(['all', 'unlocked', 'locked'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAchievementFilter(filter)}
                  className={`px-3 py-1 rounded-full uppercase transition ${
                    achievementFilter === filter
                      ? 'bg-white text-black font-medium'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredAchievements.map((ach) => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                unlocked={profile.achievements.includes(ach.id)}
              />
            ))}
          </div>
        </section>

        {/* Danger Zone */}
        <div className="border border-red-500/20 bg-red-500/5 rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider">
            <AlertTriangle size={15} />
            Danger Zone · Academic Expulsion
          </div>
          <p className="text-xs text-white/60 font-light leading-relaxed max-w-xl">
            Permanently clear all enrolled courses, exam history, credentials, and achievements stored on
            this browser. This action cannot be reversed.
          </p>

          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="py-2.5 px-6 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-mono transition"
            >
              Reset All Academic Records
            </button>
          ) : (
            <div className="space-y-3 pt-2">
              <p className="text-xs font-mono text-red-300">
                Type <strong className="text-white underline">DROPOUT</strong> below to confirm expulsion:
              </p>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="text"
                  value={resetInput}
                  onChange={(e) => setResetInput(e.target.value)}
                  placeholder="DROPOUT"
                  className="bg-black/50 border border-red-500/40 rounded-full px-4 py-2 text-xs text-white font-mono flex-1 outline-none focus:border-red-500"
                />
                <button
                  onClick={handleConfirmReset}
                  disabled={resetInput !== 'DROPOUT'}
                  className="bg-red-500 text-white font-mono text-xs px-5 py-2 rounded-full disabled:opacity-30 hover:bg-red-600 transition"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="text-xs text-white/50 hover:text-white font-mono px-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
