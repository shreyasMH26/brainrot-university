import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DepartmentCard from '../components/DepartmentCard';
import { departments } from '../data/departments';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function Departments() {
  return (
    <div className="min-h-screen bg-[#090909] text-white pt-28 sm:pt-32 pb-24">
      {/* ── Page Header ─────────────────────────────── */}
      <motion.header
        className="px-6 pb-12 text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-block rounded-full px-3.5 py-1 text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 text-white/70">
            5 Academic Disciplines
          </div>
          <h1
            className="mb-4 font-heading font-medium leading-[0.95] tracking-tight uppercase text-white"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            CHOOSE YOUR
            <br />
            <span className="text-white/40">DAMAGE</span>
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed text-white/60 font-light max-w-lg mx-auto">
            Five world-class departments. Zero accreditation. Infinite emotional consequences. Select
            the academic pathway best suited to accelerating your personal decline.
          </p>

          {/* Stats strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-xs font-mono">
            {[
              { label: 'Departments', value: '5' },
              { label: 'Total Modules', value: '25' },
              { label: 'Students Ruined', value: '501,012' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.header>

      {/* ── Department Grid ──────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6">
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
                className="block h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-2xl"
              >
                <DepartmentCard department={dept} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
