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
  // Helper to check if icon is a file path or emoji
  const isIconPath = (icon: string) => icon.startsWith('/') || icon.startsWith('http');

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
            <div className={styles.content}>
              {service.icon && (
                <div className={styles.icon}>
                  {isIconPath(service.icon) ? (
                    <Image
                      src={service.icon}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.iconImage}
                    />
                  ) : (
                    <span>{service.icon}</span>
                  )}
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
