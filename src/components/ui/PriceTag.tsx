import type { Availability } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  availability: Availability;
}

export default function PriceTag({ price, availability }: PriceTagProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-lg font-bold text-slab-white">
        {formatPrice(price)}
      </span>
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium ${
          availability === "InStock" ? "text-slab-success" : "text-slab-danger"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            availability === "InStock" ? "bg-slab-success" : "bg-slab-danger"
          }`}
        />
        {availability === "InStock" ? "In Stock" : "Sold"}
      </span>
    </div>
  );
}
