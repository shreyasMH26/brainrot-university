import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, Copy, Check, ArrowRight, BookOpen, Sparkles, Flame } from 'lucide-react';
import BackgroundVideo from '../components/BackgroundVideo';
import CourseCard from '../components/CourseCard';
import ProfessorCard from '../components/ProfessorCard';
import { courses } from '../data/courses';
import { professors } from '../data/professors';
import type { StudentProfile } from '../types';
import { useTypewriter } from '../hooks/useTypewriter';
import { Quote } from '@/components/ui/quote-demo';

interface HomeProps {
  profile: StudentProfile | null;
}

// ─── Section Reveal Wrapper ───────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Marquee with 2026 Memes ─────────────────────────────────────────────────
const messages = [
  'NO CAP: ALL COURSES ARE OPEN-ACCESS WITH ZERO APPLICATION REQUIRED',
  'CURRENT AURA: +50,000 JUST FOR READING THE SYLLABUS',
  'PROFESSOR BRAINCELL HIT THE SKIBIDI RIZZ QUANTUM BARRIER',
  'LATEST RESEARCH: MAIN CHARACTER SYNDROME CURES BOREDOM',
  'WARNING: RIZZ MECHANICS LAB REGISTERED SEVERE OHIO TAX DEBT',
  'WE ARE SO COOKED · CHAT IS THIS REAL? · ABSOLUTE CINEMA',
  'TOUCHING GRASS REMAINS STRONGLY DISCOURAGED BY DEAN',
  '100% UNBOTHERED · MOISTURIZED · IN OUR UNACCREDITED LANE',
];

const MarqueeSection: React.FC = () => {
  const text = messages.join('   ✳︎   ');

  return (
    <div className="bg-[#0b0b0b] border-y border-white/10 py-3.5 overflow-hidden select-none relative z-10">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(2)].map((_, i) => (
          <span key={i} className="text-white/80 font-mono text-xs tracking-widest uppercase px-8 shrink-0 flex items-center gap-3">
            <span>{text}</span>
            <span className="text-[#C6FF00]">✳︎</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Gen Z Meme Testimonials ──────────────────────────────────────────────────
const testimonials = [
  {
    quote: "Bro I went from 0 aura to certified Sigma Scholar in two modules. Chat, this website is absolute cinema.",
    name: "Kai Cenat's Long Lost Roommate",
    dept: "Dept. of Rizz Engineering",
  },
  {
    quote: "My parents asked what degree I was doing. I told them Quantum Overthinking 101. They asked if it's accredited. I hit them with 'it's giving unbothered'.",
    name: "Terminal Delulu Specialist",
    dept: "Dept. of Delusion Studies",
  },
  {
    quote: "Didn't touch grass for 3 consecutive semesters. Learned the lore behind every TikTok sound effect. 10/10 academic excellence.",
    name: "Subway Surfers Split-Screen Consumer",
    dept: "Dept. of Unproductive Sciences",
  },
  {
    quote: "Took the exam at 3 AM while watching family guy clips on bottom screen. Scored 96%. We are so back.",
    name: "Dopamine Receptor Burnout PhD",
    dept: "Dept. of Brainrot Technology",
  },
  {
    quote: "No registration, no emails, no cap, no tuition debt. Just pure uncut intellectual damage.",
    name: "Unspoken Rizz Pioneer",
    dept: "Class of Never",
  },
];

// ─── Hall of Fame Entries ─────────────────────────────────────────────────────
const hallEntries = [
  { rank: 1, name: 'Delulu Maximilian', score: 99420, achievement: 'Aura overflow: broke the integer ceiling' },
  { rank: 2, name: 'Duke of Ohio Tax', score: 88001, achievement: 'Passed 26 courses with Subway Surfers playing on 2nd monitor' },
  { rank: 3, name: 'Professor NPC The Third', score: 77777, achievement: 'Completed all courses simultaneously while sleeping' },
];

const informationalFeatures = [
  {
    icon: <BookOpen size={20} />,
    title: 'Open Syllabus Archive',
    desc: 'Browse complete curricula from Advanced Overthinking to Quantum Rizz. No paywalls, no login popups.',
  },
  {
    icon: <Sparkles size={20} />,
    title: 'Instant Question Hall',
    desc: 'Interactive examination questionnaires grounded in real internet subcultures. Test your cognitive resilience.',
  },
  {
    icon: <Flame size={20} />,
    title: 'Zero Paperwork',
    desc: 'No applications, no student loans, no admissions essays. Read, digest, and walk away with your aura intact.',
  },
];

const Home: React.FC<HomeProps> = ({ profile: _profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);

  // Typewriter effect
  const heroDescription =
    'Four years of questionable decisions. Unlimited academic damage. One degree your parents will never understand.';
  const { displayed: typewriterText, done: typewriterDone } = useTypewriter(
    heroDescription,
    38,
    600
  );

  // 400ms pill fade-in trigger independent of typewriter
  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dean@brainrot.university');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative text-white min-h-screen bg-[#090909]">
      {/* Background Interactive Video (Mouse Scrubbing) */}
      <BackgroundVideo />

      {/* ── 1. CINEMATIC HERO SECTION (100svh) ─────────────────────────── */}
      <section className="relative z-10 w-full min-h-[100svh] flex flex-col justify-between px-6 sm:px-12 pt-28 pb-8 pointer-events-none">
        {/* Top Eyebrow: Blurred intro label */}
        <div className="pointer-events-auto">
          <p
            className="text-xs sm:text-sm tracking-widest uppercase text-white/70 select-none backdrop-blur-[4px] inline-block font-mono"
            style={{ filter: 'blur(0.5px)' }}
          >
            Welcome to Brainrot University,
            <br />
            the internet&apos;s least serious institution.
          </p>
        </div>

        {/* Center / Bottom-aligned Hero Content */}
        <div className="max-w-4xl py-6 my-auto pointer-events-auto">
          {/* Main Cinematic Bold Headline */}
          <h1
            className="font-heading font-medium tracking-tighter text-white leading-[0.92] uppercase select-none"
            style={{ fontSize: 'clamp(3.2rem, 9.5vw, 7.8rem)' }}
          >
            YOUR AURA
            <br />
            IS IN DEBT.
          </h1>

          {/* Typewriter Subtitle */}
          <div className="mt-6 min-h-[3.5rem] sm:min-h-[2.8rem] max-w-xl">
            <p className="text-sm sm:text-base md:text-lg text-white/80 font-light leading-relaxed">
              {typewriterText}
              {!typewriterDone && (
                <span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse align-middle" />
              )}
            </p>
          </div>

          {/* Pill Action Buttons & Dean Email Pill */}
          <div
            className={`mt-8 flex flex-wrap items-center gap-3 transition-all duration-700 ${
              pillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              to="/courses"
              className="bg-white text-black font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-white/85 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
            >
              Explore courses
            </Link>
            <Link
              to="/examination-hall"
              className="bg-white text-black font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-white/85 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
            >
              Take an exam
            </Link>
            <Link
              to="/hall-of-fame"
              className="bg-white text-black font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-white/85 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
            >
              Check your aura
            </Link>
            <Link
              to="/portal"
              className="bg-white text-black font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full hover:bg-white/85 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
            >
              Enter the student portal
            </Link>

            {/* Outlined Pill with Copy Interaction */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="border border-white/20 bg-black/40 backdrop-blur-md text-white/90 text-xs px-4 py-2 rounded-full flex items-center gap-2 hover:border-white/50 hover:bg-black/60 transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/40"
              title="Copy Dean's Email"
            >
              {copiedEmail ? (
                <>
                  <Check size={13} className="text-[#C6FF00]" />
                  <span className="font-mono text-[#C6FF00]">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-white/60" />
                  <span className="font-mono">Reach the Dean: dean@brainrot.university</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Footer Row */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono tracking-widest text-white/40 uppercase gap-2 pt-6 border-t border-white/10 select-none">
          <span>EST. NEVER</span>
          <span className="hidden sm:inline">ACCREDITED BY NOBODY</span>
          <span>CURRENT STATUS: ABSOLUTELY COOKED</span>
        </div>
      </section>

      {/* ── 2. TICKER ────────────────────────────────────────────────────── */}
      <MarqueeSection />

      {/* ── 3. MEME PHILOSOPHY QUOTE ─────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-6 bg-[#090909]/95 backdrop-blur-md border-b border-white/5">
        <Quote />
      </section>

      {/* ── 4. HOW THIS KNOWLEDGE BASE WORKS ──────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[#C6FF00] text-xs font-mono tracking-[0.3em] uppercase mb-3">
                OPEN DIRECTORY
              </p>
              <h2 className="font-heading uppercase text-3xl sm:text-4xl md:text-5xl leading-tight text-white">
                HOW THIS REPOSITORY OPERATES
              </h2>
              <p className="text-white/60 text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed">
                No passwords to forget. No admission quotas. Just unfiltered academic comedy.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {informationalFeatures.map((feat, i) => (
              <Reveal key={feat.title} delay={i * 0.1}>
                <div className="bg-[#111111]/90 border border-white/10 p-8 rounded-2xl flex flex-col gap-4 hover:border-white/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-white/5 border border-white/15 text-white flex items-center justify-center rounded-xl">
                    {feat.icon}
                  </div>
                  <h3 className="font-heading text-lg font-medium text-white">{feat.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">{feat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FEATURED COURSES ──────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#090909]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <p className="text-[#C6FF00] text-xs font-mono tracking-[0.3em] uppercase mb-3">
                  CURRICULUM ARCHIVE
                </p>
                <h2 className="font-heading uppercase text-4xl sm:text-5xl md:text-6xl leading-none text-white">
                  COURSES OF<br />
                  <span className="text-white/40">QUESTIONABLE</span> VALUE
                </h2>
              </div>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-white font-medium text-xs tracking-widest uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-200 self-start"
              >
                VIEW FULL CATALOGUE <ChevronRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course, i) => (
              <Reveal key={course.id} delay={i * 0.06}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FACULTY ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-14">
              <p className="text-[#C6FF00] text-xs font-mono tracking-[0.3em] uppercase mb-3">
                STAFF DIRECTORY
              </p>
              <h2 className="font-heading uppercase text-4xl sm:text-5xl md:text-6xl leading-none text-white">
                MEET THE FACULTY<br />
                <span className="text-white/40 text-3xl sm:text-4xl">(ALL FICTIONAL)</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {professors.slice(0, 3).map((prof, i) => (
              <Reveal key={prof.id} delay={i * 0.1}>
                <ProfessorCard professor={prof} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. MEME TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#090909]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-14">
              <p className="text-[#C6FF00] text-xs font-mono tracking-[0.3em] uppercase mb-3">
                FEEDBACK & LORE
              </p>
              <h2 className="font-heading uppercase text-4xl sm:text-5xl md:text-6xl leading-none text-white">
                WHAT CHRONICALLY ONLINE<br />
                <span className="text-white/40">STUDENTS</span> SAY
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="border border-white/10 bg-[#111111]/90 p-8 hover:border-white/30 transition-all duration-300 flex flex-col gap-6 rounded-2xl">
                  <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase">
                    [FICTIONAL ARCHIVAL QUOTE]
                  </p>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light italic flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-heading text-sm uppercase text-white font-medium">{t.name}</p>
                    <p className="text-white/50 text-xs font-mono tracking-wide mt-1">{t.dept}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. HALL OF FAME PREVIEW ──────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-6 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <p className="text-[#C6FF00] text-xs font-mono tracking-[0.3em] uppercase mb-3">
                  AURA LEADERS
                </p>
                <h2 className="font-heading uppercase text-4xl sm:text-5xl md:text-6xl leading-none text-white">
                  HALL OF SHAME<br />
                  <span className="text-white/40 text-3xl sm:text-4xl">(OF FAME)</span>
                </h2>
              </div>
              <Link
                to="/hall-of-fame"
                className="inline-flex items-center gap-2 text-white font-medium text-xs tracking-widest uppercase border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-200 self-start"
              >
                VIEW ARCHIVE <ChevronRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            {hallEntries.map((entry) => (
              <Reveal key={entry.rank} delay={entry.rank * 0.08}>
                <div className="border border-white/10 bg-[#111111]/90 p-6 flex items-center gap-6 hover:border-white/30 transition-all duration-300 rounded-2xl">
                  <span className="text-white font-bold text-2xl sm:text-3xl font-mono w-12 shrink-0">
                    #{entry.rank}
                  </span>
                  <div className="flex-1">
                    <p className="font-heading uppercase text-base sm:text-lg font-medium text-white">{entry.name}</p>
                    <p className="text-white/60 text-xs sm:text-sm mt-0.5 font-light">{entry.achievement}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[#C6FF00] font-bold text-lg sm:text-xl font-mono">
                      {entry.score.toLocaleString()}
                    </p>
                    <p className="text-white/40 text-[10px] uppercase font-mono tracking-widest mt-0.5">AURA SCORE</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. BOTTOM EXPLORATION BANNER (MATCHES DARK MINIMALIST AESTHETIC) ──── */}
      <section className="relative z-10 py-28 px-6 bg-[#0c0c0c] border-t border-white/10 text-white select-none">
        <Reveal className="max-w-4xl mx-auto text-center">
          <p className="text-[#C6FF00] text-xs font-mono tracking-[0.3em] uppercase mb-4">
            OPEN ARCHIVE · ZERO TUITION DEBT
          </p>
          <h2
            className="font-heading font-medium uppercase text-white leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 6.5vw, 4.8rem)' }}
          >
            READY TO DAMAGE YOUR
            <br />
            ACADEMIC RECORD?
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
            No signup. No tuition. No applications. Just the most thoroughly unserious syllabus on the internet.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 bg-white text-black font-medium text-xs sm:text-sm tracking-wider uppercase px-8 py-3.5 rounded-full hover:bg-white/85 transition-all duration-200 shadow-lg"
          >
            EXPLORE ALL 26 COURSES <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
