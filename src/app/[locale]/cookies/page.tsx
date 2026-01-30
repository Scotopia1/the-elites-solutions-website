import type { Metadata } from 'next';
import '../privacy/legal.css';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for The Elites Solutions',
};

export default function CookiesPage() {
  return (
    <div className="legal-page-container">
      <div className="legal-content">
        <h1 className="legal-title">Cookie Policy</h1>
        <p className="legal-updated">Last updated: December 5, 2025</p>

        <section className="legal-section">
          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are stored on your device when you visit our website.
            They help us provide you with a better experience by remembering your preferences and
            understanding how you use our site.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Types of Cookies We Use</h2>
          <ul className="legal-list">
            <li>
              <strong>Essential Cookies:</strong> Required for the website to function properly
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our
              website
            </li>
            <li>
              <strong>Functionality Cookies:</strong> Remember your preferences and settings
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Track your browsing habits to show relevant ads
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. How We Use Cookies</h2>
          <p>
            We use cookies to improve your browsing experience, analyze site traffic, personalize
            content, and remember your preferences. This helps us provide better services and
            understand which areas of our site are most useful.
          </p>
        </section>

        <section className="legal-section">
          <h2>4. Managing Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are
            already on your computer and you can set most browsers to prevent them from being
            placed. However, if you do this, you may have to manually adjust some preferences every
            time you visit a site.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Third-Party Cookies</h2>
          <p>
            Some cookies may be set by third-party services that appear on our pages. We do not
            control these cookies, and you should check the relevant third party's website for more
            information about these cookies.
          </p>
        </section>

        <section className="legal-section">
          <h2>6. Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us at{' '}
            <a href="mailto:contact@theelites.com" className="legal-link">
              contact@theelites.com
            </a>
          </p>
        </section>

        <div className="legal-note">
          <p>
            <strong>Note:</strong> This is a placeholder cookie policy. Please consult with legal
            counsel to ensure compliance with applicable laws and regulations (GDPR, CCPA, etc.).
          </p>
        </div>
      </div>
    </div>
  );
}
