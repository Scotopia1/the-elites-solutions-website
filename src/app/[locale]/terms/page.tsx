import type { Metadata } from 'next';
import '../privacy/legal.css';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for The Elites Solutions',
};

export default function TermsPage() {
  return (
    <div className="legal-page-container">
      <div className="legal-content">
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-updated">Last updated: December 5, 2025</p>

        <section className="legal-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using The Elites Solutions services, you accept and agree to be bound
            by the terms and provisions of this agreement.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Services</h2>
          <p>
            We provide custom software development, web development, mobile app development, and
            business automation solutions. Service details and deliverables are outlined in
            individual project agreements.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. User Responsibilities</h2>
          <p>
            You agree to provide accurate information, maintain the confidentiality of your account,
            and use our services in compliance with all applicable laws and regulations.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our services are owned by The Elites
            Solutions and are protected by international copyright, trademark, and other
            intellectual property laws.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Limitation of Liability</h2>
          <p>
            The Elites Solutions shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use of our services.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to our services at any time,
            without prior notice, for conduct that we believe violates these Terms of Service.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to{' '}
            <a href="mailto:contact@theelites.com" className="legal-link">
              contact@theelites.com
            </a>
          </p>
        </section>

        <div className="legal-note">
          <p>
            <strong>Note:</strong> This is a placeholder terms of service. Please consult with
            legal counsel to ensure compliance with applicable laws and regulations.
          </p>
        </div>
      </div>
    </div>
  );
}
