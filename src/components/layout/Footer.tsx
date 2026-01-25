"use client";
import "./Footer.css";
import { motion } from "motion/react";
import { TransitionLink } from "@/components/transitions";
import { FaLinkedinIn, FaInstagram, FaXTwitter, FaGithub } from "react-icons/fa6";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

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

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/work", label: "Our Work" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
];

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://twitter.com", label: "Twitter", Icon: FaXTwitter },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://github.com", label: "GitHub", Icon: FaGithub },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
];

export function Footer() {
  return (
    <footer className="heritage-footer">
      <div className="footer-frame">
        <div className="footer-frame-inner">
          {/* Multi-column layout: Brand | Services | Company | Resources */}
          <div className="footer-columns">
            {/* Brand Column */}
            <div className="footer-column footer-brand-col">
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

            {/* Services Column */}
            <div className="footer-column">
              <h4 className="footer-column-title">Services</h4>
              <ul className="footer-column-list">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <TransitionLink href={link.href} className="footer-link">
                        <span className="link-arrow">→</span>
                        <span className="link-text">{link.label}</span>
                      </TransitionLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="footer-column">
              <h4 className="footer-column-title">Company</h4>
              <ul className="footer-column-list">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <TransitionLink href={link.href} className="footer-link">
                        <span className="link-arrow">→</span>
                        <span className="link-text">{link.label}</span>
                      </TransitionLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources + Newsletter Column */}
            <div className="footer-column footer-resources-col">
              <h4 className="footer-column-title">Resources</h4>
              <ul className="footer-column-list">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <TransitionLink href={link.href} className="footer-link">
                        <span className="link-arrow">→</span>
                        <span className="link-text">{link.label}</span>
                      </TransitionLink>
                    </motion.div>
                  </li>
                ))}
              </ul>
              
              {/* Newsletter in Resources Column */}
              <div className="footer-newsletter-compact">
                <h5>Stay Updated</h5>
                <p>Get insights delivered to your inbox</p>
                <NewsletterForm variant="simple" />
              </div>
            </div>
          </div>

          {/* Social Links - Centered */}
          <div className="footer-social-section">
            <div className="footer-social">
              {socialLinks.map((social) => {
                const Icon = social.Icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`Visit our ${social.label} page (opens in new tab)`}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Icon className="social-icon-svg" size={24} aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Legal Links */}
          <div className="footer-legal">
            <div className="legal-links">
              {legalLinks.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="legal-link"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>© 2025 The Elites Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}