"use client";

import Accordion from "@/components/ui/Accordion";
import MagneticButton from "@/components/ui/MagneticButton";
import { useRouter } from "next/navigation";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faq: FAQItem[];
  serviceName: string;
}

export default function ServiceFAQ({ faq, serviceName }: ServiceFAQProps) {
  const router = useRouter();

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-neutral-950 to-black">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-neutral-400 mb-12">
          Everything you need to know about {serviceName}
        </p>

        {/* FAQ Accordion */}
        <Accordion items={faq} className="mb-16" />

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-neutral-900/50 to-neutral-800/50 border border-gold-400/20 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
            Let's bring your vision to life. Schedule a free consultation to
            discuss your project and see how we can help.
          </p>

          <MagneticButton
            className="bg-gradient-to-r from-gold-400 to-gold-600 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow"
            onClick={() => router.push("/contact")}
            magneticStrength={0.4}
          >
            Schedule Free Consultation
          </MagneticButton>

          <p className="text-neutral-500 text-sm mt-4">
            No commitment required • 30-minute strategy call
          </p>
        </div>
      </div>
    </section>
  );
}
