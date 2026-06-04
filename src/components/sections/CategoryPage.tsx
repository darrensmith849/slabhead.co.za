import Image from "next/image";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";

interface FeaturedImage {
  src: string;
  label: string;
  href?: string;
}

interface CategoryPageProps {
  title: string;
  description: string;
  products: Product[];
  /** Full-width banner image shown above the title */
  heroImage?: string;
  /** Row of sub-category images shown below the description */
  featuredImages?: FeaturedImage[];
}

export default function CategoryPage({
  title,
  description,
  products,
  heroImage,
  featuredImages,
}: CategoryPageProps) {
  const inStock = products.filter((p) => p.availability === "InStock");
  const sold = products.filter((p) => p.availability === "OutOfStock");

  return (
    <>
      {heroImage && (
        <section className="relative h-[40vh] min-h-[280px] w-full overflow-hidden bg-slab-black">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slab-black/30 via-slab-black/40 to-slab-black" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slab-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-slab-muted">{description}</p>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {!heroImage && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slab-white">{title}</h1>
            <p className="mt-1 text-slab-muted">{description}</p>
          </div>
        )}

        <p className="mb-6 text-sm text-slab-muted">
          {inStock.length} in stock &middot; {sold.length} sold
        </p>

        {featuredImages && featuredImages.length > 0 && (
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredImages.map((img, i) => {
              const card = (
                <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/5 bg-slab-surface">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slab-black/80 via-slab-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-lg font-semibold text-slab-white">
                    {img.label}
                  </span>
                </div>
              );
              return img.href ? (
                <a key={i} href={img.href} className="block">
                  {card}
                </a>
              ) : (
                <div key={i}>{card}</div>
              );
            })}
          </div>
        )}

        {inStock.length > 0 && (
          <>
            <h2 className="mb-4 text-lg font-semibold text-slab-white">
              Available Now
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
              {inStock.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </>
        )}

        {sold.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-lg font-semibold text-slab-muted">
              Previously Sold
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
              {sold.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}

        {products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-slab-muted">
              No products in this category yet.
            </p>
            <div className="mt-4">
              <Button href="/shop">Browse All Products</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
