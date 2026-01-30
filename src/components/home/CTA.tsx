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
              <span>15 Years. 50+ Projects. $2M+ Generated.</span>
            </div>

            <h2 className="cta-title">
              Your Turn.
            </h2>

            <p className="cta-description">
              Free consultation. Real recommendations. No sales games.
            </p>

            <div className="cta-buttons">
              <Link href="/contact" className="cta-button-primary">
                Book Your Call
                <ArrowRight size={20} />
              </Link>
              <Link href="/work" className="cta-button-secondary">
                See Our Work
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="cta-trust-indicators">
              <div className="cta-trust-item">
                <div className="cta-trust-dot" />
                <span>Response in 24hrs</span>
              </div>
              <div className="cta-trust-item">
                <div className="cta-trust-dot" />
                <span>Proposal in 48hrs</span>
              </div>
              <div className="cta-trust-item">
                <div className="cta-trust-dot" />
                <span>No Hidden Fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
