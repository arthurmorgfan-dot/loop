import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard/dashboard";

export const metadata: Metadata = {
  title: "loop. — Demo v0.1",
  description:
    "Probeer de LOOP productdemo. Je krat, jouw keuzes. Alle producten, aanbieders en ontvangstkeuzes zijn fictief.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://loopfood.nl/demo" },
};

export default function DemoPage() {
  return <Dashboard />;
}
