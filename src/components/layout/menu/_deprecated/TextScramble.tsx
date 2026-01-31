'use client';

import React, { useEffect } from 'react';
import { useTextScramble } from './hooks/useTextScramble';

interface TextScrambleProps {
  text: string;
  isActive: boolean;
  className?: string;
  duration?: number;
  characters?: string;
}

const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  isActive,
  className = '',
  duration = 600,
  characters,
}) => {
  const { displayText, scramble, reset } = useTextScramble(text, {
    duration,
    characters,
  });

  useEffect(() => {
    if (isActive) {
      scramble(text);
    } else {
      reset();
    }
  }, [isActive, text, scramble, reset]);

  return (
    <span className={className} data-text={text}>
      {displayText}
    </span>
  );
};

export default TextScramble;
