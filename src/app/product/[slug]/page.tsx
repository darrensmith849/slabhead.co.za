import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import GradeBadge from "@/components/ui/GradeBadge";
import PriceTag from "@/components/ui/PriceTag";
import ImageGallery from "@/components/ui/ImageGallery";
import Button from "@/components/ui/Button";
import AddToCartButton from "@/components/ui/AddToCartButton";
import ProductCard from "@/components/ui/ProductCard";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Slabhead`,
      description: product.description,
      images: product.images[0]
        ? [{ url: product.images[0].localPath, width: product.images[0].width, height: product.images[0].height }]
        : undefined,
    },
  };
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);
  const imageSrc = product.images[0]?.localPath || "/images/placeholder.svg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0]?.localPath,
    sku: product.sku,
    brand: { "@type": "Organization", name: "Slabhead" },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: product.currency,
      availability:
        product.availability === "InStock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `https://slabhead.co.za/product/${product.slug}`,
      seller: { "@type": "Organization", name: "Slabhead" },
    },
  };

  // SKU as listing ID display
  const listingId = `SH_${product.id?.toString().padStart(4, "0") ?? "0000"}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumbs — terminal style */}
        <nav className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slab-muted">
          <Link href="/" className="transition-colors hover:text-slab-neon-cyan">
            {">"} HOME
          </Link>
          <span className="text-slab-muted/40">/</span>
          <Link href="/shop" className="transition-colors hover:text-slab-neon-cyan">
            SHOP
          </Link>
          <span className="text-slab-muted/40">/</span>
          <span className="truncate text-slab-neon-cyan/70">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Specimen viewer */}
          <ImageGallery
            images={product.images.length > 0 ? product.images : [{ url: imageSrc, localPath: imageSrc, width: 800, height: 1100 }]}
            productName={product.name}
          />

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <NeonBadge tone="cyan" intensity="medium">
                // {listingId}
              </NeonBadge>
              <NeonBadge tone="muted" intensity="low">
                {product.category}
              </NeonBadge>
              {product.subcategory && (
                <NeonBadge tone="muted" intensity="low">
                  {product.subcategory}
                </NeonBadge>
              )}
            </div>

            <h1 className="mt-5 font-display text-3xl text-slab-white sm:text-4xl">
              {product.name}
            </h1>

            {/* Grade — big */}
            {product.gradeCompany && product.gradeScore !== undefined && (
              <div className="mt-5">
                <GradeBadge company={product.gradeCompany} score={product.gradeScore} large />
              </div>
            )}

            {/* Price */}
            <div className="mt-6">
              <PriceTag price={product.price} availability={product.availability} large />
            </div>

            {/* Description */}
            <p className="mt-7 max-w-xl leading-relaxed text-slab-muted">
              {product.description}
            </p>

            {/* Spec sheet — terminal format */}
            <div className="bracketed mt-8 rounded-xl border border-white/[0.06] bg-slab-charcoal/60 p-5 backdrop-blur-sm">
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-slab-neon-cyan/80 neon-glow-cyan">
                // SPEC_SHEET
              </h3>
              <dl className="grid grid-cols-1 gap-y-2 font-mono text-sm sm:grid-cols-2 sm:gap-x-6">
                {[
                  ["CATEGORY", product.category],
                  ["TYPE", product.subcategory],
                  ["GRADING_CO", product.gradeCompany],
                  ["GRADE", product.gradeScore !== undefined ? String(product.gradeScore) : null],
                  ["ERA", product.era],
                  ["EDITION", product.edition],
                  ["CONDITION", "NEW"],
                  ["CURRENCY", "ZAR"],
                ]
                  .filter(([, v]) => v != null && v !== "")
                  .map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2">
                      <span className="text-slab-neon-cyan/70">{">"}</span>
                      <span className="text-slab-muted">{k}:</span>
                      <span className="text-slab-white">{v}</span>
                    </div>
                  ))}
              </dl>
            </div>

            {/* Provenance */}
            <div className="mt-6 grid grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-widest">
              <div>
                <div className="text-slab-muted">// DATE_PUBLISHED</div>
                <div className="mt-1 text-slab-neon-cyan/80">{product.datePublished}</div>
              </div>
              <div>
                <div className="text-slab-muted">// LAST_UPDATED</div>
                <div className="mt-1 text-slab-neon-cyan/80">{product.dateModified}</div>
              </div>
              <div>
                <div className="text-slab-muted">// LISTING_ID</div>
                <div className="mt-1 text-slab-neon-cyan/80">{listingId}</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-3">
              <AddToCartButton
                productId={product.id!}
                slug={product.slug}
                name={product.name}
                price={product.price}
                image={imageSrc}
                available={product.availability === "InStock"}
              />
              {product.availability === "InStock" && WHATSAPP_NUMBER && (
                <Button
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hi, I'm interested in: ${product.name} (${formatPrice(product.price)}). Listing ${listingId}.`,
                  )}`}
                  variant="secondary"
                  size="lg"
                >
                  ENQUIRE_VIA_WHATSAPP
                </Button>
              )}
              <Button href="/shop" variant="ghost" size="lg">
                ← BACK_TO_INVENTORY
              </Button>
            </div>
          </div>
        </div>

        {/* Related specimens */}
        {related.length > 0 && (
          <div className="mt-24">
            <NeonDivider label="// RELATED_SPECIMENS" accent="cyan" className="mb-6" />
            <RevealOnScroll
              variant="fade-up"
              stagger={0.05}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6"
            >
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </RevealOnScroll>
          </div>
        )}
      </div>
    </>
  );
}
