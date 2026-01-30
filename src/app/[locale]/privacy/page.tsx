import type { Metadata } from 'next';
import './legal.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for The Elites Solutions',
};

export default function PrivacyPage() {
  return (
    <div className="legal-page-container">
      <div className="legal-content">
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: December 5, 2025</p>

        <section className="legal-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you use our services,
            including when you create an account, submit inquiries, or communicate with us.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services,
            to communicate with you, and to protect our users.
          </p>
        </section>

        <section className="legal-section">
          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties
            without your consent, except as described in this policy.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from
            unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information at any time.
            Contact us to exercise these rights.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:contact@theelites.com" className="legal-link">
              contact@theelites.com
            </a>
          </p>
        </section>

        <div className="legal-note">
          <p>
            <strong>Note:</strong> This is a placeholder privacy policy. Please consult with legal
            counsel to ensure compliance with applicable laws and regulations.
          </p>
        </div>
      </div>
    </div>
  );
}
