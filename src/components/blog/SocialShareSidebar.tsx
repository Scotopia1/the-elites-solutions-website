"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ShareButtons from "@/components/ui/ShareButtons";

interface SocialShareSidebarProps {
  title: string;
  url: string;
}

export default function SocialShareSidebar({
  title,
  url,
}: SocialShareSidebarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sidebar after scrolling 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.aside
      className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40"
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -20,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Share Label */}
        <p className="text-neutral-500 text-xs uppercase tracking-wider writing-mode-vertical rotate-180 mb-4">
          Share
        </p>

        {/* Share Buttons (Vertical) */}
        <ShareButtons
          url={url}
          title={title}
          variant="vertical"
          className="flex-col gap-3"
        />

        {/* Divider */}
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-neutral-700 to-transparent mt-4" />
      </div>
    </motion.aside>
  );
}
