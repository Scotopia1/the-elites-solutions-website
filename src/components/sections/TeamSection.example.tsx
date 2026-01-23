"use client";

import { TeamSection, TeamMember } from "./TeamSection";

/**
 * Example usage of TeamSection component
 *
 * This file demonstrates different configurations and use cases
 */

// Sample team data
const sampleTeamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    bio: "Visionary leader with 15+ years of experience in digital transformation. Sarah has led multiple Fortune 500 companies through successful technological pivots.",
    image: "/images/team/sarah-chen.jpg",
    linkedin: "https://linkedin.com/in/sarahchen",
    twitter: "https://twitter.com/sarahchen",
  },
  {
    name: "Marcus Rodriguez",
    role: "Chief Technology Officer",
    bio: "Award-winning technologist and architect of scalable systems. Marcus holds 12 patents in distributed computing and AI infrastructure.",
    image: "/images/team/marcus-rodriguez.jpg",
    linkedin: "https://linkedin.com/in/marcusrodriguez",
  },
  {
    name: "Aisha Patel",
    role: "Chief Design Officer",
    bio: "Creative force behind award-winning user experiences. Aisha's work has been featured in Design Museum London and MoMA.",
    image: "/images/team/aisha-patel.jpg",
    linkedin: "https://linkedin.com/in/aishapatel",
    twitter: "https://twitter.com/aishapatel",
  },
  {
    name: "James O'Connor",
    role: "Chief Operating Officer",
    bio: "Operations strategist who scaled three startups to unicorn status. James brings systematic excellence to every challenge.",
    image: "/images/team/james-oconnor.jpg",
    linkedin: "https://linkedin.com/in/jamesoconnor",
  },
];

/**
 * Example 1: Default configuration with auto-play
 */
export function TeamSectionExample() {
  return (
    <TeamSection
      title="Meet the Team"
      members={sampleTeamMembers}
      autoPlay={true}
      interval={5000}
    />
  );
}

/**
 * Example 2: Manual navigation only (no auto-play)
 */
export function TeamSectionManual() {
  return (
    <TeamSection
      title="Leadership"
      members={sampleTeamMembers}
      autoPlay={false}
    />
  );
}

/**
 * Example 3: Faster auto-play with custom title
 */
export function TeamSectionFast() {
  return (
    <TeamSection
      title="Our Founders"
      members={sampleTeamMembers.slice(0, 2)}
      autoPlay={true}
      interval={3000}
    />
  );
}

/**
 * Example 4: With custom className for additional styling
 */
export function TeamSectionCustom() {
  return (
    <TeamSection
      title="The Visionaries"
      members={sampleTeamMembers}
      autoPlay={true}
      interval={6000}
      className="my-20 border-y border-[var(--orbit-gold-100)] border-opacity-20"
    />
  );
}

/**
 * Example 5: Minimal team (single member)
 */
export function TeamSectionSingle() {
  return (
    <TeamSection
      title="Founder"
      members={[sampleTeamMembers[0]]}
      autoPlay={false}
    />
  );
}

/**
 * Complete page example with multiple sections
 */
export default function TeamPage() {
  return (
    <main className="bg-[var(--orbit-dark-200)]">
      {/* Executive Team */}
      <TeamSection
        title="Executive Leadership"
        members={sampleTeamMembers}
        autoPlay={true}
        interval={5000}
      />

      {/* Founders Section */}
      <TeamSection
        title="Our Founders"
        members={sampleTeamMembers.slice(0, 2)}
        autoPlay={true}
        interval={4000}
        className="border-t border-[var(--orbit-gold-100)] border-opacity-10"
      />
    </main>
  );
}

/**
 * Usage in a Next.js page:
 *
 * ```tsx
 * import { TeamSection } from "@/components/sections/TeamSection";
 * import { teamMembers } from "@/data/team";
 *
 * export default function AboutPage() {
 *   return (
 *     <div>
 *       <TeamSection
 *         members={teamMembers}
 *         autoPlay={true}
 *         interval={5000}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */

/**
 * TypeScript type definition for team data structure:
 *
 * ```typescript
 * // data/team.ts
 * import { TeamMember } from "@/components/sections/TeamSection";
 *
 * export const teamMembers: TeamMember[] = [
 *   {
 *     name: "John Doe",
 *     role: "CEO",
 *     bio: "Optional biography text...",
 *     image: "/images/team/john-doe.jpg",
 *     linkedin: "https://linkedin.com/in/johndoe",
 *     twitter: "https://twitter.com/johndoe", // optional
 *   },
 *   // ... more team members
 * ];
 * ```
 */

/**
 * Props Reference:
 *
 * @param title - Section heading (default: "Meet the Team")
 * @param members - Array of TeamMember objects (required)
 * @param autoPlay - Enable automatic carousel rotation (default: true)
 * @param interval - Time between slides in milliseconds (default: 5000)
 * @param className - Additional CSS classes for the section wrapper
 *
 * TeamMember interface:
 * - name: string (required)
 * - role: string (required)
 * - bio: string (optional)
 * - image: string (required) - path to image
 * - linkedin: string (optional) - LinkedIn URL
 * - twitter: string (optional) - Twitter/X URL
 */

/**
 * Features:
 * ✅ Auto-play carousel with configurable interval
 * ✅ Pause on hover
 * ✅ Counter display with leading zeros (01, 02, 03...)
 * ✅ Smooth slide transitions with direction detection
 * ✅ Previous/Next navigation buttons
 * ✅ Progress indicator dots
 * ✅ Responsive design (mobile-first)
 * ✅ Accessibility support (ARIA labels, keyboard navigation)
 * ✅ Social media links (LinkedIn, Twitter)
 * ✅ Orbit Matter gold aesthetic
 * ✅ Framer Motion animations
 * ✅ Reduced motion support
 */
