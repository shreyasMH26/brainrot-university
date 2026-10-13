import { motion } from 'framer-motion';
import { professors } from '../data/professors';
import ProfessorCard from '../components/ProfessorCard';

export default function Faculty() {
  return (
    <div className="min-h-screen bg-[#090909] text-[#F0EBDD] px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <p className="text-[#C6FF00] text-xs font-black tracking-[0.35em] uppercase">
            DISTINGUISHED SCHOLARS
          </p>
          <h1 className="text-3xl md:text-5xl font-black uppercase text-[#F0EBDD] tracking-tight">
            MEET THE FACULTY
          </h1>
          <p className="text-sm text-[#888888] max-w-xl mx-auto leading-relaxed">
            All qualifications are entirely satirical. All professors are figments of internet delusion. The academic damage they inflict is profoundly real.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid gap-6 md:grid-cols-2"
        >
          {professors.map((prof) => (
            <motion.div
              key={prof.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
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
