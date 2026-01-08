'use client';

import { useEffect } from 'react';
import { initializeGSAP } from '@/lib/gsap-config';

export function GSAPInitializer() {
  useEffect(() => {
    initializeGSAP();
  }, []);

  return null;
}
