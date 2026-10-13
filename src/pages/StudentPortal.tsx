import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  GraduationCap,
  Trophy,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
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
      <div className="min-h-screen bg-[#090909] text-[#F0EBDD] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[#0f0f0f] border border-[#F0EBDD]/10 rounded-2xl p-8 text-center space-y-6 shadow-2xl"
        >
          <div className="space-y-2">
            <span className="text-5xl">☠️</span>
            <h1 className="text-2xl font-black text-[#F0EBDD] uppercase tracking-wide">
              STUDENT ENROLLMENT PORTAL
            </h1>
            <p className="text-xs text-[#888888]">
              Begin your path to comprehensive academic downfall.
            </p>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#888888] mb-1">
                Student Name / Alias
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Delulu Dave or Queen of Procrastination"
                className="w-full bg-[#090909] border border-[#F0EBDD]/20 rounded-lg px-4 py-3 text-sm text-[#F0EBDD] placeholder-[#888888]/60 focus:outline-none focus:border-[#C6FF00]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#C6FF00] text-[#090909] font-black py-3 rounded-lg text-sm tracking-wide uppercase hover:bg-[#d4ff33] active:scale-95 transition"
            >
              GENERATE STUDENT ID & ENROLL
            </button>
          </form>

          <p className="text-[10px] text-[#888888]/80 leading-relaxed border-t border-[#F0EBDD]/5 pt-4">
            Notice: All records, titles, and IDs are purely fictional and saved locally in your browser. No personal data leaves this device.
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
    <div className="min-h-screen bg-[#090909] text-[#F0EBDD] px-4 py-12 md:py-20">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header / ID Card Section */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Virtual Student ID Card */}
          <div className="md:col-span-1 bg-[#F0EBDD] text-[#090909] rounded-2xl p-6 border-4 border-[#641C2B] shadow-2xl relative overflow-hidden flex flex-col justify-between aspect-[1.58/1]">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-black tracking-widest text-[#641C2B] uppercase block">
                  BRAINROT UNIVERSITY
                </span>
                <span className="text-[8px] text-[#090909]/60 font-mono">STUDENT IDENTITY CARD</span>
              </div>
              <div className="text-2xl">☠️</div>
            </div>

            <div className="my-3 space-y-0.5">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black uppercase tracking-wide truncate">{profile.name}</h2>
                <button
                  onClick={() => {
                    setEditNameVal(profile.name);
                    setIsEditingName(true);
                  }}
                  className="text-[10px] text-[#641C2B] underline font-bold"
                >
                  edit
                </button>
              </div>
              <p className="text-[10px] font-bold text-[#641C2B] bg-[#641C2B]/10 px-2 py-0.5 rounded inline-block">
                {profile.currentTitle}
              </p>
            </div>

            <div className="flex justify-between items-end border-t border-[#641C2B]/20 pt-2 text-[9px] font-mono">
              <div>
                <span className="text-[#090909]/50 block">ID NUMBER</span>
                <span className="font-bold">{profile.studentId}</span>
              </div>
              <div className="text-right">
                <span className="text-[#090909]/50 block">ENROLLED</span>
                <span className="font-bold">
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
              { label: 'Enrolled Courses', value: profile.enrolledCourses.length, icon: BookOpen, color: '#C6FF00' },
              { label: 'Passed Courses', value: profile.completedCourses.length, icon: GraduationCap, color: '#88FF88' },
              { label: 'Avg Exam Score', value: `${avgScore}%`, icon: Trophy, color: '#ff8c42' },
              { label: 'Certificates', value: profile.certificates.length, icon: Award, color: '#F0EBDD' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="bg-[#0f0f0f] border border-[#F0EBDD]/10 rounded-xl p-5 flex flex-col justify-between"
              >
                <Icon size={20} style={{ color }} />
                <div className="mt-4">
                  <div className="text-3xl font-black font-mono text-[#F0EBDD]">{value}</div>
                  <div className="text-xs text-[#888888] font-medium mt-1 leading-snug">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Name Edit Modal */}
        {isEditingName && (
          <div className="fixed inset-0 bg-[#090909]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0f0f0f] border border-[#F0EBDD]/20 rounded-xl p-6 max-w-sm w-full space-y-4">
              <h3 className="text-lg font-bold text-[#F0EBDD]">Update Student Name</h3>
              <form onSubmit={handleUpdateNameSubmit} className="space-y-4">
                <input
                  type="text"
                  value={editNameVal}
                  onChange={(e) => setEditNameVal(e.target.value)}
                  className="w-full bg-[#090909] border border-[#F0EBDD]/20 rounded-lg px-4 py-2 text-sm text-[#F0EBDD]"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="px-4 py-2 rounded text-xs text-[#888888] hover:text-[#F0EBDD]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#C6FF00] text-[#090909] font-bold px-4 py-2 rounded text-xs"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Enrolled Courses Progress */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold uppercase tracking-wider text-[#F0EBDD] flex items-center gap-2">
              <BookOpen size={18} className="text-[#C6FF00]" />
              Course Enrollments
            </h2>
            <Link to="/courses" className="text-xs font-bold text-[#C6FF00] hover:underline flex items-center gap-1">
              Browse More <ArrowRight size={12} />
            </Link>
          </div>

          {profile.enrolledCourses.length === 0 ? (
            <div className="bg-[#0f0f0f] border border-[#F0EBDD]/10 rounded-xl p-8 text-center space-y-3">
              <p className="text-sm text-[#888888]">You have not enrolled in any courses yet.</p>
              <Link
                to="/courses"
                className="inline-block bg-[#C6FF00] text-[#090909] font-bold px-5 py-2 rounded-lg text-xs"
              >
                Explore Catalogue
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {profile.enrolledCourses.map((cId) => {
                const isPassed = profile.completedCourses.includes(cId);
                return (
                  <div
                    key={cId}
                    className="bg-[#0f0f0f] border border-[#F0EBDD]/10 rounded-xl p-5 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold bg-[#641C2B] text-[#F0EBDD] px-2 py-0.5 rounded">
                          {cId}
                        </span>
                        {isPassed && (
                          <span className="text-[10px] font-bold text-[#C6FF00] bg-[#C6FF00]/10 px-2 py-0.5 rounded">
                            PASSED
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-base mt-2">{cId}</h3>
                    </div>

                    <Link
                      to={`/exam/${cId}`}
                      className={`w-full text-center py-2 rounded text-xs font-bold transition ${
                        isPassed
                          ? 'border border-[#F0EBDD]/20 text-[#F0EBDD] hover:bg-[#F0EBDD]/5'
                          : 'bg-[#C6FF00] text-[#090909] hover:bg-[#d4ff33]'
                      }`}
                    >
                      {isPassed ? 'Retake Exam' : 'Take Exam →'}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Certificates Earned */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase tracking-wider text-[#F0EBDD] flex items-center gap-2">
            <Award size={18} className="text-[#C6FF00]" />
            Cursed Credentials ({profile.certificates.length})
          </h2>

          {profile.certificates.length === 0 ? (
            <div className="bg-[#0f0f0f] border border-[#F0EBDD]/10 rounded-xl p-8 text-center">
              <p className="text-sm text-[#888888]">
                Pass an examination with at least 50% to generate your first official cursed diploma.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {profile.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-[#0f0f0f] border border-[#641C2B]/40 rounded-xl p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#888888]">{cert.certificateCode}</span>
                    <h3 className="font-bold text-base text-[#F0EBDD]">{cert.courseTitle}</h3>
                    <p className="text-xs font-semibold text-[#C6FF00]">{cert.gradeLabel}</p>
                  </div>

                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#F0EBDD] text-[#090909] font-bold py-2 rounded text-xs hover:bg-white transition"
                  >
                    <ExternalLink size={14} /> View Certificate
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Certificate Modal */}
        {selectedCert && (
          <div className="fixed inset-0 bg-[#090909]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative w-full max-w-4xl py-8">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-2 right-2 text-[#888888] hover:text-[#F0EBDD] text-sm font-bold bg-[#0f0f0f] px-3 py-1.5 rounded-lg border border-[#F0EBDD]/20 z-10"
              >
                ✕ Close
              </button>
              <Certificate certificate={selectedCert} />
            </div>
          </div>
        )}

        {/* Achievements Section */}
        <section className="space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-[#F0EBDD] flex items-center gap-2">
              <Trophy size={18} className="text-[#C6FF00]" />
              Academic Accolades ({profile.achievements.length}/{achievements.length})
            </h2>

            {/* Filter buttons */}
            <div className="flex gap-2">
              {(['all', 'unlocked', 'locked'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setAchievementFilter(filter)}
                  className={`text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition ${
                    achievementFilter === filter
                      ? 'bg-[#C6FF00] text-[#090909]'
                      : 'bg-[#0f0f0f] border border-[#F0EBDD]/10 text-[#888888] hover:text-[#F0EBDD]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredAchievements.map((ach) => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                unlocked={profile.achievements.includes(ach.id)}
              />
            ))}
          </div>
        </section>

        {/* Danger Zone: Reset Progress */}
        <section className="border border-[#641C2B]/40 bg-[#641C2B]/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-[#ff6b6b]">
            <AlertTriangle size={20} />
            <h3 className="font-bold text-base uppercase">Danger Zone: Academic Expulsion</h3>
          </div>
          <p className="text-xs text-[#888888]">
            Resetting your student profile permanently clears your enrolled courses, exam history, unlocked achievements, and earned certificates from this browser.
          </p>

          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="bg-[#641C2B] text-[#F0EBDD] text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#7e2336] transition flex items-center gap-2"
            >
              <RotateCcw size={14} /> Reset All Progress
            </button>
          ) : (
            <div className="space-y-3 bg-[#090909] p-4 rounded-xl border border-[#641C2B]">
              <p className="text-xs text-[#F0EBDD]">
                To confirm, type <span className="font-mono text-[#C6FF00] font-bold">DROPOUT</span> below:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={resetInput}
                  onChange={(e) => setResetInput(e.target.value)}
                  placeholder="DROPOUT"
                  className="bg-[#0f0f0f] border border-[#F0EBDD]/20 rounded-lg px-3 py-1.5 text-xs text-[#F0EBDD] font-mono focus:outline-none focus:border-[#ff6b6b]"
                />
                <button
                  onClick={handleConfirmReset}
                  disabled={resetInput !== 'DROPOUT'}
                  className="bg-[#ff6b6b] disabled:opacity-40 text-[#090909] text-xs font-black px-4 py-1.5 rounded-lg"
                >
                  Confirm Expulsion
                </button>
                <button
                  onClick={() => {
                    setShowResetConfirm(false);
                    setResetInput('');
                  }}
                  className="text-xs text-[#888888] px-3 py-1.5 hover:text-[#F0EBDD]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
