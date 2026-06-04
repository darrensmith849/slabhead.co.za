import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import GradeBadge from "./GradeBadge";
import PriceTag from "./PriceTag";
import HoloCard from "@/components/atmosphere/HoloCard";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "featured";
  /** Mark this card as LCP-eligible — only set on the first 1-2 cards above the fold */
  priority?: boolean;
}

export default function ProductCard({ product, variant = "grid", priority = false }: ProductCardProps) {
  const imageSrc =
    product.images[0]?.localPath || product.images[0]?.url || "/images/placeholder.svg";
  const isSold = product.availability === "OutOfStock";

  return (
    <HoloCard className="block">
      <Link
        href={`/product/${product.slug}`}
        className={cn(
          "group bracketed relative flex flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-slab-charcoal/70 backdrop-blur-sm transition-all duration-300 hover:border-slab-neon-cyan/30",
          isSold && "opacity-70 grayscale-[20%]",
        )}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-slab-black scanlines">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            priority={priority}
            // fetchPriority hint for non-priority cards — non-blocking
            {...(!priority && { loading: "lazy" as const })}
            className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.04]"
            sizes={
              variant === "featured"
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 50vw, 25vw"
            }
          />

          {/* Grade Badge */}
          {product.gradeCompany && product.gradeScore !== undefined && (
            <div className="absolute top-3 right-3 z-10">
              <GradeBadge company={product.gradeCompany} score={product.gradeScore} />
            </div>
          )}

          {/* Sold overlay */}
          {isSold && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-slab-black/70 backdrop-blur-[1px]">
              <span className="rounded border border-slab-danger/60 bg-slab-danger/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-slab-danger neon-glow-crimson">
                // ARCHIVED
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slab-white transition-colors group-hover:text-slab-neon-cyan">
            {product.name}
          </h3>
          {product.category && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-slab-muted">
              // {product.category}
            </span>
          )}
          <div className="mt-auto pt-2">
            <PriceTag price={product.price} availability={product.availability} />
          </div>
        </div>
      </Link>
    </HoloCard>
  );
}
