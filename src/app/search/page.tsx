import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Slabhead inventory of graded cards, sealed product and collectables.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const all = await getAllProducts();

  const results = query
    ? all.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.subcategory ?? "").toLowerCase().includes(query) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(query)),
      )
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <NeonBadge tone="cyan" intensity="high">
        // QUERY_RESULTS
      </NeonBadge>
      <h1 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
        Search Results
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slab-muted">
        {query ? (
          <>
            {">"} QUERY: <span className="text-slab-neon-cyan">&quot;{query}&quot;</span> · {results.length}_HIT{results.length === 1 ? "" : "S"}
          </>
        ) : (
          <>{">"} NO_QUERY_PROVIDED // USE ⌘K TO SEARCH</>
        )}
      </p>

      <NeonDivider label="// MATCHED_SPECIMENS" accent="cyan" className="mt-10 mb-6" />

      {results.length > 0 ? (
        <RevealOnScroll
          variant="fade-up"
          stagger={0.04}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6"
        >
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </RevealOnScroll>
      ) : (
        <div className="rounded-xl border border-dashed border-slab-neon-cyan/20 bg-slab-charcoal/40 p-12 text-center backdrop-blur-sm">
          <p className="font-mono text-sm uppercase tracking-widest text-slab-muted">
            {">"} NO RESULTS FOUND
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-slab-muted/70">
            // ADJUST QUERY PARAMETERS OR BROWSE_FULL_INVENTORY
          </p>
          <div className="mt-6">
            <Button href="/shop" variant="neon" terminalPrefix>
              BROWSE_INVENTORY
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
