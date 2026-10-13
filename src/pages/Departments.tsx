import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import DepartmentCard from '../components/DepartmentCard';
import { departments } from '../data/departments';

// ─────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function Departments() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#090909' }}>
      {/* ── Page header ─────────────────────────────── */}
      <motion.header
        className="border-b border-white/10 px-6 py-16 text-center"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-3xl">
          {/* Eye-catch badge */}
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium tracking-widest uppercase"
            style={{ color: '#C6FF00', borderColor: 'rgba(198,255,0,0.25)' }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.4 }}
          >
            <GraduationCap size={13} />
            Academic Faculties
          </motion.div>

          <h1
            className="mb-4 font-black tracking-tighter leading-none"
            style={{
              color: '#F0EBDD',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            CHOOSE YOUR
            <br />
            <span style={{ color: '#C6FF00' }}>DAMAGE</span>
          </h1>

          <p
            className="mx-auto max-w-xl text-base leading-relaxed"
            style={{ color: '#888888' }}
          >
            Five world-class departments. Zero accreditation. Infinite emotional consequences.
            Select the academic pathway best suited to accelerating your personal decline.
          </p>

          {/* Stats strip */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {[
              { label: 'Departments', value: '5' },
              { label: 'Total Courses', value: '25' },
              { label: 'Students Ruined', value: '501,012' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl font-black"
                  style={{ color: '#C6FF00' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs tracking-widest uppercase" style={{ color: '#888888' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.header>

      {/* ── Department grid ──────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-14">
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {departments.map((dept) => (
            <motion.div key={dept.id} variants={itemVariants}>
              <Link
                to={`/departments/${dept.id}`}
                className="block h-full focus:outline-none focus-visible:ring-2 rounded-xl"
                style={{ ['--tw-ring-color' as string]: '#C6FF00' }}
              >
                <DepartmentCard department={dept} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom flavour text */}
        <motion.p
          className="mt-12 text-center text-xs tracking-widest uppercase"
          style={{ color: '#888888' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Brainrot University — Est. 1984 · All damage is self-inflicted · No refunds
        </motion.p>
      </main>
    </div>
  );
}
