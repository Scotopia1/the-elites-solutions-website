'use client';

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "./Menu.css";

import gsap from "gsap";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isDark?: boolean;
}

const Menu = ({ isOpen, setIsOpen, isDark }: MenuProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const menuColsRef = useRef<HTMLDivElement[]>([]);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const menuCloseRef = useRef<HTMLDivElement>(null);
  const menuFooterRef = useRef<HTMLDivElement>(null);
  const menuPatternRef = useRef<HTMLDivElement>(null);
  const menuBgRef = useRef<HTMLDivElement>(null);
  const menuLogoRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = setTimeout(() => {
      gsap.set(menuColsRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      });
      gsap.set(menuOverlayRef.current, {
        pointerEvents: "none",
      });
      gsap.set(
        [menuCloseRef.current, ...menuItemsRef.current, menuFooterRef.current],
        {
          opacity: 0,
        }
      );
      gsap.set(menuPatternRef.current, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      });
      gsap.set(menuBgRef.current, {
        xPercent: -10,
        opacity: 0,
      });
      setIsOpen(false);
    }, 750);

    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [pathname, setIsOpen]);

  const handleMenuOpen = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    timeline
      .to(menuColsRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        stagger: 0.125,
        ease: "power4.inOut",
      })
      .set(menuOverlayRef.current, {
        pointerEvents: "all",
      })
      .to(
        menuBgRef.current,
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        menuPatternRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power4.inOut",
        },
        "-=2"
      )

      .to(
        [menuCloseRef.current, ...menuItemsRef.current, menuFooterRef.current],
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.075,
          ease: "power2.out",
        },
        "-=1.5"
      );

    setIsOpen(true);
  };

  const handleMenuClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const timeline = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    timeline
      .to(
        [menuCloseRef.current, ...menuItemsRef.current, menuFooterRef.current],
        {
          opacity: 0,
          duration: 0.5,
          stagger: 0.075,
          ease: "power2.in",
        }
      )
      .set(menuOverlayRef.current, {
        pointerEvents: "none",
      })
      .to(
        menuPatternRef.current,
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: 1,
          ease: "power4.inOut",
        },
        "-=0.5"
      )
      .to(
        menuBgRef.current,
        {
          xPercent: -10,
          opacity: 0,
          duration: 1.2,
          ease: "power3.in",
        },
        "-=1"
      )
      .to(
        menuColsRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.125,
          ease: "power4.inOut",
        },
        "-=0.8"
      );

    setIsOpen(false);
  };

  // Gold glow pulse animation on homepage load
  useEffect(() => {
    if (menuLogoRef.current && pathname === "/en") {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(menuLogoRef.current, {
        filter: "drop-shadow(0 0 25px rgba(255, 215, 0, 0.8))",
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(menuLogoRef.current, {
        filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.4))",
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(menuLogoRef.current, {
        filter: "drop-shadow(0 0 25px rgba(255, 215, 0, 0.8))",
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(menuLogoRef.current, {
        filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.4))",
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(menuLogoRef.current, {
        filter: "drop-shadow(0 0 25px rgba(255, 215, 0, 0.8))",
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(menuLogoRef.current, {
        filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.4))",
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, [pathname]);

  const handleNavigation = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setTimeout(() => {
      router.push(to);
    }, 0);
  };

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !menuColsRef.current.includes(el)) {
      menuColsRef.current.push(el);
    }
  };

  const addToMenuItemsRef = (el: HTMLDivElement | null) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  return (
    <div className={`menu ${isDark ? "dark" : ""}`}>
      <div className="menu-bar">
        <div className="menu-logo" ref={menuLogoRef} onClick={handleMenuOpen}>
          <img
            src="/images/logos/elites-solutions-logo.webp"
            alt="The Elites Solutions - Menu"
          />
        </div>
      </div>

      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-col" ref={addToRefs}>
          <div className="menu-bg" ref={menuBgRef}>
            <img src="/images/menu/menu-bg.jpg" alt="" />
          </div>
          <div className="menu-pattern" ref={menuPatternRef}>
            <img src="/images/menu/menu-pattern.png" alt="" />
          </div>
        </div>
        <div className="menu-col" ref={addToRefs}>
          <div
            className="menu-close"
            ref={menuCloseRef}
            onClick={handleMenuClose}
          >
            <p>Close</p>
          </div>

          <div className="menu-items">
            <div className="menu-item" ref={addToMenuItemsRef}>
              <p>
                <Link href="/about" onClick={handleNavigation("/about")}>
                  About Us
                </Link>
              </p>
            </div>
            <div className="menu-item" ref={addToMenuItemsRef}>
              <p>
                <Link href="/services" onClick={handleNavigation("/services")}>
                  Services
                </Link>
              </p>
            </div>
            <div className="menu-item" ref={addToMenuItemsRef}>
              <p>
                <Link href="/work" onClick={handleNavigation("/work")}>
                  Work
                </Link>
              </p>
            </div>
            <div className="menu-item" ref={addToMenuItemsRef}>
              <p>
                <Link href="/contact" onClick={handleNavigation("/contact")}>
                  Contact
                </Link>
              </p>
            </div>
          </div>

          <div className="menu-footer" ref={menuFooterRef}>
            <p className="primary">Custom Solutions for Modern Businesses</p>
            <p>Transform Your Business with The Elites</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
