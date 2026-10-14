import { motion } from 'framer-motion';
import { professors } from '../data/professors';
import ProfessorCard from '../components/ProfessorCard';

export default function Faculty() {
  return (
    <div className="min-h-screen bg-[#090909] text-white pt-28 sm:pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="mb-4 inline-block rounded-full px-3.5 py-1 text-xs font-mono uppercase tracking-widest bg-white/5 border border-white/10 text-white/70">
            Staff & Chairs
          </div>
          <h1
            className="font-heading font-medium leading-[0.95] tracking-tight uppercase text-white"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            MEET THE FACULTY
            <br />
            <span className="text-white/40">(ALL FICTIONAL)</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-light max-w-xl mx-auto leading-relaxed">
            All qualifications are entirely satirical. All professors are figments of internet delusion. The
            academic damage they inflict is profoundly real.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid gap-6 md:grid-cols-2"
        >
          {professors.map((prof) => (
            <motion.div
              key={prof.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ProfessorCard professor={prof} compact={false} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
