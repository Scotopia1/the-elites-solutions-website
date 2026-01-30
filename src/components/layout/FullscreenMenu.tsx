'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FocusTrap from "focus-trap-react";
import "./FullscreenMenu.css";

gsap.registerPlugin(useGSAP);

interface MenuItemData {
  number: string;
  title: string;
  href: string;
  image: string;
}

interface FullscreenMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems: MenuItemData[] = [
  { number: "00", title: "Home", href: "/", image: "/images/home/hero-img.jpg" },
  { number: "01", title: "About", href: "/about", image: "/images/projects/project-1.jpg" },
  { number: "02", title: "Services", href: "/services", image: "/images/projects/project-2.jpg" },
  { number: "03", title: "Work", href: "/work", image: "/images/projects/project-3.jpg" },
  { number: "04", title: "Blog", href: "/blog", image: "/images/projects/project-2.jpg" },
  { number: "05", title: "Contact", href: "/contact", image: "/images/home/hero-img.jpg" },
];

const FullscreenMenu = ({ isOpen, setIsOpen }: FullscreenMenuProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  // Store timeline refs for cleanup
  const openTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const closeTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Scroll-aware positioning - keep logo 20px above CTA
  useGSAP(() => {
    const menuTrigger = menuTriggerRef.current;
    if (!menuTrigger) return;

    const updateLogoPosition = () => {
      const ctaElement = document.querySelector('.immersive-cta') as HTMLElement;
      if (!ctaElement) return;

      const ctaRect = ctaElement.getBoundingClientRect();
      const logoRect = menuTrigger.getBoundingClientRect();
      const minGap = 20;

      // Calculate the maximum top position to maintain 20px gap above CTA
      const maxTop = ctaRect.top - logoRect.height - minGap;

      // Only adjust if the logo would overlap with CTA area
      if (maxTop < 20) {
        // Hide or minimize the logo when it would overlap
        gsap.to(menuTrigger, {
          opacity: 0.3,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        // Reset to normal state
        gsap.to(menuTrigger, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    // Initial check
    updateLogoPosition();

    // Listen to scroll
    window.addEventListener('scroll', updateLogoPosition, { passive: true });
    window.addEventListener('resize', updateLogoPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateLogoPosition);
      window.removeEventListener('resize', updateLogoPosition);
    };
  }, { scope: containerRef });

  // GSAP quickTo for smooth cursor following
  const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);

  // Initialize GSAP quickTo functions for cursor
  useGSAP(() => {
    if (cursorRef.current && isOpen) {
      xMoveCursor.current = gsap.quickTo(cursorRef.current, "left", {
        duration: 0.5,
        ease: "power3",
      });
      yMoveCursor.current = gsap.quickTo(cursorRef.current, "top", {
        duration: 0.5,
        ease: "power3",
      });
    }
  }, { dependencies: [isOpen], scope: containerRef });

  // Handle mouse move for custom cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    if (xMoveCursor.current && yMoveCursor.current) {
      xMoveCursor.current(e.clientX);
      yMoveCursor.current(e.clientY);
    }
  };

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        handleClose();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Cleanup all GSAP animations on unmount
  useEffect(() => {
    return () => {
      if (openTimelineRef.current) {
        openTimelineRef.current.kill();
      }
      if (closeTimelineRef.current) {
        closeTimelineRef.current.kill();
      }
    };
  }, []);

  // Handle menu open animation
  const handleOpen = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(true);

    // Kill existing timeline if any
    if (openTimelineRef.current) {
      openTimelineRef.current.kill();
    }

    openTimelineRef.current = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    openTimelineRef.current.set(overlayRef.current, { display: "flex" })
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(
        menuItemsRef.current.filter(Boolean),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.3"
      )
      .fromTo(
        closeButtonRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.6"
      );
  };

  // Handle menu close animation
  const handleClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Kill existing timeline if any
    if (closeTimelineRef.current) {
      closeTimelineRef.current.kill();
    }

    closeTimelineRef.current = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setIsOpen(false);
        setActiveIndex(null);
      },
    });

    closeTimelineRef.current.to(closeButtonRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(
        menuItemsRef.current.filter(Boolean).reverse(),
        {
          y: -50,
          opacity: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power4.in",
        },
        "-=0.2"
      )
      .to(
        overlayRef.current,
        { opacity: 0, duration: 0.5, ease: "power2.in" },
        "-=0.2"
      )
      .set(overlayRef.current, { display: "none" });
  };

  // Handle navigation
  const handleNavigation = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
    setTimeout(() => {
      router.push(href);
    }, 800);
  };

  // Menu item hover handlers
  const handleItemEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleItemLeave = () => {
    setActiveIndex(null);
  };

  // Animation variants for image preview
  const imageVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Get the current active image
  const activeImage = activeIndex !== null ? menuItems[activeIndex] : null;

  return (
    <div className="fullscreen-menu-wrapper">
      {/* Menu Trigger - Logo */}
      <button
        ref={menuTriggerRef}
        className="menu-trigger"
        onClick={handleOpen}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="fullscreen-menu"
      >
        <img
          src="/images/logos/elites-solutions-logo.webp"
          alt="The Elites Solutions"
          className="menu-trigger-logo"
        />
      </button>

      {/* Fullscreen Overlay */}
      <div
        id="fullscreen-menu"
        ref={overlayRef}
        className="fullscreen-menu-overlay"
        onMouseMove={handleMouseMove}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <FocusTrap
          active={isOpen}
          focusTrapOptions={{
            initialFocus: () => closeButtonRef.current || undefined,
            escapeDeactivates: false, // We handle Escape manually
            clickOutsideDeactivates: false,
            returnFocusOnDeactivate: true,
            allowOutsideClick: true,
          }}
        >
          <div>
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              className="menu-close-btn"
              onClick={handleClose}
              aria-label="Close menu"
            >
              Close
            </button>

            {/* Menu Content */}
            <div className="menu-content">
              <nav className="menu-nav" aria-label="Main navigation">
                {menuItems.map((item, index) => {
                  const isCurrentPage = pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href));

                  return (
                    <div
                      key={item.href}
                      ref={(el) => { menuItemsRef.current[index] = el; }}
                      className={`menu-link ${activeIndex === index ? "hover-active" : ""} ${isCurrentPage ? "current-page" : ""}`}
                      onMouseEnter={() => handleItemEnter(index)}
                      onMouseLeave={handleItemLeave}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavigation(item.href)}
                        className="menu-link-inner"
                        aria-current={isCurrentPage ? "page" : undefined}
                      >
                        <span className="menu-number">{item.number}</span>
                        <span className="menu-title">{item.title}</span>
                        {isCurrentPage && (
                          <span className="current-indicator" aria-hidden="true">
                            ●
                          </span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Image Preview Container - fixed position */}
            <div ref={imageContainerRef} className="image-preview-container" aria-hidden="true">
              <AnimatePresence mode="wait">
                {activeImage && (
                  <motion.div
                    key={activeImage.href}
                    className="image-preview"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Image
                      src={activeImage.image}
                      alt={activeImage.title}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Custom Cursor */}
            <div ref={cursorRef} className="menu-cursor" aria-hidden="true">
              <AnimatePresence>
                {activeIndex !== null && (
                  <motion.div
                    className="cursor-dot"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>View</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="menu-footer-info">
              <p className="footer-tagline">Custom Solutions for Modern Businesses</p>
              <p className="footer-cta">Transform Your Business with The Elites</p>
            </div>
          </div>
        </FocusTrap>
      </div>
    </div>
  );
};

export default FullscreenMenu;
