'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const clientTestimonials = [
  {
    id: 1,
    copy: "The Elites transformed our outdated web presence into a modern, high-converting platform that tripled our lead generation in just 3 months. Their technical expertise and strategic approach exceeded all expectations.",
    author: "Sarah Mitchell",
    role: "CEO, TechVision Solutions",
  },
  {
    id: 2,
    copy: "Working with The Elites was a game-changer for our brand. They didn't just build a website — they crafted a digital experience that authentically represents who we are and resonates with our audience.",
    author: "Marcus Chen",
    role: "Founder, Apex Digital",
  },
  {
    id: 3,
    copy: "From concept to launch, The Elites demonstrated unparalleled professionalism and innovation. Their ability to blend cutting-edge design with flawless functionality resulted in a product that truly stands out.",
    author: "Elena Rodriguez",
    role: "CMO, Quantum Innovations",
  },
];

export default function ClientReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const progressBar = progressBarRef.current;

      if (!wrapper || !progressBar || !sectionRef.current) return;

      const calculateDimensions = () => {
        const wrapperWidth = wrapper.offsetWidth;
        const viewportWidth = window.innerWidth;
        return -(wrapperWidth - viewportWidth);
      };

      let moveDistance = calculateDimensions();

      // iOS/Safari detection for optimized scrub value
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 5}px`,
        pin: true,
        pinSpacing: true,
        scrub: isSafari && isIOS ? 0.5 : 1,
        invalidateOnRefresh: true,
        refreshPriority: -2,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentTranslateX = progress * moveDistance;

          gsap.set(wrapper, {
            x: currentTranslateX,
            force3D: true,
            transformOrigin: 'left center',
          });

          if (progressBar) {
            gsap.set(progressBar, { width: `${progress * 100}%` });
          }
        },
        onRefresh: () => {
          moveDistance = calculateDimensions();
        },
      });

      // Resize handler
      const handleResize = () => {
        moveDistance = calculateDimensions();
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      // iOS viewport height fix
      const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };

      setVH();
      window.addEventListener('resize', setVH);
      window.addEventListener('orientationchange', setVH);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('resize', setVH);
        window.removeEventListener('orientationchange', setVH);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden flex items-center bg-transparent text-white py-20">
      {/* Decorative Top Bar */}
      <div className="absolute top-0 left-0 w-full h-24 z-10 pointer-events-none flex items-start justify-center">
        <div className="w-full max-w-[90%] h-[1px] bg-white/20 relative mt-10">
           <div className="absolute top-0 left-0 h-full w-[100px] bg-gold-400/50" />
        </div>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div ref={wrapperRef} className="flex gap-[5vw] pl-[10vw] items-center w-max will-change-transform">
        {clientTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="w-[85vw] md:w-[60vw] lg:w-[40vw] max-w-[600px] flex-shrink-0 relative p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg">
            <div className="relative z-10 flex flex-col gap-8">
              <div className="text-gold-400 opacity-20">
                <svg
                  width="64"
                  height="64"
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
              </div>

              <div className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed text-white/90">
                <p>"{testimonial.copy}"</p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h4 className="font-sans font-bold uppercase tracking-widest text-gold-400 text-sm md:text-base">{testimonial.author}</h4>
                <p className="font-mono text-white/50 text-xs md:text-sm mt-1">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-white/10 rounded-full overflow-hidden">
        <div ref={progressBarRef} className="h-full bg-gold-400 w-0" />
      </div>
      
      {/* Decorative Ticks underneath progress bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] flex justify-between opacity-30">
         {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-[1px] h-2 bg-white" />
         ))}
      </div>

      {/* Decorative Bottom Bar */}
       <div className="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none flex items-end justify-center">
        <div className="w-full max-w-[90%] h-[1px] bg-white/20 relative mb-10">
           <div className="absolute top-0 right-0 h-full w-[100px] bg-gold-400/50" />
        </div>
      </div>
    </section>
  );
}
