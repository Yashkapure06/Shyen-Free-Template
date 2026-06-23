import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import CollabLogos from "@/components/CollabLogos";
import ConnectedSection from "@/components/ConnectedSection";
import CareSection from "@/components/CareSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main style={{ background: "#112115" }}>
      <Header />
      <CollabLogos />
      <ConnectedSection />
      <CareSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
