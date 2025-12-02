"use client";
import "./Footer.css";
import Link from "next/link";
import { motion } from "framer-motion";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/work", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Get In Touch" },
];

const serviceLinks = [
  { href: "/services#web", label: "Web Development" },
  { href: "/services#mobile", label: "Mobile Apps" },
  { href: "/services#software", label: "Custom Software" },
  { href: "/services#automation", label: "Process Automation" },
];

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: "in" },
  { href: "https://instagram.com", label: "Instagram", icon: "ig" },
  { href: "https://twitter.com", label: "Twitter", icon: "x" },
  { href: "https://dribbble.com", label: "Dribbble", icon: "dr" },
];

export function Footer() {
  return (
    <footer className="heritage-footer">
      {/* Main Framed Content */}
      <div className="footer-frame">
        <div className="footer-frame-inner">
          {/* Top Section: Logo + Tagline | Navigation Columns */}
          <div className="footer-main">
            {/* Left: Logo & Tagline */}
            <div className="footer-brand">
              <motion.div
                className="footer-logo"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img src="/logos/logo.png" alt="The Elites Solutions" />
              </motion.div>
              <div className="footer-tagline">
                <h3>THE ELITES SOLUTIONS</h3>
                <div className="tagline-divider"></div>
                <p>Where elite craftsmanship meets cutting-edge technology</p>
              </div>
            </div>

            {/* Right: Navigation Columns */}
            <div className="footer-nav-grid">
              {/* Navigation Column */}
              <div className="footer-nav-col">
                <h4 className="footer-nav-title">Navigation</h4>
                <ul className="footer-nav-list">
                  {navigationLinks.map((link) => (
                    <li key={link.href}>
                      <motion.div
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Link href={link.href} className="footer-nav-link">
                          <span className="link-arrow">→</span>
                          <span className="link-text">{link.label}</span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Column */}
              <div className="footer-nav-col">
                <h4 className="footer-nav-title">Services</h4>
                <ul className="footer-nav-list">
                  {serviceLinks.map((link) => (
                    <li key={link.href}>
                      <motion.div
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Link href={link.href} className="footer-nav-link">
                          <span className="link-arrow">→</span>
                          <span className="link-text">{link.label}</span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Column */}
              <div className="footer-nav-col">
                <h4 className="footer-nav-title">Get In Touch</h4>
                <ul className="footer-nav-list contact-list">
                  <li>
                    <motion.a
                      href="mailto:contact@theelites.com"
                      className="footer-contact-link"
                      whileHover={{ x: 8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <span className="link-arrow">→</span>
                      <span className="link-text">Schedule a Call</span>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="mailto:contact@theelites.com"
                      className="footer-contact-link"
                      whileHover={{ x: 8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <span className="link-arrow">→</span>
                      <span className="link-text">Email Us</span>
                    </motion.a>
                  </li>
                  <li>
                    <motion.a
                      href="/contact"
                      className="footer-contact-link"
                      whileHover={{ x: 8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <span className="link-arrow">→</span>
                      <span className="link-text">Visit Office</span>
                    </motion.a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info Bar */}
          <div className="footer-contact-bar">
            <div className="contact-item">
              <span className="contact-icon">✉</span>
              <span>contact@theelites.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">◎</span>
              <span>Global</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✆</span>
              <span>Available 24/7</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="footer-social">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-label">{social.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Copyright - Inside Frame */}
          <div className="footer-copyright-inner">
            <p>© 2025 The Elites Solutions</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
