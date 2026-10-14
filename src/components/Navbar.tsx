import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { StudentProfile } from '../types';

interface NavbarProps {
  onCrestClick?: () => void;
  profile?: StudentProfile | null;
}

const NAV_LINKS = [
  { label: 'Departments', to: '/departments' },
  { label: 'Courses', to: '/courses' },
  { label: 'Examinations', to: '/examination-hall' },
  { label: 'Hall of Fame', to: '/hall-of-fame' },
  { label: 'Faculty', to: '/faculty' },
];

export default function Navbar({ onCrestClick, profile: _profile }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const location = useLocation();

  // Crest click easter egg (7 clicks)
  const handleLogoClick = useCallback(() => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 7) {
      onCrestClick?.();
      setClickCount(0);
    }
  }, [clickCount, onCrestClick]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 w-full px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between pointer-events-auto bg-[#090909]/40 backdrop-blur-md border-b border-white/5 transition-all"
        style={{ zIndex: 50 }}
      >
        {/* Brand / Wordmark */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="font-heading text-[21px] sm:text-[26px] tracking-tight text-white font-medium hover:opacity-80 transition-opacity select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
          aria-label="Brainrot University Home"
        >
          BRAINROT UNIVERSITY ✳︎
        </Link>

        {/* Desktop Comma-separated Navigation Links */}
        <nav
          className="hidden md:flex items-center text-[13px] tracking-wide text-white/90 font-light"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link, idx) => (
            <span key={link.to} className="inline-flex items-center">
              <Link
                to={link.to}
                className={`transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-white font-medium underline underline-offset-4 decoration-white/60'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
              {idx < NAV_LINKS.length - 1 && (
                <span className="text-white/35 mr-1 sm:mr-1.5 ml-0.5">,</span>
              )}
            </span>
          ))}
        </nav>

        {/* Desktop Enroll CTA */}
        <div className="hidden md:flex items-center">
          <Link
            to="/portal"
            className="text-[13px] tracking-wide text-white underline underline-offset-4 hover:opacity-70 transition-opacity font-medium"
          >
            Enroll now
          </Link>
        </div>

        {/* Mobile Hamburger Button (morphing 3 bars into X) */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white p-1"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
        >
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ease-in-out ${
              mobileOpen ? 'rotate-45 translate-y-[7.5px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all duration-200 ease-in-out ${
              mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ease-in-out ${
              mobileOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile Full-Screen Overlay */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 w-full h-full bg-[rgba(9,9,9,0.95)] backdrop-blur-2xl flex flex-col justify-between px-8 py-24 md:hidden transition-opacity"
          style={{ zIndex: 40 }}
        >
          <div className="flex flex-col space-y-6 mt-8">
            <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
              Academic Index
            </span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-heading tracking-tight transition-colors ${
                  location.pathname === link.to ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Link
                to="/portal"
                onClick={() => setMobileOpen(false)}
                className="inline-block text-lg font-medium text-white underline underline-offset-8 hover:opacity-75 transition-opacity"
              >
                Enroll now →
              </Link>
            </div>
          </div>

          <div className="text-xs text-white/40 flex justify-between tracking-wider font-mono">
            <span>EST. NEVER</span>
            <span>UNACCREDITED</span>
          </div>
        </div>
      )}
    </>
  );
}
