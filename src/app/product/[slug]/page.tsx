import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import GradeBadge from "@/components/ui/GradeBadge";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
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

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const imageSrc = product.images[0]?.localPath || "/images/placeholder.svg";

  // JSON-LD structured data
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-slab-muted">
          <Link href="/" className="hover:text-slab-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-slab-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-slab-white">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 bg-slab-charcoal">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.availability === "OutOfStock" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="rounded-lg bg-slab-danger/90 px-4 py-2 text-lg font-bold text-white">
                  SOLD
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-slab-white">{product.name}</h1>

            {/* Grade */}
            {product.gradeCompany && product.gradeScore !== undefined && (
              <div className="mt-3">
                <GradeBadge company={product.gradeCompany} score={product.gradeScore} />
              </div>
            )}

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-3xl font-bold text-slab-white">
                {formatPrice(product.price)}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  product.availability === "InStock"
                    ? "bg-slab-success/10 text-slab-success"
                    : "bg-slab-danger/10 text-slab-danger"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    product.availability === "InStock" ? "bg-slab-success" : "bg-slab-danger"
                  }`}
                />
                {product.availability === "InStock" ? "In Stock" : "Sold"}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 leading-relaxed text-slab-muted">{product.description}</p>

            {/* Spec Sheet */}
            <div className="mt-8 rounded-xl border border-white/5 bg-slab-surface p-5">
              <h3 className="text-sm font-semibold text-slab-white uppercase tracking-wider">
                Specifications
              </h3>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div>
                  <dt className="text-slab-muted">Category</dt>
                  <dd className="font-medium text-slab-white">{product.category}</dd>
                </div>
                {product.subcategory && (
                  <div>
                    <dt className="text-slab-muted">Type</dt>
                    <dd className="font-medium text-slab-white">{product.subcategory}</dd>
                  </div>
                )}
                {product.gradeCompany && (
                  <div>
                    <dt className="text-slab-muted">Grading Company</dt>
                    <dd className="font-medium text-slab-white">{product.gradeCompany}</dd>
                  </div>
                )}
                {product.gradeScore !== undefined && (
                  <div>
                    <dt className="text-slab-muted">Grade</dt>
                    <dd className="font-mono font-bold text-slab-white">{product.gradeScore}</dd>
                  </div>
                )}
                {product.era && (
                  <div>
                    <dt className="text-slab-muted">Set / Era</dt>
                    <dd className="font-medium text-slab-white">{product.era}</dd>
                  </div>
                )}
                {product.edition && (
                  <div>
                    <dt className="text-slab-muted">Edition</dt>
                    <dd className="font-medium text-slab-white">{product.edition}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-slab-muted">Condition</dt>
                  <dd className="font-medium text-slab-white">New</dd>
                </div>
                <div>
                  <dt className="text-slab-muted">Currency</dt>
                  <dd className="font-mono font-medium text-slab-white">ZAR</dd>
                </div>
              </dl>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              {product.availability === "InStock" ? (
                <Button
                  href={`https://wa.me/27000000000?text=${encodeURIComponent(`Hi, I'm interested in: ${product.name} (${formatPrice(product.price)})`)}`}
                  size="lg"
                >
                  Enquire on WhatsApp
                </Button>
              ) : (
                <Button variant="secondary" size="lg" href="/shop">
                  Browse Similar Cards
                </Button>
              )}
              <Button href="/shop" variant="ghost" size="lg">
                ← Back to Shop
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-slab-white">You Might Also Like</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
