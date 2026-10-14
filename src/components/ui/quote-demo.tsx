"use client";

import DotPattern from "@/components/ui/dot-pattern-1";

export function Quote() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="relative rounded-3xl border border-white/10 bg-[#111111]/80 backdrop-blur-md overflow-hidden p-8 sm:p-14 lg:p-20 shadow-2xl">
        <DotPattern width={20} height={20} cr={0.7} className="fill-white/10" />

        <div className="relative z-10 max-w-4xl mx-auto text-center md:text-left">
          <p className="text-[11px] uppercase font-mono tracking-[0.3em] text-[#C6FF00] mb-4">
            OFFICIAL DEAN&apos;S EPIPHANY · AURA +100,000
          </p>

          <div className="font-heading text-2xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tighter text-white leading-[1.05] select-none">
            <div className="flex flex-wrap gap-2 md:gap-3 items-baseline justify-center md:justify-start">
              <span className="font-medium text-white">&ldquo;Your brain cells</span>
              <span className="text-white/40 font-light">should be</span>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 items-baseline justify-center md:justify-start">
              <span className="text-white/40 font-light">completely</span>
              <span className="font-medium text-[#C6FF00]">cooked</span>
              <span className="text-white/40 font-light">because</span>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 items-baseline justify-center md:justify-start">
              <span className="text-white/40 font-light">delulu</span>
              <span className="font-medium text-white">thoughts are</span>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3 items-baseline justify-center md:justify-start">
              <span className="text-white/40 font-light">simply</span>
              <span className="font-medium text-[#C6FF00]">the only solulu&hellip;&rdquo;</span>
            </div>
          </div>

          <p className="mt-8 text-xs sm:text-sm font-mono text-white/50 tracking-wide">
            — Professor Braincell, PhD in Terminal Online Behavior (Peer-reviewed by no one)
          </p>
        </div>
      </div>
    </div>
  );
}
