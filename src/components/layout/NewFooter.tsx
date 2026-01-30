/**
 * NewFooter Component
 *
 * Footer with CGMWTNOV2025 (Orbit Matter) design - exact structure match.
 *
 * Features:
 * - Clip-path beveled container (same as hero)
 * - Gooey filter effect
 * - Two-row layout: Newsletter + Description | Credits + Logo
 * - Text-based social links in brackets
 * - Simple input + button form
 *
 * Source: CGMWTNOV2025 (Orbit Matter) project - Exact port
 */

"use client";

import styles from "./NewFooter.module.css";
import { GooeyFilter } from "@/components/shared/GooeyFilter";

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
];

export function NewFooter() {
  return (
    <>
      <GooeyFilter />
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          {/* Background with Clip-Path */}
          <div className={styles.footerBgContainer} />

          {/* Content Overlay */}
          <div className={styles.footerContent}>
            {/* Row 1: Newsletter Form + Description */}
            <div className={styles.footerContentMeta}>
              <div className={styles.footerContentCol}>
                <h3>Ready to elevate your digital presence?</h3>

                <div className={styles.footerForm}>
                  <input type="text" placeholder="Your Email Address" />

                  <div className="btn">
                    <a href="/contact" className="btn">
                      <span className="btn-line"></span>
                      Get Started
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.footerContentCol}>
                <p className="bodyCopy">
                  The Elites Solutions is a premier digital agency devoted to
                  crafting exceptional experiences. Every project is engineered
                  with precision, creativity, and a commitment to excellence
                  that sets us apart.
                </p>

                <div className={styles.footerSocials}>
                  {socialLinks.map((social) => (
                    <div key={social.label} className={styles.footerSocial}>
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        [ {social.label} ]
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 2: Credits + Logo */}
            <div className={styles.footerContentMeta}>
              <div className={styles.footerContentCol}>
                <p>[ Crafted with Excellence ]</p>
                <p>[ © 2025 The Elites Solutions ]</p>
              </div>

              <div className={styles.footerContentCol}>
                <h1>THE ELITES SOLUTIONS&copy;</h1>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
