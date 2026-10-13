import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TICKER_MESSAGES = [
  'NOW ENROLLING: ADVANCED OVERTHINKING 101',
  'ZERO GRASS TOUCHED THIS SEMESTER',
  'LATEST RESEARCH: PROCRASTINATION STILL WORKS',
  'PROFESSOR BRAINCELL HAS ENTERED THE BUILDING',
  'WARNING: RIZZ ENGINEERING LAB IS ON FIRE AGAIN',
  'DELUSION STUDIES APPLICATIONS NOW OPEN',
  'REMINDER: YOUR THESIS IS STILL DUE NEVER',
  'BRAINROT TECHNOLOGY DEPARTMENT DISCOVERS NEW STRAIN',
  'HALL OF FAME INDUCTEE: SKIPPING CLASS WITH PURPOSE',
  'UNACCREDITED BY EVERY KNOWN INSTITUTION',
];

const DEPARTMENTS = [
  { label: 'Delusion Studies', to: '/departments/delusion-studies' },
  { label: 'Unproductive Sciences', to: '/departments/unproductive-sciences' },
  { label: 'Rizz Engineering', to: '/departments/rizz-engineering' },
  { label: 'Grass Studies', to: '/departments/grass-studies' },
  { label: 'Brainrot Technology', to: '/departments/brainrot-technology' },
];

const QUICK_LINKS = [
  { label: 'Courses', to: '/courses' },
  { label: 'Exam Hall', to: '/examination-hall' },
  { label: 'Hall of Fame', to: '/hall-of-fame' },
  { label: 'Faculty', to: '/faculty' },
  { label: 'Departments', to: '/departments' },
];

function Ticker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const message = TICKER_MESSAGES.join(' · ');
  // Duplicate to create seamless loop
  const fullMessage = `${message} · ${message}`;

  return (
    <div
      className="w-full overflow-hidden py-2 text-xs font-bold tracking-widest uppercase"
      style={{ backgroundColor: '#C6FF00', color: '#090909' }}
    >
      <div className="relative flex">
        <motion.div
          className="flex whitespace-nowrap shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          ref={tickerRef}
        >
          <span className="pr-8">{fullMessage}</span>
        </motion.div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#090909', borderTop: '1px solid rgba(240,235,221,0.1)' }}>
      {/* Ticker */}
      <Ticker />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-extrabold uppercase tracking-widest text-[#C6FF00]">
                ☠️ BRAINROT UNIVERSITY
              </span>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#888888] mt-0.5">
                EST. NEVER · UNACCREDITED
              </p>
            </div>
            <p className="text-sm text-[#888888] leading-relaxed max-w-xs">
              The world's premier institution for advanced intellectual deterioration.
              We mold minds into mush with pride. Our alumni are everywhere — unfortunately.
            </p>
            <div className="mt-6 text-xs text-[#888888] italic leading-relaxed border-l-2 border-[#641C2B] pl-3">
              "Where knowledge goes to die, and vibes are born."
              <br />
              <span className="text-[#C6FF00] not-italic font-bold">— The Brainrot Charter, Article 1</span>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#F0EBDD] mb-4">
              Departments
            </h3>
            <ul className="space-y-2">
              {DEPARTMENTS.map((dept) => (
                <li key={dept.to}>
                  <Link
                    to={dept.to}
                    className="text-sm text-[#888888] hover:text-[#C6FF00] transition-colors duration-150"
                  >
                    {dept.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#F0EBDD] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[#888888] hover:text-[#C6FF00] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-xs text-[#888888] font-mono">
              STATUS: ARCHIVE ONLY · ZERO REGISTRATION REQUIRED
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(240,235,221,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#888888]">
            © Never — Brainrot University. Unaccredited by Everyone.
          </p>
          <p className="text-xs text-[#888888] text-center sm:text-right italic max-w-sm">
            All degrees are fictional. All professors are imaginary. All academic damage is real.
          </p>
        </div>
      </div>
    </footer>
  );
}
