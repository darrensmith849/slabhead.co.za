import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getGrailProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import CategoryHero from "@/components/atmosphere/CategoryHero";
import NeonFrame from "@/components/atmosphere/NeonFrame";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "The Grail Vault",
  description:
    "Slabhead's curated Grail Vault — high-value graded cards & collector pieces. PSA, CGC, BGS authenticated. Shipped from Cape Town.",
};

export default async function GrailsPage() {
  const grails = await getGrailProducts(24);

  return (
    <>
      <CategoryHero
        title="The Private Collection"
        description="Premium graded slabs & collector pieces. These don't come around often — each verified, each accounted for, each priced honestly."
        label="// VAULT_ACCESS_REQUIRED"
        theme="liquidation"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <NeonDivider label="// HIGH_VALUE_SPECIMENS" accent="gold" className="mb-10" />

        {grails.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slab-gold/30 bg-slab-charcoal/40 p-12 text-center backdrop-blur-sm">
            <p className="font-mono text-sm uppercase tracking-widest text-slab-muted">
              {">"} VAULT_EMPTY // ACQUISITIONS_IN_PROGRESS
            </p>
          </div>
        ) : (
          <RevealOnScroll
            variant="fade-up"
            stagger={0.08}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {grails.map((product) => (
              <Link key={product.slug} href={`/product/${product.slug}`} className="group block">
                <NeonFrame accent="gold">
                  <div className="overflow-hidden rounded-[11px] bg-slab-black">
                    <div className="relative aspect-[3/4] scanlines">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slab-gold/15 to-transparent" />
                      {product.images[0]?.localPath && (
                        <Image
                          src={product.images[0].localPath}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                          className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg text-slab-white">{product.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slab-muted">
                        {product.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-mono text-2xl font-bold text-slab-gold neon-glow-gold">
                          {formatPrice(product.price)}
                        </span>
                        {product.gradeCompany && product.gradeScore !== undefined && (
                          <span className="rounded border border-slab-gold/40 bg-slab-gold/10 px-2 py-0.5 font-mono text-xs font-bold text-slab-gold">
                            {product.gradeCompany} {product.gradeScore}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </NeonFrame>
              </Link>
            ))}
          </RevealOnScroll>
        )}

        <div className="mt-16 text-center">
          <Button href="/shop" variant="secondary" size="lg">
            ← BACK_TO_FULL_INVENTORY
          </Button>
        </div>
      </div>
    </>
  );
}
