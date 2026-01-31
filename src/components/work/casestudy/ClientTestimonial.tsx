"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Quote } from "lucide-react";

interface ClientTestimonialProps {
  quote?: string;
  clientName?: string;
  clientRole?: string;
  clientAvatar?: string;
  companyLogo?: string;
  companyName?: string;
  // Alternative prop names
  author?: string;
  role?: string;
  company?: string;
  avatar?: string;
  logo?: string;
}

export default function ClientTestimonial({
  quote = "",
  clientName,
  clientRole,
  clientAvatar,
  companyLogo,
  companyName,
  // Accept alternative prop names
  author,
  role,
  company,
  avatar,
  logo,
}: ClientTestimonialProps) {
  // Normalize props - use either naming convention
  const name = clientName || author || "Client";
  const jobRole = clientRole || role || "";
  const companyLabel = companyName || company || "";
  const avatarUrl = clientAvatar || avatar;
  const logoUrl = companyLogo || logo;

  if (!quote) return null;
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-transparent overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 md:p-12 lg:p-16 rounded-2xl border border-white/10 bg-gradient-to-br from-[#FFD700]/5 via-[#111111] to-[#111111]"
        >
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="absolute -top-6 left-8 md:left-12 w-12 h-12 rounded-xl bg-[#FFD700] flex items-center justify-center"
          >
            <Quote className="w-6 h-6 text-[#0a0a0a]" />
          </motion.div>

          {/* Company Logo */}
          {logoUrl && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-6 right-8 md:right-12"
            >
              <Image
                src={logoUrl}
                alt={companyLabel}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-60"
              />
            </motion.div>
          )}

          {/* Quote Text */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 mb-10"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed">
              &ldquo;{quote}&rdquo;
            </p>
          </motion.blockquote>

          {/* Client Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-4"
          >
            {/* Avatar */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#FFD700]/30">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 flex items-center justify-center">
                  <span className="text-[#FFD700] text-xl font-bold">
                    {name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Name & Role */}
            <div>
              <p className="text-white font-semibold text-lg">{name}</p>
              <p className="text-white/60 text-sm">
                {jobRole}{jobRole && companyLabel ? " at " : ""}
                {companyLabel && <span className="text-[#FFD700]">{companyLabel}</span>}
              </p>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl -z-10" />
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#FFD700]/3 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
