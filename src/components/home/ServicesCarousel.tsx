/**
 * ServicesCarousel Component - PrototypeStudio Scroll Animation
 *
 * Adapted from codegrid-prototypestudio-scroll-animation
 * Vertical pinned carousel with synchronized animations:
 * - Dynamic counter (01/06 → 06/06)
 * - Image stack with opacity transitions
 * - Service names that slide up and change color
 *
 * Features:
 * - GSAP ScrollTrigger for pinning and progress tracking
 * - Optimized timing: 70vh per service (420vh total) for snappy transitions
 * - Reuses existing Lenis smooth scroll from ReactLenis wrapper
 * - TypeScript + React conversion from vanilla JS
 * - Responsive design with mobile fallback
 */

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { servicesData } from "./servicesData";
import styles from "./ServicesCarousel.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesCarousel() {
  const containerRef = useRef<HTMLElement>(null);
  const projectIndexRef = useRef<HTMLHeadingElement>(null);
  const projectImagesContainerRef = useRef<HTMLDivElement>(null);
  const projectNamesContainerRef = useRef<HTMLDivElement>(null);
  const projectImgsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectNamesRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;
    if (!projectIndexRef.current) return;
    if (!projectImagesContainerRef.current) return;
    if (!projectNamesContainerRef.current) return;

    const spotlightSection = containerRef.current;
    const projectIndex = projectIndexRef.current;
    const projectImgs = projectImgsRefs.current.filter((ref): ref is HTMLDivElement => ref !== null);
    const projectImagesContainer = projectImagesContainerRef.current;
    const projectNames = projectNamesRefs.current.filter((ref): ref is HTMLParagraphElement => ref !== null);
    const projectNamesContainer = projectNamesContainerRef.current;
    const totalProjectCount = servicesData.length;

    const spotlightSectionHeight = spotlightSection.offsetHeight;
    const spotlightSectionPadding = parseFloat(
      getComputedStyle(spotlightSection).padding
    );
    const projectIndexHeight = projectIndex.offsetHeight;
    const containerHeight = projectNamesContainer.offsetHeight;
    const imagesHeight = projectImagesContainer.offsetHeight;

    const moveDistanceIndex =
      spotlightSectionHeight - spotlightSectionPadding * 2 - projectIndexHeight;
    const moveDistanceNames =
      spotlightSectionHeight - spotlightSectionPadding * 2 - containerHeight;
    const moveDistanceImages = window.innerHeight - imagesHeight;

    const imgActivationThreshold = window.innerHeight / 2;

    ScrollTrigger.create({
      trigger: spotlightSection,
      start: "top top",
      end: `+=${window.innerHeight * totalProjectCount * 0.7}px`, // 70vh per service (420vh total for 6 services)
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      refreshPriority: -1,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentIndex = Math.min(
          Math.floor(progress * totalProjectCount) + 1,
          totalProjectCount
        );

        // Update counter text
        projectIndex.textContent = `${String(currentIndex).padStart(
          2,
          "0"
        )}/${String(totalProjectCount).padStart(2, "0")}`;

        // Move counter down
        gsap.set(projectIndex, {
          y: progress * moveDistanceIndex,
        });

        // Move images container up
        gsap.set(projectImagesContainer, {
          y: progress * moveDistanceImages,
        });

        // Image opacity based on viewport position
        projectImgs.forEach((img) => {
          const imgRect = img.getBoundingClientRect();
          const imgTop = imgRect.top;
          const imgBottom = imgRect.bottom;

          if (
            imgTop <= imgActivationThreshold &&
            imgBottom >= imgActivationThreshold
          ) {
            gsap.set(img, { opacity: 1 });
          } else {
            gsap.set(img, { opacity: 0.5 });
          }
        });

        // Service names position and color
        projectNames.forEach((p, index) => {
          const startProgress = index / totalProjectCount;
          const endProgress = (index + 1) / totalProjectCount;
          const projectProgress = Math.max(
            0,
            Math.min(
              1,
              (progress - startProgress) / (endProgress - startProgress)
            )
          );

          gsap.set(p, {
            y: -projectProgress * moveDistanceNames,
          });

          if (projectProgress > 0 && projectProgress < 1) {
            gsap.set(p, { color: "#fff" });
          } else {
            gsap.set(p, { color: "#4a4a4a" });
          }
        });
      },
    });

    // Refresh on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, { scope: containerRef, dependencies: [] });

  return (
    <>
      {/* Intro Section */}
      <section className={styles.intro}>
        <h1>OUR SERVICES</h1>
      </section>

      {/* Spotlight Carousel Section */}
      <section ref={containerRef} className={styles.spotlight}>
        {/* Project Counter */}
        <div className={styles.projectIndex}>
          <h1 ref={projectIndexRef}>01/{String(servicesData.length).padStart(2, "0")}</h1>
        </div>

        {/* Image Stack */}
        <div ref={projectImagesContainerRef} className={styles.projectImages}>
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                projectImgsRefs.current[index] = el;
              }}
              className={styles.projectImg}
            >
              <img
                src={service.image}
                alt={service.title}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>

        {/* Service Names */}
        <div ref={projectNamesContainerRef} className={styles.projectNames}>
          {servicesData.map((service, index) => (
            <p
              key={service.id}
              ref={(el) => {
                projectNamesRefs.current[index] = el;
              }}
            >
              {service.title}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
