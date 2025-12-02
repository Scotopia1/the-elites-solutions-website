"use client";
import './CTA.css';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-box">
          {/* Decorative Elements */}
          <div className="cta-decorative-top" />
          <div className="cta-decorative-bottom" />

          {/* Content */}
          <div className="cta-content">
            <div className="cta-badge">
              <MessageSquare />
              <span>Let's Build Something Amazing</span>
            </div>

            <h2 className="cta-title">
              Ready to Transform Your Business?
            </h2>

            <p className="cta-description">
              Get in touch with our team to discuss your project. We'll help you find the perfect solution for your business needs.
            </p>

            <div className="cta-buttons">
              <Link href="/contact" className="cta-button-primary">
                Start Your Project
                <ArrowRight size={20} />
              </Link>
              <Link href="/services" className="cta-button-secondary">
                Explore Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="cta-trust-indicators">
              <div className="cta-trust-item">
                <div className="cta-trust-dot" />
                <span>Free Consultation</span>
              </div>
              <div className="cta-trust-item">
                <div className="cta-trust-dot" />
                <span>No Commitment Required</span>
              </div>
              <div className="cta-trust-item">
                <div className="cta-trust-dot" />
                <span>Fast Response Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
