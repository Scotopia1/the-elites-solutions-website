"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import styles from "./CTASection.module.css";

interface CTAImage {
  src: string;
  alt: string;
}

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref: string;
  images: CTAImage[];
  logoSrc?: string;
  className?: string;
}

export function CTASection({
  title,
  description,
  buttonText = "Get Started",
  buttonHref,
  images,
  logoSrc,
  className = "",
}: CTASectionProps) {
  return (
    <section className={`${styles.ctaSection} ${className}`}>
      <div className={styles.container}>
        <ScrollReveal className={styles.content}>
          {logoSrc && (
            <div className={styles.logo}>
              <Image src={logoSrc} alt="The Elites" width={200} height={60} />
            </div>
          )}

          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}

          <Link href={buttonHref} className={styles.ctaButton}>
            {buttonText}
          </Link>
        </ScrollReveal>

        <div className={styles.imageGrid}>
          {images.slice(0, 6).map((image, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              className={styles.imageWrapper}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
