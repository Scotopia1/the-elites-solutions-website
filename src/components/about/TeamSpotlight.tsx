"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Leadership",
    role: "Vision & Strategy",
    quote: "Excellence is not a destination, it's a continuous journey.",
    initials: "TE",
    color: "#d4af37",
    bio: "Driving the strategic vision of The Elites, ensuring every project aligns with our core mission of digital excellence.",
    social: ["LinkedIn", "Twitter"]
  },
  {
    id: 2,
    name: "Design Team",
    role: "Creative Direction",
    quote: "Every pixel tells a story. We make sure it's a compelling one.",
    initials: "DT",
    color: "#c0a030",
    bio: "Crafting immersive visual experiences that captivate audiences and elevate brand identities through pixel-perfect design.",
    social: ["Dribbble", "Behance"]
  },
  {
    id: 3,
    name: "Development",
    role: "Technical Excellence",
    quote: "Clean code, scalable solutions, exceptional performance.",
    initials: "DV",
    color: "#a89028",
    bio: "Architecting robust, scalable digital solutions using cutting-edge technologies to ensure flawless performance.",
    social: ["GitHub", "StackOverflow"]
  },
  {
    id: 4,
    name: "Strategy",
    role: "Growth & Innovation",
    quote: "Data-driven decisions, human-centered results.",
    initials: "ST",
    color: "#907820",
    bio: "Analyzing market trends and user behavior to create data-driven strategies that guarantee measurable growth.",
    social: ["LinkedIn", "Medium"]
  },
];

export default function TeamSpotlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-24 px-4 bg-black flex flex-col items-center">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans text-sm uppercase tracking-[0.3em] text-gold-400 block mb-4">The People</span>
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">Meet The Team</h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            A collective of passionate experts dedicated to your success
          </p>
        </motion.div>

        {/* Team Grid - Card Flip Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group h-[450px] w-full perspective-[1000px]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Card Inner Container */}
              <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180 shadow-xl">
                
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-dark-200/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8">
                  {/* Avatar/Placeholder */}
                  <div className="w-32 h-32 rounded-full border-2 border-gold-400 flex items-center justify-center bg-black/50 mb-8 shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-shadow duration-500">
                    <span className="font-serif text-4xl text-gold-400">{member.initials}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-2 text-center">{member.name}</h3>
                  <span className="font-sans text-xs uppercase tracking-widest text-gold-400 text-center">{member.role}</span>
                  
                  {/* Decorative bottom bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gold-500/10 backdrop-blur-xl border border-gold-400/30 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="font-serif text-xl font-bold text-white mb-4">{member.name}</h3>
                  <p className="font-serif italic text-white/80 mb-6 text-sm leading-relaxed">"{member.quote}"</p>
                  <p className="font-sans text-sm text-white/60 mb-8">{member.bio}</p>
                  
                  <div className="flex gap-4">
                    {member.social.map((platform) => (
                      <span key={platform} className="text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-white cursor-pointer transition-colors">
                        {platform}
                      </span>
                    ))}
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-gold-400/50" />
                  <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-gold-400/50" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-gold-400/50" />
                  <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-gold-400/50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(212,175,55,0.05)_0%,transparent_60%)]" />
    </section>
  );
}
