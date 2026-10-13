import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronRight, GraduationCap, BookOpen, Award } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import ProfessorCard from '../components/ProfessorCard';
import { courses } from '../data/courses';
import { professors } from '../data/professors';
import type { StudentProfile } from '../types';

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
        {display}{typeof target === 'string' && target.includes('%') ? '' : ''}
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

// ─── Marquee ─────────────────────────────────────────────────────────────────
const messages = [
  'APPLICATIONS NOW OPEN FOR ADVANCED OVERTHINKING',
  'PROFESSOR BRAINCELL HAS ENTERED THE BUILDING',
  'DEADLINE EXTENSION DENIED (AGAIN)',
  'ZERO GRASS HAS BEEN TOUCHED THIS SEMESTER',
  'NEW COURSE: SKIBIDI LINGUISTICS NOW AVAILABLE',
  'LIBRARY NOW STOCKS EMOTIONAL SUPPORT MEMES',
  'FINALS WEEK SURVIVAL KITS: OUT OF STOCK',
];

const MarqueeSection: React.FC = () => {
  const text = messages.join('  ·  ');

  return (
    <div className="bg-[#C6FF00] py-3 overflow-hidden">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
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

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: 'BU changed my life. I now overthink with academic rigour.',
    name: 'Definitely Real Student',
    dept: 'Class of Never',
  },
  {
    quote: 'The procrastination course was so good I finished it a semester late.',
    name: 'Person Who Exists',
    dept: 'Dept. of Unproductive Sciences',
  },
  {
    quote: 'My rizz coefficient increased by 3 sigmas. I have the certificate.',
    name: 'Anonymous',
    dept: 'Class of This Semester',
  },
  {
    quote: 'I touched grass once during the Grass Studies field trip. My character arc is complete.',
    name: 'Student Number',
    dept: 'Graduating Never',
  },
  {
    quote: 'I enrolled ironically. I graduated sincerely. The brainrot runs deep.',
    name: 'NPC #4291',
    dept: 'Dept. of Questionable Life Choices',
  },
];

// ─── Hall of Fame Entries ─────────────────────────────────────────────────────
const hallEntries = [
  { rank: 1, name: 'Delulu Maximilian', score: 99420, achievement: 'First to achieve terminal brainrot' },
  { rank: 2, name: 'Sigma Grindset McMahon', score: 88001, achievement: 'Perfect score in Skibidi Linguistics' },
  { rank: 3, name: 'Professor NPC', score: 77777, achievement: 'Completed all courses simultaneously while sleeping' },
];

// ─── Steps ────────────────────────────────────────────────────────────────────
const steps = [
  {
    number: '01',
    title: 'Browse Courses',
    desc: 'Pick something that sounds fun and vaguely destructive.',
    icon: <BookOpen size={24} />,
  },
  {
    number: '02',
    title: 'Take the Exam',
    desc: 'Multiple choice questions designed to make you question everything.',
    icon: <GraduationCap size={24} />,
  },
  {
    number: '03',
    title: 'Collect Your Certificate',
    desc: 'Download, print, confuse your family.',
    icon: <Award size={24} />,
  },
];

// ─── Home Page ────────────────────────────────────────────────────────────────
const Home: React.FC<HomeProps> = ({ profile: _profile }) => {
  return (
    <main className="bg-[#090909] text-[#F0EBDD] overflow-x-hidden">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#C6FF00 1px, transparent 1px), linear-gradient(90deg, #C6FF00 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow blob */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#C6FF00] opacity-[0.04] blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#C6FF00] text-xs font-black tracking-[0.35em] uppercase mb-6"
            >
              EST. NEVER · ACCREDITED BY NOBODY
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase leading-[0.9] mb-8"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
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
              Four years of questionable decisions. Unlimited academic damage. One degree your parents will never understand.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-[#C6FF00] text-[#090909] font-black text-sm tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors duration-200"
              >
                ENROLL NOW <ArrowRight size={16} />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 border border-[#F0EBDD]/30 text-[#F0EBDD] font-black text-sm tracking-widest uppercase px-8 py-4 hover:border-[#C6FF00] hover:text-[#C6FF00] transition-colors duration-200"
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="relative z-10 text-[#888888] text-xs mt-6 text-center"
        >
          * These statistics are entirely fictional and for entertainment purposes only
        </motion.p>
      </section>

      {/* ── 2. MARQUEE ───────────────────────────────────────────────────── */}
      <MarqueeSection />

      {/* ── 3. FEATURED COURSES ──────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <p className="text-[#C6FF00] text-xs font-black tracking-[0.3em] uppercase mb-3">
                  CURRICULUM
                </p>
                <h2 className="font-black uppercase text-5xl md:text-6xl leading-none">
                  COURSES OF<br />
                  <span className="text-[#C6FF00]">DUBIOUS</span> QUALITY
                </h2>
              </div>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-[#C6FF00] font-black text-sm tracking-widest uppercase border border-[#C6FF00]/30 px-6 py-3 hover:bg-[#C6FF00] hover:text-[#090909] transition-colors duration-200 self-start"
              >
                VIEW ALL COURSES <ChevronRight size={16} />
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

      {/* ── 4. FACULTY ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-14">
              <p className="text-[#C6FF00] text-xs font-black tracking-[0.3em] uppercase mb-3">
                STAFF
              </p>
              <h2 className="font-black uppercase text-5xl md:text-6xl leading-none">
                MEET THE FACULTY<br />
                <span className="text-[#888888]">(FICTIONAL)</span>
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

      {/* ── 5. HOW ENROLLMENT WORKS ──────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="mb-16 text-center">
              <p className="text-[#C6FF00] text-xs font-black tracking-[0.3em] uppercase mb-3">
                PROCESS
              </p>
              <h2 className="font-black uppercase text-5xl md:text-6xl leading-none">
                HOW ENROLLMENT<br />WORKS
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.12}>
                <div className="relative">
                  <div className="text-[#C6FF00]/10 font-black text-[8rem] leading-none absolute -top-4 -left-2 select-none pointer-events-none">
                    {step.number}
                  </div>
                  <div className="relative z-10 pt-10">
                    <div className="w-12 h-12 border border-[#C6FF00]/40 flex items-center justify-center text-[#C6FF00] mb-5">
                      {step.icon}
                    </div>
                    <h3 className="font-black uppercase text-xl mb-3">{step.title}</h3>
                    <p className="text-[#888888] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-14">
              <p className="text-[#C6FF00] text-xs font-black tracking-[0.3em] uppercase mb-3">
                SOCIAL PROOF
              </p>
              <h2 className="font-black uppercase text-5xl md:text-6xl leading-none">
                WHAT OUR<br />
                <span className="text-[#C6FF00]">STUDENTS</span> SAY
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="border border-[#F0EBDD]/10 p-8 hover:border-[#C6FF00]/30 transition-colors duration-300 flex flex-col gap-6">
                  <p className="text-[#C6FF00] text-[10px] font-black tracking-widest uppercase opacity-60">
                    [FICTIONAL STUDENT TESTIMONIAL]
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

      {/* ── 7. HALL OF FAME PREVIEW ──────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-4">
              <div>
                <p className="text-[#C6FF00] text-xs font-black tracking-[0.3em] uppercase mb-3">
                  RANKINGS
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
                FULL LEADERBOARD <ChevronRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            {hallEntries.map((entry, i) => (
              <Reveal key={entry.rank} delay={i * 0.08}>
                <div className="border border-[#F0EBDD]/10 p-6 flex items-center gap-6 hover:border-[#C6FF00]/30 transition-colors duration-300">
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
                    <p className="text-[#888888] text-xs uppercase tracking-widest mt-1">BRAINROT SCORE</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6 bg-[#C6FF00] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(#090909 1px, transparent 1px), linear-gradient(90deg, #090909 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <Reveal className="relative z-10 max-w-4xl mx-auto text-center">
          <h2
            className="font-black uppercase text-[#090909] leading-[0.9] mb-10"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            READY TO DAMAGE YOUR<br />ACADEMIC RECORD?
          </h2>
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 bg-[#090909] text-[#C6FF00] font-black text-sm tracking-widest uppercase px-12 py-5 hover:bg-[#641C2B] transition-colors duration-200"
          >
            APPLY NOW <ArrowRight size={18} />
          </Link>
          <p className="text-[#090909]/50 text-xs mt-8 max-w-md mx-auto leading-relaxed">
            * Brainrot University is a fictional, satirical platform for entertainment only.
            No actual degrees, credits, or academic standing are conferred. Results (fictional) may vary.
          </p>
        </Reveal>
      </section>
    </main>
  );
};

export default Home;
