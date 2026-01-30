"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollTriggerScrub } from "@/lib/gsap-config";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ProjectHeroImageProps {
  image: string;
  title: string;
  category: string;
}

export default function ProjectHeroImage({
  image,
  title,
  category,
}: ProjectHeroImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const imageEl = imageRef.current;

      if (!container || !imageEl) return;

      // Parallax effect on hero image
      gsap.to(imageEl, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: getScrollTriggerScrub(1),
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] md:h-screen overflow-hidden"
    >
      {/* Parallax Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {/* Placeholder gradient - replace with actual image */}
        <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black" />
        {/* Uncomment when images are available:
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        */}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold-400 text-sm md:text-base uppercase tracking-widest mb-2 md:mb-4">
            {category}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
