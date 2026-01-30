"use client";

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen py-20 px-4 flex flex-col justify-center items-center overflow-hidden z-10">
      {/* Header */}
      <div className="relative text-center mb-10 z-10">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tight opacity-60 mb-2 text-white">
          This is
        </h1>
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-gold-400 to-neutral-400">
          The Elites
        </h1>
      </div>

      {/* Portrait */}
      <div className="relative w-[90%] max-w-[600px] aspect-[4/3] md:aspect-square rounded-2xl overflow-visible transition-all duration-500 hover:scale-105 mb-10 z-20 group">
        <img
          src="/images/logos/logo_light.png"
          alt="The Elites Solutions"
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-500 group-hover:drop-shadow-[0_0_30px_rgba(255,215,0,0.5)] group-hover:brightness-110"
        />
      </div>

      {/* Subtle Background Pattern (replacing CSS ::after) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_40%,rgba(212,175,55,0.03)_0%,transparent_50%)] z-0" />
    </section>
  );
}
