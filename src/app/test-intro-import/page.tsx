import { IntroSection } from "@/components/sections";

export default function TestIntroImportPage() {
  return (
    <main style={{ background: "#0a0a0a", minHeight: "100vh", paddingTop: "6rem" }}>
      <IntroSection
        label="IMPORT TEST"
        title="Testing Barrel Export"
        content="This page tests that the IntroSection component can be imported from the sections barrel export (@/components/sections) rather than directly from the component file. If this renders correctly, the barrel export is working as expected."
      />
    </main>
  );
}
