import { Link } from 'react-router-dom';

const DEPARTMENTS = [
  { label: 'Delusion Studies', to: '/departments/delusion-studies' },
  { label: 'Unproductive Sciences', to: '/departments/unproductive-sciences' },
  { label: 'Rizz Engineering', to: '/departments/rizz-engineering' },
  { label: 'Grass Studies', to: '/departments/grass-studies' },
  { label: 'Brainrot Technology', to: '/departments/brainrot-technology' },
];

const QUICK_LINKS = [
  { label: 'Courses', to: '/courses' },
  { label: 'Examinations', to: '/examination-hall' },
  { label: 'Hall of Fame', to: '/hall-of-fame' },
  { label: 'Faculty', to: '/faculty' },
  { label: 'Departments', to: '/departments' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#090909] border-t border-white/10 text-white select-none">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="font-heading text-2xl tracking-tight text-white font-medium hover:opacity-80 transition-opacity"
            >
              BRAINROT UNIVERSITY ✳︎
            </Link>
            <p className="text-[11px] font-mono tracking-widest uppercase text-white/40 mt-1">
              EST. NEVER · ACCREDITED BY NOBODY
            </p>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm mt-4 font-light">
              The world&apos;s premier institution for advanced intellectual deterioration. We mold
              minds into mush with pride.
            </p>
            <div className="mt-6 text-xs text-white/50 italic border-l border-white/20 pl-3">
              &ldquo;Where knowledge goes to die, and vibes are born.&rdquo;
              <br />
              <span className="text-[#C6FF00] not-italic font-mono text-[11px]">
                — The Brainrot Charter, Article 1
              </span>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
              Departments
            </h3>
            <ul className="space-y-2.5">
              {DEPARTMENTS.map((dept) => (
                <li key={dept.to}>
                  <Link
                    to={dept.to}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150 font-light"
                  >
                    {dept.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-[10px] text-white/40 font-mono tracking-wider">
              ARCHIVE ONLY · NO LOGIN REQUIRED
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40 font-mono">
          <p>© Never — Brainrot University. All rights unreserved.</p>
          <p className="text-center sm:text-right italic max-w-sm">
            All degrees are fictional. All professors are imaginary. All academic damage is real.
          </p>
        </div>
      </div>
    </footer>
  );
}
