"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import styles from "./ServicesGrid.module.css";

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  href: string;
}

interface ServicesGridProps {
  services: Service[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ServicesGrid({
  services,
  columns = 3,
  className = "",
}: ServicesGridProps) {
  return (
    <div className={`${styles.servicesGrid} ${styles[`cols${columns}`]} ${className}`}>
      {services.map((service, index) => (
        <ScrollReveal
          key={service.id}
          delay={index * 0.1}
          direction="up"
          className={styles.serviceCardWrapper}
        >
          <Link href={service.href} className={styles.serviceCard}>
            {service.image && (
              <div className={styles.imageWrapper}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.overlay} />
              </div>
            )}

            <div className={styles.content}>
              {service.icon && (
                <div className={styles.icon}>
                  <span>{service.icon}</span>
                </div>
              )}

              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>

              <div className={styles.arrow}>→</div>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  );
}
