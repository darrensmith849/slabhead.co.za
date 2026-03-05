import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Slabhead — South Africa's Home for Graded Cards",
    template: "%s | Slabhead",
  },
  description:
    "Discover rare Pokémon cards, Yu-Gi-Oh, Magic: The Gathering and Japanese culture collectables. PSA, CGC & BGS authenticated. Shipped from Cape Town, South Africa.",
  metadataBase: new URL("https://slabhead.co.za"),
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Slabhead",
    title: "Slabhead — South Africa's Home for Graded Cards",
    description:
      "Discover rare Pokémon cards, Yu-Gi-Oh, Magic: The Gathering and Japanese culture collectables. PSA, CGC & BGS authenticated.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Slabhead",
    url: "https://slabhead.co.za",
    description:
      "South Africa's home for graded Pokémon, Yu-Gi-Oh and Magic: The Gathering cards, plus Japanese culture collectables.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cape Town",
      addressCountry: "ZA",
    },
  };

  return (
    <html lang="en-ZA">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
