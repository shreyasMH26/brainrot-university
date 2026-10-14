import { useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';
const SENSITIVITY = 0.8;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const isSeekingRef = useRef(false);
  const queuedTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Ensure video is paused
    video.pause();

    const applySeek = (targetTime: number) => {
      if (!video || isNaN(video.duration) || video.duration <= 0) return;
      const clamped = Math.max(0, Math.min(targetTime, video.duration));

      if (isSeekingRef.current) {
        queuedTimeRef.current = clamped;
      } else {
        isSeekingRef.current = true;
        try {
          video.currentTime = clamped;
        } catch {
          isSeekingRef.current = false;
        }
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (queuedTimeRef.current !== null) {
        const nextTime = queuedTimeRef.current;
        queuedTimeRef.current = null;
        applySeek(nextTime);
      }
    };

    video.addEventListener('seeked', handleSeeked);

    if (prefersReducedMotion) {
      return () => {
        video.removeEventListener('seeked', handleSeeked);
      };
    }

    // Mouse scrub logic
    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      if (!video || isNaN(video.duration) || video.duration <= 0) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const targetTime = video.currentTime + timeOffset;
      applySeek(targetTime);
    };

    // Touch drag scrub logic for mobile/tablet devices
    let touchStartX: number | null = null;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX === null || e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;
      const delta = currentX - touchStartX;
      touchStartX = currentX;

      if (!video || isNaN(video.duration) || video.duration <= 0) return;

      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      const targetTime = video.currentTime + timeOffset;
      applySeek(targetTime);
    };

    const handleTouchEnd = () => {
      touchStartX = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none select-none bg-[#090909]"
      style={{ zIndex: 0 }}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover"
        style={{
          objectPosition: '70% center',
          zIndex: 0,
        }}
      />
      {/* Subtle cinematic dark gradient overlay for text readability */}
      <div
        className="fixed inset-0 w-full h-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(9,9,9,0.2) 0%, rgba(9,9,9,0.72) 100%), linear-gradient(180deg, rgba(9,9,9,0.45) 0%, rgba(9,9,9,0.15) 50%, rgba(9,9,9,0.7) 100%)',
          zIndex: 0,
        }}
      />
    </div>
  );
}
