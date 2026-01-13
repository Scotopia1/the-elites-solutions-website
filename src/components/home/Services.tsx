/**
 * Services Component
 *
 * Vertical card grid layout from CGMWTNOV2025 featured-missions section.
 * Single-column centered cards with images.
 *
 * Features:
 * - Full-screen header with large title (pinned on scroll)
 * - Cards scroll over the pinned header
 * - Centered single column (40% width on desktop, 100% on mobile)
 * - Card structure: number → title → image → category
 * - Hover effects: scale and border glow
 * - Scroll animations with Framer Motion
 * - Responsive: width and gap adjustments
 * - Light beige cards with dark text and gold accents
 *
 * Source: CGMWTNOV2025\orbit-matter - featured-missions section
 */

"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { servicesData } from "./servicesData";
import styles from "./Services.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  service: typeof servicesData[0];
  onNavigate: (slug: string) => void;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onNavigate, index }) => {
  return (
    <motion.div
      className={styles.serviceCard}
      onClick={() => onNavigate(service.slug)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      {/* Number */}
      <p>{service.number}</p>

      {/* Title */}
      <h3>{service.title}</h3>

      {/* Image Container */}
      <div className={styles.serviceImage}>
        <img
          src={service.image}
          alt={service.title}
          onError={(e) => {
            // Hide image if it fails to load (use gradient background)
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Category */}
      <p className={styles.serviceCategory}>{service.category}</p>
    </motion.div>
  );
};

export default function Services() {
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!headerRef.current || !cardsRef.current) return;

    const header = headerRef.current;
    const cards = cardsRef.current;

    // Pin the header section
    const pinTrigger = ScrollTrigger.create({
      trigger: header,
      start: "top top",
      end: () => `+=${cards.offsetHeight}`,
      pin: true,
      pinSpacing: false,
      scrub: true,
      invalidateOnRefresh: true,
    });

    return () => {
      pinTrigger.kill();
    };
  }, { scope: headerRef });

  const handleNavigate = (slug: string) => {
    router.push(`/services/${slug}`);
  };

  return (
    <>
      {/* Full-screen Header - Pinned */}
      <motion.section
        ref={headerRef}
        className={styles.servicesHeader}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>
          Our<br />Services
        </h1>
      </motion.section>

      {/* Services Cards - Scroll over header */}
      <section ref={cardsRef} className={styles.services}>
        <div className={styles.servicesList}>
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              onNavigate={handleNavigate}
              index={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
