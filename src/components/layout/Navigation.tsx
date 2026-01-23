'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Navigation.module.css";

gsap.registerPlugin(useGSAP);

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<(HTMLLIElement | null)[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Detect scroll for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Initial mount animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Logo fade-in
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Links stagger reveal
    tl.fromTo(
      linksRef.current.filter(Boolean),
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
      "-=0.5"
    );

    // CTA fade-in
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6 },
      "-=0.4"
    );
  }, { scope: navRef });

  // Mobile menu animation
  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    if (isMenuOpen) {
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(
        mobileMenuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" });
        },
      });
    }
  }, { dependencies: [isMenuOpen], scope: navRef });

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.navigation} ${isScrolled ? styles.scrolled : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.navContainer}>
          {/* Logo */}
          <Link
            ref={logoRef}
            href="/"
            className={styles.logo}
            aria-label="The Elites Solutions - Home"
          >
            <img
              src="/images/logos/elites-solutions-logo.webp"
              alt="The Elites Solutions"
              className={styles.logoImage}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className={styles.navLinks}>
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                ref={(el) => { linksRef.current[index] = el; }}
                className={styles.navItem}
              >
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${
                    isActiveLink(link.href) ? styles.active : ""
                  }`}
                  aria-current={isActiveLink(link.href) ? "page" : undefined}
                >
                  {link.label}
                  {isActiveLink(link.href) && (
                    <motion.span
                      className={styles.activeIndicator}
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link
            ref={ctaRef}
            href="/contact"
            className={styles.ctaButton}
            aria-label="Get started with a consultation"
          >
            <span>Get Started</span>
            <svg
              className={styles.ctaArrow}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M1 8H15M15 8L8 1M15 8L8 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Mobile Hamburger Menu */}
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={styles.mobileMenu}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <nav className={styles.mobileNavLinks} aria-label="Mobile navigation">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: 50 }}
              animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
            >
              <Link
                href={link.href}
                className={`${styles.mobileNavLink} ${
                  isActiveLink(link.href) ? styles.mobileActive : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActiveLink(link.href) ? "page" : undefined}
              >
                <span className={styles.mobileNavNumber}>
                  {String(index).padStart(2, "0")}
                </span>
                <span className={styles.mobileNavLabel}>{link.label}</span>
              </Link>
            </motion.div>
          ))}

          {/* Mobile CTA */}
          <motion.div
            className={styles.mobileCta}
            initial={{ opacity: 0, y: 20 }}
            animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Link
              href="/contact"
              className={styles.mobileCtaButton}
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Footer */}
        <motion.div
          className={styles.mobileFooter}
          initial={{ opacity: 0 }}
          animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <p className={styles.mobileFooterText}>
            Custom Solutions for Modern Businesses
          </p>
        </motion.div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
