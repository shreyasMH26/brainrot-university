import { useState, useEffect } from 'react';

export function useTypewriter(
  text: string,
  speed: number = 38,
  startDelay: number = 600
): { displayed: string; done: boolean } {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, show full text immediately
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    let currentIndex = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    setDisplayed('');
    setDone(false);

    const startTimer = setTimeout(() => {
      timer = setInterval(() => {
        currentIndex++;
        setDisplayed(text.slice(0, currentIndex));
        if (currentIndex >= text.length) {
          if (timer) clearInterval(timer);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
