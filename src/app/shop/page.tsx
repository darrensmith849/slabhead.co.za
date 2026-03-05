import type { Metadata } from "next";
import ShopGrid from "./ShopGrid";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse graded Pokémon cards, Yu-Gi-Oh, Magic: The Gathering, Japanese culture books, stationery and art. PSA, CGC & BGS authenticated.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slab-white">Shop</h1>
        <p className="mt-1 text-slab-muted">
          Every card authenticated. Every item shipped with care.
        </p>
      </div>
      <ShopGrid />
    </div>
  );
}
