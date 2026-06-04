import type { Availability } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  availability: Availability;
  /** Larger price + label, for product detail */
  large?: boolean;
}

export default function PriceTag({ price, availability, large = false }: PriceTagProps) {
  const inStock = availability === "InStock";
  return (
    <div className={cn("flex flex-col gap-1", large && "gap-2")}>
      <span
        className={cn(
          "font-mono font-bold text-slab-white",
          large ? "text-3xl neon-glow-white" : "text-lg",
        )}
      >
        {formatPrice(price)}
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-mono uppercase tracking-widest",
          large ? "text-xs" : "text-[10px]",
          inStock ? "text-slab-success" : "text-slab-danger",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            inStock ? "bg-slab-success neon-box-cyan" : "bg-slab-danger",
          )}
          style={
            inStock
              ? { boxShadow: "0 0 6px rgba(34, 197, 94, 0.7)" }
              : undefined
          }
        />
        {inStock ? "[ IN_STOCK ]" : "[ SOLD ]"}
      </span>
    </div>
  );
}
