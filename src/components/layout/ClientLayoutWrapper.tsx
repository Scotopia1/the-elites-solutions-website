'use client';

import { ReactLenis } from 'lenis/react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useLenisConfig } from '@/hooks/useLenisConfig';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const lenisOptions = useLenisConfig();

  return (
    <ReactLenis root options={lenisOptions}>
      <ParallaxProvider>
        {children}
      </ParallaxProvider>
    </ReactLenis>
  );
}
