'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';

import MenuBackground from './MenuBackground';
import MenuGeometrics from './MenuGeometrics';
import MenuItem from './MenuItem';
import MenuCursor from './MenuCursor';
import { useMenuAnimations } from './hooks/useMenuAnimations';
import { useTransition } from '@/components/transitions';

import './VanguardMenu.css';

gsap.registerPlugin(useGSAP);

interface MenuItemData {
  number: string;
  title: string;
  href: string;
  image: string;
}

interface VanguardMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems: MenuItemData[] = [
  { number: '00', title: 'Home', href: '/', image: '/images/home/hero-img.jpg' },
  { number: '01', title: 'About', href: '/about', image: '/images/projects/project-1.jpg' },
  { number: '02', title: 'Services', href: '/services', image: '/images/projects/project-2.jpg' },
  { number: '03', title: 'Work', href: '/work', image: '/images/projects/project-3.jpg' },
  { number: '04', title: 'Blog', href: '/blog', image: '/images/projects/project-2.jpg' },
  { number: '05', title: 'Contact', href: '/contact', image: '/images/home/hero-img.jpg' },
];

const VanguardMenu: React.FC<VanguardMenuProps> = ({ isOpen, setIsOpen }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('00:00');

  // Refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const geometricsRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const { startTransition } = useTransition();

  // Animation hooks
  const { animateOpen, animateClose, animateItemHover } = useMenuAnimations({
    overlay: overlayRef,
    background: backgroundRef,
    geometrics: geometricsRef,
    menuItems: menuItemsRef,
    closeButton: closeButtonRef,
    cursor: cursorRef,
  });

  // Update time on client side only to avoid hydration mismatch
  useEffect(() => {
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }));

    // Update every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Scroll-aware logo positioning
  useGSAP(() => {
    const menuTrigger = menuTriggerRef.current;
    if (!menuTrigger) return;

    const updateLogoPosition = () => {
      const ctaElement = document.querySelector('.immersive-cta') as HTMLElement;
      if (!ctaElement) return;

      const ctaRect = ctaElement.getBoundingClientRect();
      const logoRect = menuTrigger.getBoundingClientRect();
      const minGap = 20;
      const maxTop = ctaRect.top - logoRect.height - minGap;

      if (maxTop < 20) {
        gsap.to(menuTrigger, {
          opacity: 0.3,
          scale: 0.8,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(menuTrigger, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    updateLogoPosition();
    window.addEventListener('scroll', updateLogoPosition, { passive: true });
    window.addEventListener('resize', updateLogoPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateLogoPosition);
      window.removeEventListener('resize', updateLogoPosition);
    };
  });

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        handleClose();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  // Handle menu open
  const handleOpen = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(true);

    const tl = animateOpen();
    tl.eventCallback('onComplete', () => setIsAnimating(false));
  }, [isAnimating, setIsOpen, animateOpen]);

  // Handle menu close
  const handleClose = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = animateClose();
    tl.eventCallback('onComplete', () => {
      setIsAnimating(false);
      setIsOpen(false);
      setActiveIndex(null);
    });
  }, [isAnimating, setIsOpen, animateClose]);

  // Handle navigation with page transition
  const handleNavigation = useCallback(
    (href: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      handleClose();

      // Start page transition after menu close animation
      setTimeout(() => {
        startTransition(() => {
          router.push(href);
        });
      }, 600);
    },
    [router, handleClose, startTransition]
  );

  // Menu item hover handlers
  const handleItemEnter = useCallback(
    (index: number) => {
      setActiveIndex(index);
      const element = menuItemsRef.current[index];
      if (element) {
        animateItemHover(element, true);
      }
    },
    [animateItemHover]
  );

  const handleItemLeave = useCallback(
    (index: number) => {
      setActiveIndex(null);
      const element = menuItemsRef.current[index];
      if (element) {
        animateItemHover(element, false);
      }
    },
    [animateItemHover]
  );

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="vanguard-menu-wrapper">
      {/* Menu Trigger - Logo */}
      <div
        ref={menuTriggerRef}
        className="vanguard-menu-trigger"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label="Open menu"
        onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
      >
        <img
          src="/images/logos/elites-solutions-logo.webp"
          alt="The Elites Solutions"
          className="vanguard-trigger-logo"
        />
        <div className="trigger-glow" aria-hidden="true" />
      </div>

      {/* Fullscreen Overlay */}
      <div
        ref={overlayRef}
        className="vanguard-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Background Layer */}
        <MenuBackground ref={backgroundRef} isOpen={isOpen} />

        {/* Geometric Decorations */}
        <MenuGeometrics ref={geometricsRef} isOpen={isOpen} />

        {/* Close Button */}
        <button
          ref={closeButtonRef}
          className="vanguard-close-btn"
          onClick={handleClose}
          aria-label="Close menu"
        >
          <span className="close-text">Close</span>
          <span className="close-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>

        {/* Menu Content */}
        <div className="vanguard-menu-content">
          <nav className="vanguard-menu-nav" aria-label="Main navigation">
            {menuItems.map((item, index) => (
              <MenuItem
                key={item.href}
                ref={(el) => {
                  menuItemsRef.current[index] = el;
                }}
                number={item.number}
                title={item.title}
                href={item.href}
                isActive={activeIndex === index}
                onHover={() => handleItemEnter(index)}
                onLeave={() => handleItemLeave(index)}
                onClick={handleNavigation(item.href)}
              />
            ))}
          </nav>
        </div>

        {/* Custom Cursor (desktop only) */}
        {!prefersReducedMotion && (
          <MenuCursor
            ref={cursorRef}
            isActive={activeIndex !== null}
            isOpen={isOpen}
          />
        )}

        {/* Footer Info */}
        <div className="vanguard-menu-footer">
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="LinkedIn">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <FaXTwitter size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Status Bar */}
        <div className="vanguard-status-bar">
          <span className="status-item">
            <span className="status-dot" />
            MENU ACTIVE
          </span>
          <span className="status-item status-time">
            {currentTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VanguardMenu;
