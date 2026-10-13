"use client";

import DotPattern from "@/components/ui/dot-pattern-1";

export function Quote() {
  return (
    <>
      <div className="mx-auto mb-10 max-w-7xl px-6 md:mb-20 xl:px-0">
        <div className="relative flex flex-col items-center border border-[#C6FF00]/40 bg-[#090909]/90 shadow-[0_0_50px_rgba(198,255,0,0.08)]">
          <DotPattern width={6} height={6} className="fill-[#C6FF00]/25" />

          {/* Corner accents styled with BU signature acid green */}
          <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-[#C6FF00] shadow-[0_0_8px_#C6FF00]" />
          <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#C6FF00] shadow-[0_0_8px_#C6FF00]" />
          <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-[#C6FF00] shadow-[0_0_8px_#C6FF00]" />
          <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#C6FF00] shadow-[0_0_8px_#C6FF00]" />

          <div className="relative z-20 mx-auto max-w-7xl rounded-[40px] py-8 md:p-12 xl:py-20 text-center md:text-left">
            <p className="text-xs uppercase font-mono tracking-[0.3em] font-black text-[#C6FF00] mb-3 md:text-sm lg:text-base">
              OFFICIAL DEAN'S EPIPHANY · AURA +100,000
            </p>
            <div className="text-2xl tracking-tighter text-[#F0EBDD] md:text-5xl lg:text-7xl xl:text-8xl select-none">
              <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3 xl:gap-4 items-baseline justify-center md:justify-start">
                <h1 className="font-semibold">"Your brain cells</h1>
                <p className="font-thin text-[#888888]">should be</p>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3 xl:gap-4 items-baseline justify-center md:justify-start">
                <p className="font-thin text-[#888888]">completely</p>
                <h1 className="font-semibold text-[#C6FF00]">cooked</h1>
                <p className="font-thin text-[#888888]">because</p>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3 xl:gap-4 items-baseline justify-center md:justify-start">
                <p className="font-thin text-[#888888]">delulu</p>
                <h1 className="font-semibold">thoughts are</h1>
              </div>
              <div className="flex flex-wrap gap-1 md:gap-2 lg:gap-3 xl:gap-4 items-baseline justify-center md:justify-start">
                <p className="font-thin text-[#888888]">simply</p>
                <h1 className="font-semibold text-[#C6FF00]">the only solulu..."</h1>
              </div>
            </div>

            <p className="mt-6 text-xs md:text-sm font-mono text-[#888888] italic">
              — Professor Braincell, PhD in Terminal Online Behavior (Chat, this is peer-reviewed)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
