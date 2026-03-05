import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import GradeBadge from "./GradeBadge";
import PriceTag from "./PriceTag";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "featured";
}

export default function ProductCard({ product, variant = "grid" }: ProductCardProps) {
  const imageSrc =
    product.images[0]?.localPath || product.images[0]?.url || "/images/placeholder.svg";

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`card-shimmer group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-slab-surface transition-all duration-300 hover:border-slab-crimson/30 hover:shadow-[0_12px_48px_rgba(167,20,76,0.15)] ${
        variant === "featured" ? "aspect-auto" : ""
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-slab-charcoal">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes={variant === "featured" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
        />

        {/* Grade Badge */}
        {product.gradeCompany && product.gradeScore !== undefined && (
          <div className="absolute top-3 right-3">
            <GradeBadge company={product.gradeCompany} score={product.gradeScore} />
          </div>
        )}

        {/* Sold overlay */}
        {product.availability === "OutOfStock" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-md bg-slab-danger/90 px-3 py-1 text-sm font-bold text-white">
              SOLD
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slab-white group-hover:text-slab-crimson transition-colors">
          {product.name}
        </h3>
        {product.category && (
          <span className="text-xs text-slab-muted">{product.category}</span>
        )}
        <div className="mt-auto pt-2">
          <PriceTag price={product.price} availability={product.availability} />
        </div>
      </div>
    </Link>
  );
}
