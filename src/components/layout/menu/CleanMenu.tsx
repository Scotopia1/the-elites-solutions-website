'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa6';
import { useTransition } from '@/components/transitions';
import { useCleanMenuAnimation } from './useCleanMenuAnimation';
import './CleanMenu.css';

gsap.registerPlugin(useGSAP);

interface MenuItemData {
  number: string;
  title: string;
  href: string;
}

interface CleanMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems: MenuItemData[] = [
  { number: '00', title: 'Home', href: '/' },
  { number: '01', title: 'About', href: '/about' },
  { number: '02', title: 'Services', href: '/services' },
  { number: '03', title: 'Work', href: '/work' },
  { number: '04', title: 'Blog', href: '/blog' },
  { number: '05', title: 'Contact', href: '/contact' },
];

const CleanMenu: React.FC<CleanMenuProps> = ({ isOpen, setIsOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Hooks
  const router = useRouter();
  const pathname = usePathname();
  const { startTransition } = useTransition();
  const { openTimeline, closeTimeline } = useCleanMenuAnimation({
    overlay: overlayRef,
    menuItems: menuItemsRef,
    closeButton: closeButtonRef,
    footer: footerRef,
  });

  // Open handler
  const handleOpen = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsOpen(true);
    openTimeline().eventCallback('onComplete', () => setIsAnimating(false));
  }, [isAnimating, setIsOpen, openTimeline]);

  // Close handler
  const handleClose = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    closeTimeline().eventCallback('onComplete', () => {
      setIsAnimating(false);
      setIsOpen(false);
    });
  }, [isAnimating, setIsOpen, closeTimeline]);

  // Close on route change (PRESERVED from VanguardMenu)
  // Track previous pathname to detect actual route changes
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    // Only close if pathname actually changed (not on initial mount or isOpen change)
    if (prevPathnameRef.current !== pathname && isOpen) {
      handleClose();
    }
    prevPathnameRef.current = pathname;
  }, [pathname, isOpen, handleClose]);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  // Navigation with page transition (PRESERVED from VanguardMenu)
  // Wait for menu close animation before navigating
  const NAVIGATION_TRANSITION_DELAY = 600;
  const handleNavigation = useCallback(
    (href: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      handleClose();
      setTimeout(() => {
        startTransition(() => router.push(href));
      }, NAVIGATION_TRANSITION_DELAY);
    },
    [router, handleClose, startTransition]
  );

  return (
    <div className="clean-menu-wrapper">
      {/* Trigger - Logo (SAME position as VanguardMenu) */}
      <div
        ref={triggerRef}
        className="clean-menu-trigger"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label="Open menu"
        onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
      >
        <img
          src="/images/logos/elites-solutions-logo.webp"
          alt="The Elites Solutions"
          className="clean-trigger-logo"
        />
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="clean-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{ visibility: isOpen ? 'visible' : 'hidden' }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          className="clean-close-btn"
          onClick={handleClose}
          aria-label="Close menu"
        >
          <span className="close-icon">&times;</span>
        </button>

        {/* Menu Items */}
        <nav className="clean-menu-nav">
          <ul className="clean-menu-list">
            {menuItems.map((item, index) => (
              <li
                key={item.href}
                ref={(el) => {
                  menuItemsRef.current[index] = el;
                }}
                className="clean-menu-item"
              >
                <span className="item-number">{item.number}</span>
                <a
                  href={item.href}
                  onClick={handleNavigation(item.href)}
                  className="item-link"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div ref={footerRef} className="clean-menu-footer">
          <div className="footer-divider" />
          <div className="footer-content">
            <div className="footer-social">
              <a href="https://linkedin.com/company/the-elites-solutions" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com/theelitessolutions" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://facebook.com/theelitessolutions" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
            </div>
            <div className="footer-contact">hello@elites.com</div>
          </div>
          <div className="footer-copyright">&copy; {new Date().getFullYear()} The Elites Solutions</div>
        </div>
      </div>
    </div>
  );
};

export default CleanMenu;
