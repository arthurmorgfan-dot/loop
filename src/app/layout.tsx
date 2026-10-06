import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOOP — Deze week",
  description:
    "De basis is geregeld. De dag is van jou. Een lokaal prototype van je wekelijkse LOOP krat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
