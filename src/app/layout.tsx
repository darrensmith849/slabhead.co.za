import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Audiowide } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// Client-side loader that dynamic-imports the canvas. Keeps it out of
// SSR + the critical render path. Base gradient lives on <html>.
import NeonAtmosphere from "@/components/atmosphere/NeonAtmosphereLoader";
import { CartProvider } from "@/lib/cart-context";
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

const audiowide = Audiowide({
  variable: "--font-display",
  weight: "400",
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
  // OpenGraph + Twitter cards drive link previews on WhatsApp, FB,
  // iMessage, LinkedIn, Slack, Discord, Twitter. The actual image is
  // auto-injected by Next from src/app/opengraph-image.tsx +
  // twitter-image.tsx — these fields supply the surrounding text.
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Slabhead",
    title: "Slabhead — South Africa's Home for Graded Cards",
    description:
      "Rare Pokémon, Yu-Gi-Oh & Magic: The Gathering cards — professionally graded, securely shipped from Cape Town. Plus Japanese culture collectables.",
    url: "https://slabhead.co.za",
  },
  twitter: {
    card: "summary_large_image",
    title: "Slabhead — South Africa's Home for Graded Cards",
    description:
      "Rare Pokémon, Yu-Gi-Oh & Magic: The Gathering cards — professionally graded, securely shipped from Cape Town.",
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${audiowide.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NeonAtmosphere />
        <CartProvider>
          <Navbar />
          <main className="relative z-10 min-h-screen pt-16">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
