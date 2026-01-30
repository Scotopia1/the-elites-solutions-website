'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import LoadingScreen from '@/components/layout/LoadingScreen';

interface LoadingContextType {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoaded: false,
  setIsLoaded: () => {},
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Show content and trigger auto-scroll when loading completes
  useEffect(() => {
    if (isLoaded) {
      // Show content immediately for seamless logo transition
      setShowContent(true);

      // Auto-scroll to reveal stats after a short delay
      const scrollTimer = setTimeout(() => {
        // Find the stats section or scroll to a specific point
        const statsSection = document.querySelector('.immersive-stats');
        const heroSection = document.querySelector('.immersive-hero');

        if (statsSection && heroSection) {
          // Calculate scroll position to show all stats
          // The hero is pinned, so we need to scroll through the pin distance
          const heroRect = heroSection.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Scroll smoothly to reveal stats (scroll to end of pinned section)
          // The pin goes from top top to +=150%, so we scroll ~150% of viewport
          const scrollTarget = windowHeight * 1.5;

          window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth'
          });
        }
      }, 1200); // Delay to allow exit animation to complete

      return () => clearTimeout(scrollTimer);
    }
  }, [isLoaded]);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  return (
    <LoadingContext.Provider value={{ isLoaded, setIsLoaded }}>
      <LoadingScreen onComplete={handleLoadingComplete} minimumDuration={2500} />
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.8s ease-out',
        }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}
