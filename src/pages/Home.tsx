import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronRight, BookOpen, Sparkles, Flame, Eye } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import ProfessorCard from '../components/ProfessorCard';
import { courses } from '../data/courses';
import { professors } from '../data/professors';
import type { StudentProfile } from '../types';
import DotPattern from '@/components/ui/dot-pattern-1';
import { Quote } from '@/components/ui/quote-demo';

interface HomeProps {
  profile: StudentProfile | null;
}

// ─── Animated Counter ────────────────────────────────────────────────────────
interface CounterProps {
  target: string | number;
  label: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ target, label, duration = 2 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState<string>('0');

  useEffect(() => {
    if (!inView) return;
    if (typeof target === 'string' && isNaN(Number(target.replace(/,/g, '')))) {
      setDisplay(target);
      return;
    }
    const numeric = typeof target === 'number' ? target : Number(target.replace(/,/g, ''));
    let start = 0;
    const step = numeric / (duration * 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= numeric) {
        setDisplay(typeof target === 'string' ? target : numeric.toLocaleString());
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(start).toLocaleString());
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [inView, target, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-black text-[#C6FF00] font-mono mb-2">
        {display}
      </div>
      <div className="text-[#888888] text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
};

// ─── Section Reveal Wrapper ───────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Skull SVG ────────────────────────────────────────────────────────────────
const GraduationSkull: React.FC = () => (
  <motion.svg
    viewBox="0 0 200 230"
    width="280"
    height="320"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
    className="mx-auto drop-shadow-[0_0_40px_rgba(198,255,0,0.25)]"
  >
    {/* Graduation cap board */}
    <motion.rect
      x="30" y="32" width="140" height="12" rx="2"
      fill="#C6FF00"
      animate={{ y: [32, 27, 32] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Cap tassel string */}
    <motion.line
      x1="165" y1="44" x2="165" y2="68"
      stroke="#C6FF00" strokeWidth="2.5"
      animate={{ x1: [165, 168, 165], x2: [165, 170, 165] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Cap tassel ball */}
    <motion.circle
      cx="165" cy="71" r="5"
      fill="#C6FF00"
      animate={{ cx: [165, 168, 165], cy: [71, 74, 71] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Cap top cylinder */}
    <ellipse cx="100" cy="44" rx="52" ry="10" fill="#1a1a1a" stroke="#C6FF00" strokeWidth="1.5" />
    <rect x="48" y="34" width="104" height="12" rx="0" fill="#1a1a1a" />

    {/* Skull dome */}
    <ellipse cx="100" cy="108" rx="72" ry="68" fill="#F0EBDD" />

    {/* Eye sockets */}
    <ellipse cx="72" cy="110" rx="20" ry="22" fill="#090909" />
    <ellipse cx="128" cy="110" rx="20" ry="22" fill="#090909" />

    {/* Glowing pupils */}
    <motion.ellipse
      cx="72" cy="112" rx="9" ry="10"
      fill="#C6FF00"
      animate={{ opacity: [0.9, 0.3, 0.9] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    />
    <motion.ellipse
      cx="128" cy="112" rx="9" ry="10"
      fill="#C6FF00"
      animate={{ opacity: [0.3, 0.9, 0.3] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    />

    {/* Nose */}
    <path d="M95 138 L100 128 L105 138 Z" fill="#090909" opacity="0.5" />

    {/* Cheekbones */}
    <line x1="36" y1="126" x2="56" y2="120" stroke="#090909" strokeWidth="2" opacity="0.3" />
    <line x1="164" y1="126" x2="144" y2="120" stroke="#090909" strokeWidth="2" opacity="0.3" />

    {/* Jaw */}
    <rect x="62" y="152" width="76" height="36" rx="8" fill="#F0EBDD" />

    {/* Teeth */}
    {[68, 82, 96, 110, 124].map((x, i) => (
      <rect key={i} x={x} y="154" width="10" height="18" rx="2" fill="#090909" opacity="0.15" />
    ))}
    {[68, 82, 96, 110, 124].map((x, i) => (
      <rect key={`t${i}`} x={x + 1} y="154" width="8" height="16" rx="2" fill="white" />
    ))}

    {/* Cracks */}
    <path d="M100 56 L94 80 L102 100" stroke="#C6FF00" strokeWidth="1.5" fill="none" opacity="0.4" />
    <path d="M130 90 L120 100 L125 118" stroke="#C6FF00" strokeWidth="1" fill="none" opacity="0.3" />
  </motion.svg>
);

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
  const text = messages.join('  ·  ');

  return (
    <div className="bg-[#C6FF00] py-3 overflow-hidden select-none">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(2)].map((_, i) => (
          <span key={i} className="text-[#090909] font-black text-sm tracking-widest uppercase px-8 shrink-0">
            {text} &nbsp;&nbsp;&nbsp; · &nbsp;&nbsp;&nbsp;
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

// ─── Educational Manifesto ────────────────────────────────────────────────────
const informationalFeatures = [
  {
    icon: <BookOpen size={24} />,
    title: 'Open Syllabus Archive',
    desc: 'Browse complete curricula from Advanced Overthinking to Quantum Rizz. No paywalls, no login popups.',
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Instant Question Hall',
    desc: 'Interactive examination questionnaires grounded in real internet subcultures. Test your cognitive resilience.',
  },
  {
    icon: <Flame size={24} />,
    title: 'Zero Paperwork',
    desc: 'No applications, no student loans, no admissions essays. Read, digest, and walk away with your aura intact.',
  },
];

// ─── Home Page ────────────────────────────────────────────────────────────────
const Home: React.FC<HomeProps> = ({ profile: _profile }) => {
  return (
    <main className="bg-[#090909] text-[#F0EBDD] overflow-x-hidden">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Dot Pattern Background from Shadcn UI component */}
        <DotPattern
          width={28}
          height={28}
          cr={1}
          className="fill-[#C6FF00]/10 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]"
        />

        {/* Glow blob */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#C6FF00] opacity-[0.05] blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#C6FF00] text-xs font-black tracking-[0.35em] uppercase mb-6 flex items-center gap-2"
            >
              <Eye size={14} /> PUBLIC CURRICULUM ARCHIVE · NO LOGIN REQUIRED
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase leading-[0.9] mb-8"
              style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)' }}
            >
              WELCOME TO
              <br />
              <span className="text-[#C6FF00]">BRAINROT</span>
              <br />
              UNIVERSITY.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[#888888] text-lg leading-relaxed mb-10 max-w-lg"
            >
              The world's most unserious open-access compendium. 26 satirical courses, comprehensive syllabi, and interactive evaluations. No accounts, no fees, maximum aura.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-[#C6FF00] text-[#090909] font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors duration-200 rounded-sm shadow-[0_0_30px_rgba(198,255,0,0.25)]"
              >
                BROWSE COURSES <ArrowRight size={16} />
              </Link>
              <Link
                to="/departments"
                className="inline-flex items-center gap-2 border border-[#F0EBDD]/30 text-[#F0EBDD] font-black text-sm tracking-widest uppercase px-8 py-4 hover:border-[#C6FF00] hover:text-[#C6FF00] transition-colors duration-200 rounded-sm"
              >
                EXPLORE DEPARTMENTS
              </Link>
            </motion.div>
          </div>

          {/* Right column – Skull */}
          <div className="flex justify-center">
            <GraduationSkull />
          </div>
        </div>

        {/* Stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative z-10 w-full max-w-4xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 border-t border-[#F0EBDD]/10 pt-12"
        >
          <AnimatedCounter target="69,420" label="Questionable Decisions Made" />
          <AnimatedCounter target={0} label="Successful Grass-Touching Attempts" />
          <AnimatedCounter target="100%" label="Unnecessary Confidence" />
        </motion.div>
      </section>

      {/* ── 2. TICKER ────────────────────────────────────────────────────── */}
      <MarqueeSection />

      {/* ── 3. SHADCN UI INTEGRATED QUOTE COMPONENT ──────────────────────── */}
      <section className="py-20 px-6">
        <Quote />
      </section>

      {/* ── 4. HOW THIS KNOWLEDGE BASE WORKS ──────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0c0c0c] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[#C6FF00] text-xs font-black tracking-[0.3em] uppercase mb-3">
                OPEN DIRECTORY
              </p>
              <h2 className="font-black uppercase text-4xl md:text-5xl leading-none">
                HOW THIS REPOSITORY OPERATES
              </h2>
              <p className="text-[#888888] text-sm mt-3 max-w-lg mx-auto">
                No passwords to forget. No admission quotas. Just unfiltered academic comedy.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {informationalFeatures.map((feat, i) => (
              <Reveal key={feat.title} delay={i * 0.1}>
                <div className="bg-[#090909] border border-white/10 p-8 rounded-xl flex flex-col gap-4 hover:border-[#C6FF00]/40 transition-colors">
                  <div className="w-12 h-12 bg-[#C6FF00]/10 border border-[#C6FF00]/30 text-[#C6FF00] flex items-center justify-center rounded-lg">
                    {feat.icon}
                  </div>
                  <h3 className="font-black uppercase text-xl text-[#F0EBDD]">{feat.title}</h3>
                  <p className="text-sm text-[#888888] leading-relaxed">{feat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FEATURED COURSES ──────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <p className="text-[#C6FF00] text-xs font-black tracking-[0.3em] uppercase mb-3">
                  CURRICULUM ARCHIVE
                </p>
                <h2 className="font-black uppercase text-5xl md:text-6xl leading-none">
                  COURSES OF<br />
                  <span className="text-[#C6FF00]">QUESTIONABLE</span> VALUE
                </h2>
              </div>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-[#C6FF00] font-black text-sm tracking-widest uppercase border border-[#C6FF00]/30 px-6 py-3 hover:bg-[#C6FF00] hover:text-[#090909] transition-colors duration-200 self-start"
              >
                VIEW FULL CATALOGUE <ChevronRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course, i) => (
              <Reveal key={course.id} delay={i * 0.07}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FACULTY ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-14">
              <p className="text-[#C6FF00] text-xs font-black tracking-[0.3em] uppercase mb-3">
                STAFF DIRECTORY
              </p>
              <h2 className="font-black uppercase text-5xl md:text-6xl leading-none">
                MEET THE FACULTY<br />
                <span className="text-[#888888]">(ALL FICTIONAL)</span>
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
      <section className="py-24 px-6 bg-[#090909] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-14">
              <p className="text-[#C6FF00] text-xs font-black tracking-[0.3em] uppercase mb-3">
                FEEDBACK & LORE
              </p>
              <h2 className="font-black uppercase text-5xl md:text-6xl leading-none">
                WHAT CHRONICALLY ONLINE<br />
                <span className="text-[#C6FF00]">STUDENTS</span> SAY
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="border border-[#F0EBDD]/10 bg-[#0c0c0c] p-8 hover:border-[#C6FF00]/30 transition-colors duration-300 flex flex-col gap-6 rounded-xl">
                  <p className="text-[#C6FF00] text-[10px] font-black tracking-widest uppercase opacity-60">
                    [FICTIONAL ARCHIVAL QUOTE]
                  </p>
                  <p className="text-[#F0EBDD] text-lg leading-relaxed font-medium italic flex-1">
                    "{t.quote}"
                  </p>
                  <div>
                    <p className="font-black text-sm uppercase text-[#F0EBDD]">{t.name}</p>
                    <p className="text-[#888888] text-xs tracking-wide mt-1">{t.dept}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. HALL OF FAME PREVIEW ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0c0c0c]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <p className="text-[#C6FF00] text-xs font-black tracking-[0.3em] uppercase mb-3">
                  AURA LEADERS
                </p>
                <h2 className="font-black uppercase text-5xl md:text-6xl leading-none">
                  HALL OF SHAME<br />
                  <span className="text-[#888888]">(OF FAME)</span>
                </h2>
              </div>
              <Link
                to="/hall-of-fame"
                className="inline-flex items-center gap-2 text-[#C6FF00] font-black text-sm tracking-widest uppercase border border-[#C6FF00]/30 px-6 py-3 hover:bg-[#C6FF00] hover:text-[#090909] transition-colors duration-200 self-start"
              >
                VIEW ARCHIVE <ChevronRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            {hallEntries.map((entry) => (
              <Reveal key={entry.rank} delay={entry.rank * 0.08}>
                <div className="border border-[#F0EBDD]/10 bg-[#090909] p-6 flex items-center gap-6 hover:border-[#C6FF00]/30 transition-colors duration-300 rounded-xl">
                  <span className="text-[#C6FF00] font-black text-3xl font-mono w-12 shrink-0">
                    #{entry.rank}
                  </span>
                  <div className="flex-1">
                    <p className="font-black uppercase text-lg">{entry.name}</p>
                    <p className="text-[#888888] text-sm mt-1">{entry.achievement}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[#C6FF00] font-black text-xl font-mono">
                      {entry.score.toLocaleString()}
                    </p>
                    <p className="text-[#888888] text-xs uppercase tracking-widest mt-1">AURA SCORE</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. BOTTOM EXPLORATION BANNER ─────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#C6FF00] relative overflow-hidden">
        <DotPattern
          width={16}
          height={16}
          cr={1}
          className="fill-[#090909]/20"
        />
        <Reveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2
            className="font-black uppercase text-[#090909] leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.8rem)' }}
          >
            READY TO EXPLORE THE CURRICULUM?
          </h2>
          <p className="text-[#090909]/80 text-base max-w-xl mx-auto mb-8 font-medium">
            No signup. No tuition. No applications. Just the most thoroughly unserious syllabus on the internet.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 bg-[#090909] text-[#C6FF00] font-black text-sm tracking-widest uppercase px-10 py-4 hover:bg-[#641C2B] hover:text-[#F0EBDD] transition-colors duration-200 rounded-sm"
          >
            EXPLORE ALL 26 COURSES <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </main>
  );
};

export default Home;
