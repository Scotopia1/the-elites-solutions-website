import { useRef, useCallback } from 'react';
import gsap from 'gsap';

interface AnimationRefs {
  overlay: React.RefObject<HTMLDivElement | null>;
  menuItems: React.RefObject<(HTMLLIElement | null)[]>;
  closeButton: React.RefObject<HTMLButtonElement | null>;
  footer: React.RefObject<HTMLDivElement | null>;
}

export function useCleanMenuAnimation(refs: AnimationRefs) {
  const openTl = useRef<gsap.core.Timeline | null>(null);
  const closeTl = useRef<gsap.core.Timeline | null>(null);

  const openTimeline = useCallback(() => {
    // Kill any existing timelines
    openTl.current?.kill();
    closeTl.current?.kill();

    const tl = gsap.timeline();
    openTl.current = tl;

    // Reset menu items opacity for animation
    const items = refs.menuItems.current?.filter(Boolean) || [];
    gsap.set(items, { opacity: 0, y: 60 });
    gsap.set(refs.footer.current, { opacity: 0, y: 20 });
    gsap.set(refs.closeButton.current, { opacity: 0 });

    tl.set(refs.overlay.current, { visibility: 'visible' })
      .to(refs.overlay.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      .to(
        items,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.2'
      )
      .to(
        refs.closeButton.current,
        {
          opacity: 1,
          duration: 0.3,
        },
        '-=0.4'
      )
      .to(
        refs.footer.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        '-=0.3'
      );

    return tl;
  }, [refs]);

  const closeTimeline = useCallback(() => {
    openTl.current?.kill();
    closeTl.current?.kill();

    const tl = gsap.timeline();
    closeTl.current = tl;

    const items = refs.menuItems.current?.filter(Boolean) || [];

    tl.to(refs.footer.current, {
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
    })
      .to(
        items,
        {
          y: -40,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.in',
        },
        '-=0.15'
      )
      .to(
        refs.closeButton.current,
        {
          opacity: 0,
          duration: 0.2,
        },
        '-=0.3'
      )
      .to(
        refs.overlay.current,
        {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.2'
      )
      .set(refs.overlay.current, { visibility: 'hidden' });

    return tl;
  }, [refs]);

  return { openTimeline, closeTimeline };
}
