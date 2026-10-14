import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Download, Printer } from 'lucide-react';
import type { Certificate as CertificateType } from '../types';

interface CertificateProps {
  certificate: CertificateType;
  onDownload?: () => void;
  onPrint?: () => void;
}

export default function Certificate({ certificate }: CertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const formattedDate = new Date(certificate.issuedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDownload = async () => {
    if (!certRef.current) return;
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#F0EBDD',
      });
      const link = document.createElement('a');
      link.download = `BU-${certificate.courseId}-${certificate.studentName.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error generating certificate image:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto select-none">
      {/* Certificate Frame */}
      <div
        ref={certRef}
        className="w-full bg-[#F0EBDD] text-[#090909] p-8 md:p-12 relative shadow-2xl rounded-2xl border-4 border-[#641C2B] font-serif select-none"
        style={{
          aspectRatio: '1.414 / 1', // A4 proportions
        }}
      >
        {/* Inner decorative border */}
        <div className="w-full h-full border border-dashed border-[#641C2B]/60 p-6 flex flex-col justify-between items-center text-center relative rounded-xl">
          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 text-xl text-[#641C2B]">✦</div>
          <div className="absolute top-2 right-2 text-xl text-[#641C2B]">✦</div>
          <div className="absolute bottom-2 left-2 text-xl text-[#641C2B]">✦</div>
          <div className="absolute bottom-2 right-2 text-xl text-[#641C2B]">✦</div>

          {/* Header */}
          <div className="space-y-1">
            <div className="text-4xl mb-1">☠️</div>
            <h1 className="text-2xl md:text-3xl font-black tracking-widest text-[#641C2B] uppercase">
              BRAINROT UNIVERSITY
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#090909]/70 font-sans font-bold">
              EST. NEVER · ACCREDITED BY LITERALLY NOBODY
            </p>
          </div>

          {/* Main Statement */}
          <div className="my-2 space-y-2">
            <p className="text-xs italic text-[#090909]/80">This hereby certifies that</p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#090909] border-b-2 border-[#641C2B] pb-1 px-8 inline-block">
              {certificate.studentName}
            </h2>
            <p className="text-xs text-[#090909]/80 mt-2">
              has survived the catastrophic curriculum of
            </p>
            <h3 className="text-lg md:text-2xl font-bold uppercase tracking-wide text-[#641C2B]">
              {certificate.courseTitle}
            </h3>
            <p className="text-xs text-[#090909]/80">
              and is officially awarded the questionable distinction of
            </p>
            <div className="inline-block bg-[#641C2B]/10 px-4 py-1 rounded text-sm md:text-base font-black text-[#641C2B] tracking-wider uppercase border border-[#641C2B]/30">
              {certificate.gradeLabel}
            </div>
          </div>

          {/* Signatures & Metadata */}
          <div className="w-full grid grid-cols-3 items-end pt-4 border-t border-[#641C2B]/30 text-xs text-[#090909]/80 font-sans">
            <div className="text-left space-y-1">
              <p className="font-mono text-[10px] text-[#090909]/60">ID: {certificate.certificateCode}</p>
              <p className="text-[11px] font-semibold">Date: {formattedDate}</p>
            </div>

            <div className="text-center space-y-1">
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-[#641C2B] flex items-center justify-center font-bold text-[10px] text-[#641C2B] uppercase rotate-[-12deg] bg-[#641C2B]/5">
                SEAL OF DELUSION
              </div>
            </div>

            <div className="text-right space-y-1">
              <p className="font-serif italic text-sm text-[#090909]/90 border-b border-[#090909]/30 pb-0.5 inline-block">
                Prof. Braincell, PhD
              </p>
              <p className="text-[10px] uppercase tracking-wider text-[#090909]/60">Presiding Dean</p>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <p className="text-[9px] text-[#090909]/50 font-sans italic mt-2">
            * This qualification has zero academic validity, zero credit transferability, and infinite aura damage.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-white text-black font-medium text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-white/85 active:scale-95 transition shadow-md"
        >
          <Download size={16} />
          Download Certificate (PNG)
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 border border-white/20 text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-white/10 active:scale-95 transition"
        >
          <Printer size={16} />
          Print
        </button>
      </div>
    </div>
  );
}
