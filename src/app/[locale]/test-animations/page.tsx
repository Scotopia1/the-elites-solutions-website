import { SplitTextRevealExamples } from "@/components/animations/SplitTextReveal.example";

export default function TestAnimationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto">
        <div className="py-12">
          <h1 className="mb-2 text-4xl font-bold">SplitTextReveal Component</h1>
          <p className="mb-12 text-gray-600">
            Character-by-character text animations powered by GSAP
          </p>
          <SplitTextRevealExamples />
        </div>
      </div>
    </div>
  );
}
