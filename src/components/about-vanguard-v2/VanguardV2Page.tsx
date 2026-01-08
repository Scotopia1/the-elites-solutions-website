"use client";

import { ReactLenis } from "lenis/react";
import { useLenisConfig } from "@/hooks/useLenisConfig";
import { VanguardHero } from "./VanguardHero";
import { AsymmetricalContent } from "./AsymmetricalContent";

export default function VanguardV2Page() {
  const lenisOptions = useLenisConfig();

  return (
    <ReactLenis root options={lenisOptions}>
      <div className="bg-black min-h-screen text-white selection:bg-gold-400 selection:text-black">
        <VanguardHero />
        <AsymmetricalContent />
        
        {/* Footer Placeholder */}
        <div className="h-[50vh] flex items-center justify-center border-t border-white/10">
           <h2 className="font-heading text-[10vw] text-white/10">THE ELITES</h2>
        </div>
      </div>
    </ReactLenis>
  );
}
