'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseTextScrambleOptions {
  characters?: string;
  duration?: number;
  speed?: number;
}

interface UseTextScrambleReturn {
  displayText: string;
  isScrambling: boolean;
  scramble: (targetText: string) => void;
  reset: () => void;
}

const DEFAULT_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

export function useTextScramble(
  initialText: string,
  options: UseTextScrambleOptions = {}
): UseTextScrambleReturn {
  const {
    characters = DEFAULT_CHARACTERS,
    duration = 600,
    speed = 30,
  } = options;

  const [displayText, setDisplayText] = useState(initialText);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);
  const originalTextRef = useRef(initialText);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scramble = useCallback((targetText: string) => {
    if (isScrambling) return;

    setIsScrambling(true);
    const startTime = Date.now();
    const textLength = targetText.length;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Calculate how many characters should be "revealed"
      const revealedCount = Math.floor(progress * textLength);

      // Build the display text
      let result = '';
      for (let i = 0; i < textLength; i++) {
        if (i < revealedCount) {
          // Revealed character
          result += targetText[i];
        } else {
          // Random scrambled character
          result += characters[Math.floor(Math.random() * characters.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(targetText);
        setIsScrambling(false);
        frameRef.current = null;
      }
    };

    // Start with slightly randomized initial state
    const initialScrambled = targetText
      .split('')
      .map(() => characters[Math.floor(Math.random() * characters.length)])
      .join('');
    setDisplayText(initialScrambled);

    frameRef.current = requestAnimationFrame(animate);
  }, [characters, duration, isScrambling]);

  const reset = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setDisplayText(originalTextRef.current);
    setIsScrambling(false);
  }, []);

  return {
    displayText,
    isScrambling,
    scramble,
    reset,
  };
}

export default useTextScramble;
