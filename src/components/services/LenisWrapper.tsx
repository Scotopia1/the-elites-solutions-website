'use client';

import { ReactLenis } from 'lenis/react';
import { useLenisConfig } from '@/hooks/useLenisConfig';

export default function LenisWrapper({ children }: { children: React.ReactNode }) {
  const lenisOptions = useLenisConfig();

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
