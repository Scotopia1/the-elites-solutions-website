"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

interface PricingTier {
  tier: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingTiersProps {
  pricing: PricingTier[];
}

export default function PricingTiers({ pricing }: PricingTiersProps) {
  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-black to-neutral-950">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
          Pricing
        </h2>
        <p className="text-center text-neutral-400 mb-16">
          Transparent pricing for every business size
        </p>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((tier, index) => (
            <PricingCard key={index} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`relative bg-neutral-900/50 backdrop-blur-sm border ${
        tier.highlighted
          ? "border-gold-400/40 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          : "border-gold-400/20"
      } rounded-xl p-8 perspective-1000`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Highlighted badge */}
      {tier.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-400 to-gold-600 text-black px-4 py-1 rounded-full text-sm font-bold">
          Most Popular
        </div>
      )}

      {/* Tier name */}
      <h3 className="text-2xl font-bold text-white mb-2">{tier.tier}</h3>

      {/* Description */}
      <p className="text-neutral-400 text-sm mb-4">{tier.description}</p>

      {/* Price */}
      <div className="mb-6">
        <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
          {tier.price}
        </span>
        {tier.price !== "Custom" && (
          <span className="text-neutral-500 ml-2">/ project</span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-neutral-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <MagneticButton
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          tier.highlighted
            ? "bg-gradient-to-r from-gold-400 to-gold-600 text-black hover:shadow-lg"
            : "bg-neutral-800 text-white hover:bg-neutral-700"
        }`}
        onClick={() => {
          // Handle CTA click - e.g., scroll to contact form or open modal
          console.log(`Selected ${tier.tier} tier`);
        }}
      >
        Get Started
      </MagneticButton>
    </motion.div>
  );
}
