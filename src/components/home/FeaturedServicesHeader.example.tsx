/**
 * FeaturedServicesHeader Usage Example
 *
 * This example demonstrates how to integrate the FeaturedServicesHeader
 * component into the home page with proper section flow.
 */

"use client";

import FeaturedServicesHeader from "./FeaturedServicesHeader";
import Services from "./Services";

export default function HomePageServicesSection() {
  return (
    <>
      {/* Sticky header that pins during scroll */}
      <FeaturedServicesHeader
        title="Our Services"
        pinDuration={3} // Pins for 3 viewport heights
        className="" // Optional custom classes
      />

      {/* Services cards section follows immediately */}
      <Services />
    </>
  );
}

/**
 * Advanced Usage Examples
 */

// Example 1: Custom Title
export function CustomTitleExample() {
  return (
    <FeaturedServicesHeader
      title="What We Offer"
      pinDuration={2.5}
    />
  );
}

// Example 2: Shorter Pin Duration for Mobile-First
export function MobileFriendlyExample() {
  return (
    <FeaturedServicesHeader
      title="Services"
      pinDuration={2} // Shorter duration for faster scroll
    />
  );
}

// Example 3: Extended Pin with Custom Styling
export function ExtendedPinExample() {
  return (
    <FeaturedServicesHeader
      title="Our Expertise"
      pinDuration={4} // Longer pin duration
      className="custom-services-header" // Add custom styles via className
    />
  );
}

/**
 * Integration Tips:
 *
 * 1. Z-Index Management:
 *    - FeaturedServicesHeader has z-index: 10
 *    - Ensure subsequent sections have lower z-index
 *
 * 2. Scroll Performance:
 *    - GSAP ScrollTrigger with refreshPriority: 1
 *    - Calculates early to prevent layout conflicts
 *
 * 3. Responsive Behavior:
 *    - Typography scales automatically (clamp())
 *    - Background fade works across all viewports
 *
 * 4. Accessibility:
 *    - Respects prefers-reduced-motion
 *    - Semantic HTML with ARIA labels
 *
 * 5. Multi-Section Coordination:
 *    - If using multiple pinned sections, adjust refreshPriority
 *    - Higher priority = calculated first
 *    - Lower (negative) priority = calculated after others
 */
