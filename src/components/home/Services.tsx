"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardsData, indicesData } from "./servicesData";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const indicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const header = headerRef.current;
    const progress = progressRef.current;
    const indices = indicesRef.current;

    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Calculate total scroll distance based on number of cards
      const cardCount = cards.length;
      const scrollPerCard = window.innerHeight;
      const totalScroll = scrollPerCard * (cardCount + 1);

      // Create the main ScrollTrigger for the pinned section
      const mainTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Animate header opacity (fade out as first card comes in)
          if (header) {
            const headerOpacity = Math.max(0, 1 - progress * 4);
            gsap.set(header, { opacity: headerOpacity });
          }

          // Animate progress bar
          if (progressRef.current) {
            const progressBar = progressRef.current.querySelector('.progress');
            if (progressBar) {
              gsap.set(progressBar, { height: `${progress * 100}%` });
            }
          }

          // Animate each card
          cards.forEach((card, index) => {
            // Calculate when this card should animate
            const cardStartProgress = index / (cardCount + 1);
            const cardEndProgress = (index + 1) / (cardCount + 1);
            const cardProgress = gsap.utils.clamp(
              0,
              1,
              (progress - cardStartProgress) / (cardEndProgress - cardStartProgress)
            );

            // Card enters from bottom (150% to 50%)
            const topPercent = 150 - cardProgress * 100;

            // Cards shrink as next card comes in
            const nextCardProgress = gsap.utils.clamp(
              0,
              1,
              (progress - cardEndProgress) / ((cardEndProgress + 1 / (cardCount + 1)) - cardEndProgress)
            );
            const scale = 1 - nextCardProgress * 0.15;

            // Alternating rotation for visual interest
            const rotationDirection = index % 2 === 0 ? 1 : -1;
            const rotation = nextCardProgress * 5 * rotationDirection;

            // Dark overlay as card gets "pushed back"
            const overlayOpacity = nextCardProgress * 0.6;

            gsap.set(card, {
              top: `${topPercent}%`,
              scale,
              rotation,
              '--after-opacity': overlayOpacity,
            });
          });

          // Animate indices
          if (indices) {
            gsap.set(indices, { opacity: progress > 0.05 ? 1 : 0 });

            const indexElements = indices.querySelectorAll('.index');
            indexElements.forEach((el, index) => {
              const isActive = progress >= (index / cardCount) && progress < ((index + 1) / cardCount);
              gsap.set(el, { opacity: isActive ? 1 : 0.25 });
            });
          }
        },
      });

      // Fade in progress bar and indices
      gsap.set([progressRef.current, indices], { opacity: 0 });

      return () => {
        mainTrigger.kill();
      };
    }, section);

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-transparent overflow-hidden">
      {/* Sticky Header - "Services" Title */}
      <div ref={headerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 z-0">
        <h1 
          className="text-[15vw] md:text-[18vw] lg:text-[20vw] font-light uppercase text-center leading-none bg-clip-text text-transparent"
          style={{ backgroundImage: "url('/textures/Gold.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          Services
        </h1>
      </div>

      {/* Service Cards */}
      {cardsData.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="absolute top-[150%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center 
            bg-dark-100/20 backdrop-blur-md border border-gold-400/20 rounded-2xl shadow-2xl
            w-[85%] h-[60%] md:w-[65%] md:h-[55%] lg:w-[45%] lg:h-[52%] xl:max-w-[800px]
            overflow-visible"
          style={{ zIndex: index + 1 }}
        >
          {/* Card Content */}
          <div className="flex flex-col gap-2 md:gap-4 text-center relative z-10 px-4 md:px-12 w-full">
            <p 
              className="text-xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent break-words"
              style={{ backgroundImage: "url('/textures/Gold.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {card.date}
            </p>
            <h1 
              className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent break-words hyphens-auto"
              style={{ backgroundImage: "url('/textures/Gold.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {card.title}
              <span> {card.span}</span>
            </h1>
          </div>

          {/* Dark Overlay for depth effect (controlled by GSAP) */}
          <div 
            className="absolute inset-0 bg-black rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{ opacity: 'var(--after-opacity, 0)' }}
          />
        </div>
      ))}

      {/* Progress Bar - Hidden on mobile */}
      <div ref={progressRef} className="hidden md:block absolute top-0 right-0 w-2 h-full opacity-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="progress w-full h-0 bg-neutral-700" />
      </div>

      {/* Indices - Hidden on mobile */}
      <div ref={indicesRef} className="hidden md:flex absolute top-0 right-6 h-full flex-col justify-center gap-16 opacity-0">
        {indicesData.map((item) => (
          <div key={item.id} id={item.id} className="index text-right opacity-25">
            <p className="line-through uppercase text-sm font-mono text-gold-400">{item.date}</p>
            <p className="line-through uppercase text-lg font-bold text-neutral-400">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
