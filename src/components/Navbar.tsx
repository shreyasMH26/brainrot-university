import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import type { StudentProfile } from '../types';

interface NavbarProps {
  onCrestClick?: () => void;
  profile?: StudentProfile | null;
}

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Departments', to: '/departments' },
  { label: 'Courses', to: '/courses' },
  { label: 'Examination Hall', to: '/examination-hall' },
  { label: 'Hall of Fame', to: '/hall-of-fame' },
  { label: 'Faculty', to: '/faculty' },
];

export default function Navbar({ onCrestClick, profile }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const location = useLocation();

  const handleLogoClick = useCallback(() => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 7) {
      onCrestClick?.();
      setClickCount(0);
    }
  }, [clickCount, onCrestClick]);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: '#090909',
        borderBottom: '1px solid rgba(240,235,221,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex flex-col items-start leading-tight select-none cursor-pointer focus:outline-none shrink-0"
            aria-label="Brainrot University Logo"
          >
            <span className="text-xl font-extrabold uppercase tracking-widest text-[#C6FF00]">
              ☠️ BRAINROT UNIVERSITY
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#888888]">
              EST. NEVER · UNACCREDITED
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-150 whitespace-nowrap ${
                  isActive(link.to)
                    ? 'text-[#C6FF00]'
                    : 'text-[#F0EBDD] hover:text-[#C6FF00]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {profile && (
              <div className="flex items-center gap-2 text-sm text-[#F0EBDD] mr-2">
                <User size={14} className="text-[#888888]" />
                <span className="text-[#888888]">{profile.name}</span>
              </div>
            )}
            <Link
              to="/student-portal"
              className="px-4 py-2 rounded text-sm font-semibold text-[#F0EBDD] bg-[#641C2B] hover:bg-[#7a2234] transition-colors duration-150"
            >
              Student Portal
            </Link>
            <Link
              to="/apply"
              className="px-4 py-2 rounded text-sm font-bold text-[#090909] bg-[#C6FF00] hover:bg-[#d4ff33] transition-colors duration-150"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[#F0EBDD] hover:text-[#C6FF00] transition-colors p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden lg:hidden"
            style={{ backgroundColor: '#090909', borderTop: '1px solid rgba(240,235,221,0.1)' }}
          >
            <div className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? 'text-[#C6FF00] bg-[#C6FF00]/10'
                      : 'text-[#F0EBDD] hover:text-[#C6FF00] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 my-2" />
              {profile && (
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-[#888888]">
                  <User size={14} />
                  <span>{profile.name}</span>
                </div>
              )}
              <Link
                to="/student-portal"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded text-sm font-semibold text-center text-[#F0EBDD] bg-[#641C2B] hover:bg-[#7a2234] transition-colors"
              >
                Student Portal
              </Link>
              <Link
                to="/apply"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded text-sm font-bold text-center text-[#090909] bg-[#C6FF00] hover:bg-[#d4ff33] transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
