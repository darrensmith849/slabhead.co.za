import type { Metadata } from "next";
import ShopGrid from "./ShopGrid";
import { getAllProducts, getAllCategories, getAllGradeCompanies } from "@/lib/products";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse graded Pokémon cards, Yu-Gi-Oh, Magic: The Gathering, Japanese culture books, stationery and art. PSA, CGC & BGS authenticated.",
};

export default async function ShopPage() {
  const [products, categories, gradeCompanies] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllGradeCompanies(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <NeonBadge tone="cyan" intensity="high" className="w-fit">
        // FULL_INVENTORY
      </NeonBadge>
      <h1 className="mt-4 font-display text-4xl text-slab-white sm:text-5xl">The Inventory</h1>
      <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-slab-muted">
        {">"} {products.length} specimens catalogued. Every card authenticated. Every shipment insured.
      </p>
      <NeonDivider label="// FILTERS_ACTIVE" accent="cyan" className="mt-8 mb-6" />
      <ShopGrid products={products} categories={categories} gradeCompanies={gradeCompanies} />
    </div>
  );
}
