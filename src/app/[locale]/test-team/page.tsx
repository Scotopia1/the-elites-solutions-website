"use client";

import { TeamSection, TeamMember } from "@/components/sections/TeamSection";

// Sample team data for testing
const sampleTeamMembers: TeamMember[] = [
  {
    name: "Alexander Stone",
    role: "Founder & CEO",
    bio: "Visionary entrepreneur with 20+ years of experience building transformative technology companies. Alexander's leadership has guided three successful exits and established The Elites as an industry leader.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1066&fit=crop",
    linkedin: "https://linkedin.com/in/alexanderstone",
    twitter: "https://twitter.com/alexstone",
  },
  {
    name: "Maya Nakamura",
    role: "Chief Technology Officer",
    bio: "Award-winning architect of scalable systems and AI infrastructure. Maya holds 15 patents in distributed computing and has led engineering teams at Fortune 100 companies.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1066&fit=crop",
    linkedin: "https://linkedin.com/in/mayanakamura",
  },
  {
    name: "James Martinez",
    role: "Chief Design Officer",
    bio: "Creative visionary whose work has been featured in MoMA and Design Museum London. James brings 12 years of experience crafting award-winning user experiences.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1066&fit=crop",
    linkedin: "https://linkedin.com/in/jamesmartinez",
    twitter: "https://twitter.com/jmartinezdesign",
  },
  {
    name: "Sophia Chen",
    role: "Chief Operating Officer",
    bio: "Operations strategist who scaled two startups to unicorn status. Sophia's systematic approach to excellence has transformed organizations across three continents.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1066&fit=crop",
    linkedin: "https://linkedin.com/in/sophiachen",
  },
  {
    name: "David Okonkwo",
    role: "Chief Revenue Officer",
    bio: "Sales leader with a track record of building high-performing teams and driving exponential growth. David has closed over $500M in enterprise deals.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1066&fit=crop",
    linkedin: "https://linkedin.com/in/davidokonkwo",
  },
];

export default function TestTeamPage() {
  return (
    <main className="min-h-screen bg-[var(--orbit-dark-200)]">
      {/* Page Header */}
      <div className="container-custom py-16 text-center">
        <h1 className="font-screamer text-6xl uppercase tracking-wider text-[var(--orbit-gold-100)] md:text-8xl">
          Team Section Test
        </h1>
        <p className="mt-6 text-xl text-gray-400">
          Interactive demonstration of the TeamSection component
        </p>
      </div>

      {/* Team Section - Auto-play */}
      <TeamSection
        title="Meet Our Leadership"
        members={sampleTeamMembers}
        autoPlay={true}
        interval={5000}
      />

      {/* Manual Navigation Example */}
      <div className="border-y border-[var(--orbit-gold-100)] border-opacity-10">
        <TeamSection
          title="Our Founders"
          members={sampleTeamMembers.slice(0, 2)}
          autoPlay={false}
        />
      </div>

      {/* Fast Auto-play Example */}
      <TeamSection
        title="Executive Team"
        members={sampleTeamMembers.slice(0, 3)}
        autoPlay={true}
        interval={3000}
        className="bg-gradient-to-b from-[var(--orbit-dark-200)] to-black"
      />

      {/* Footer */}
      <div className="container-custom pb-16 pt-24 text-center">
        <p className="text-sm uppercase tracking-wider text-[var(--orbit-gold-200)] opacity-60">
          TeamSection Component • The Elites Solutions
        </p>
      </div>
    </main>
  );
}
