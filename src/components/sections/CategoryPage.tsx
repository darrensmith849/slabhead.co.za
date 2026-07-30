import Link from "next/link";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import CategoryHero, { type RoomTheme } from "@/components/atmosphere/CategoryHero";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";

interface SubPortal {
  label: string;
  href: string;
  count?: number;
}

interface CategoryPageProps {
  title: string;
  description: string;
  /** Mono badge label, e.g. "// THE_POKEMON_WING" */
  heroLabel: string;
  /** Visual theme — picks the scene + accent color */
  roomTheme: RoomTheme;
  products: Product[];
  /** Optional sub-category portals shown next to the hero on the right */
  subPortals?: SubPortal[];
}

/**
 * Cyberpunk-room template for category pages.
 *  • Top: full-bleed code-rendered CategoryHero (no images)
 *  • Optional: sub-category portals
 *  • Below: product grid (Available + Archived sections)
 */
export default function CategoryPage({
  title,
  description,
  heroLabel,
  roomTheme,
  products,
  subPortals,
}: CategoryPageProps) {
  const inStock = products.filter((p) => p.availability === "InStock");
  const sold = products.filter((p) => p.availability === "OutOfStock");

  const accent =
    roomTheme === "dragonball" || roomTheme === "liquidation" || roomTheme === "underwriting"
      ? "gold"
      : roomTheme === "onepiece"
        ? "magenta"
        : "cyan";

  return (
    <>
      <CategoryHero
        title={title}
        description={description}
        label={heroLabel}
        theme={roomTheme}
      >
        {subPortals && subPortals.length > 0 && (
          <div className="grid w-full gap-3">
            {subPortals.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="bracketed group flex items-center justify-between rounded border border-white/10 bg-slab-black/40 px-4 py-3 backdrop-blur-sm transition-all hover:border-slab-neon-cyan/40 hover:bg-slab-black/60"
              >
                <span className="font-mono text-sm uppercase tracking-widest text-slab-white">
                  {">"} {p.label}
                </span>
                <span className="font-mono text-xs text-slab-muted transition-colors group-hover:text-slab-neon-cyan">
                  {typeof p.count === "number" ? `[ ${p.count} ]` : "ENTER →"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </CategoryHero>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Status bar */}
        <div className="mb-8 flex items-center justify-between gap-4 border-y border-white/[0.05] py-3 font-mono text-[10px] uppercase tracking-widest">
          <span className="text-slab-muted">
            // INVENTORY_STATUS
          </span>
          <div className="flex items-center gap-4">
            <span className="text-slab-success">{inStock.length} IN_STOCK</span>
            <span className="text-slab-muted">·</span>
            <span className="text-slab-muted">{sold.length} ARCHIVED</span>
          </div>
        </div>

        {inStock.length > 0 && (
          <>
            <NeonDivider label="// AVAILABLE_NOW" accent={accent} className="mb-6" />
            <RevealOnScroll
              variant="fade-up"
              stagger={0.05}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6"
            >
              {inStock.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 2} />
              ))}
            </RevealOnScroll>
          </>
        )}

        {sold.length > 0 && (
          <div className="mt-16">
            <NeonDivider label="// ARCHIVED // PREVIOUSLY_SOLD" accent="crimson" className="mb-6" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
              {sold.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}

        {products.length === 0 && (
          <div className="py-20 text-center">
            <NeonBadge tone="muted" intensity="medium" className="mx-auto">
              // INVENTORY_EMPTY
            </NeonBadge>
            <p className="mt-4 font-mono text-sm text-slab-muted">
              {">"} NO SPECIMENS IN THIS CATEGORY YET
            </p>
            <div className="mt-6">
              <Button href="/shop" variant="neon" terminalPrefix block>
                BROWSE_INVENTORY
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
