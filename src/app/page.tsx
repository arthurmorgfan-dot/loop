import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "loop. — Wat als goed eten gewoon geregeld was?",
  description:
    "Een wekelijkse voedselbasis, met ruimte voor jouw leven. Ontdek het idee achter loop., probeer de demo en volg het onderzoek op BOUW.",
  alternates: { canonical: "https://loopfood.nl" },
  openGraph: {
    title: "loop. — Wat als goed eten gewoon geregeld was?",
    description:
      "Niet één superfood. Een systeem. Een voedselbasis in ontwikkeling, met ruimte voor jouw leven.",
    url: "https://loopfood.nl",
    type: "website",
    locale: "nl_NL",
    siteName: "loop.",
  },
};

export default function Home() {
  return <LandingPage />;
}
