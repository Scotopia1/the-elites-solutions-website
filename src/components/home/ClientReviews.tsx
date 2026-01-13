/**
 * ClientReviews Component - Routine Section Design
 *
 * Horizontal scrolling testimonials with CGMWTNOV2025 routine section design.
 * Exact card structure matching routine blocks.
 *
 * Card Structure (matching CGMWTNOV2025):
 * - Header: Number (01) + Company name
 * - Center: Quote icon + Testimonial text (centered, replacing routine icon)
 * - Footer: Client name + Role/title
 *
 * Features:
 * - Beveled background container (clip-path polygon)
 * - Split header titles (Client / Reviews)
 * - Progress bar animation (scaleX based on scroll)
 * - Horizontal scroll cards (GSAP translateX)
 * - Dark cards (#303030) with routine layout
 * - Pinned section with 5x viewport height scroll distance
 *
 * Source: CGMWTNOV2025\orbit-matter\observatory - routine section
 */

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ClientReviews.module.css";

gsap.registerPlugin(ScrollTrigger);

const clientTestimonials = [
  {
    id: 1,
    copy: "The Elites transformed our outdated web presence into a modern, high-converting platform that tripled our lead generation in just 3 months. Their technical expertise and strategic approach exceeded all expectations.",
    author: "Sarah Mitchell",
    role: "CEO",
    company: "TechVision Solutions",
  },
  {
    id: 2,
    copy: "Working with The Elites was a game-changer for our brand. They didn't just build a website — they crafted a digital experience that authentically represents who we are and resonates with our audience.",
    author: "Marcus Chen",
    role: "Founder",
    company: "Apex Digital",
  },
  {
    id: 3,
    copy: "From concept to launch, The Elites demonstrated unparalleled professionalism and innovation. Their ability to blend cutting-edge design with flawless functionality resulted in a product that truly stands out.",
    author: "Elena Rodriguez",
    role: "CMO",
    company: "Quantum Innovations",
  },
  {
    id: 4,
    copy: "The Elites brought our vision to life with precision and creativity. Their seamless integration of complex systems and intuitive user experience design delivered results that exceeded our ambitious goals.",
    author: "David Park",
    role: "CTO",
    company: "NexGen Systems",
  },
  {
    id: 5,
    copy: "Partnering with The Elites elevated our entire digital strategy. Their deep understanding of both technology and business objectives resulted in a platform that drives real value and measurable growth.",
    author: "Jennifer Clarke",
    role: "VP of Operations",
    company: "Frontier Labs",
  },
  {
    id: 6,
    copy: "The Elites delivered excellence at every stage. Their commitment to quality, attention to detail, and ability to solve complex challenges made them an invaluable partner in our digital transformation journey.",
    author: "Michael Torres",
    role: "Director",
    company: "Summit Ventures",
  },
];

export default function ClientReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !sliderWrapperRef.current || !progressBarRef.current) return;

    const sliderWrapper = sliderWrapperRef.current;
    const progressBar = progressBarRef.current;
    const sliderContainer = sliderWrapper.parentElement;

    if (!sliderContainer) return;

    // Calculate maximum translateX distance
    function calculateMaxTranslate() {
      const containerWidth = sliderContainer.offsetWidth;
      const wrapperWidth = sliderWrapper.offsetWidth;
      return -(wrapperWidth - containerWidth);
    }

    // Calculate scroll distance based on content width
    function calculateScrollDistance() {
      const maxTranslate = Math.abs(calculateMaxTranslate());
      // Scale the scroll distance: more content = longer scroll
      // Using a 1:1 ratio so animation ends exactly when last card is reached
      return maxTranslate;
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${calculateScrollDistance()}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const maxTranslateX = calculateMaxTranslate();

        // Horizontal scroll animation
        gsap.set(sliderWrapper, { x: progress * maxTranslateX });

        // Progress bar animation
        gsap.set(progressBar, { scaleX: progress });
      },
    });

    return () => {
      trigger.kill();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.routine}>
      <div className={styles.routineContainer}>
        {/* Beveled Background */}
        <div className={styles.routineBg} />

        {/* Content Overlay */}
        <div className={styles.routineCopy}>
          <div className={styles.container}>
            {/* Header - Split Titles */}
            <div className={styles.routineHeader}>
              <h3>Client</h3>
              <h3>Reviews</h3>
            </div>

            {/* Progress Bar */}
            <div className={styles.routineProgressBar}>
              <div ref={progressBarRef} className={styles.routineProgress} />
            </div>

            {/* Horizontal Slider */}
            <div className={styles.routineSlider}>
              <div ref={sliderWrapperRef} className={styles.routineSliderWrapper}>
                {clientTestimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className={styles.routineBlock}>
                    {/* Card Header - Number + Company (matching routine structure) */}
                    <div className={styles.routineBlockHeader}>
                      <p>{String(index + 1).padStart(2, "0")}</p>
                      <p>{testimonial.company}</p>
                    </div>

                    {/* Card Center - Quote (replacing routine-icon position) */}
                    <div className={styles.routineQuote}>
                      {/* Quote Icon */}
                      <svg
                        className={styles.quoteIcon}
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 44C12 37.3726 17.3726 32 24 32V24C12.9543 24 4 32.9543 4 44C4 50.6274 9.37258 56 16 56H24V44H12Z"
                          fill="currentColor"
                        />
                        <path
                          d="M40 44C40 37.3726 45.3726 32 52 32V24C40.9543 24 32 32.9543 32 44C32 50.6274 37.3726 56 44 56H52V44H40Z"
                          fill="currentColor"
                        />
                      </svg>

                      {/* Testimonial Text */}
                      <p className={styles.testimonialText}>{testimonial.copy}</p>
                    </div>

                    {/* Card Footer - Client Name + Role (matching routine structure) */}
                    <div className={styles.routineBlockFooter}>
                      <h3>{testimonial.author}</h3>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
