"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

interface Props {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  available: boolean;
}

/**
 * "ACQUIRE" — cyberpunk variant of the add-to-cart button.
 *   • Unavailable: bracketed [ ARCHIVED ] indicator
 *   • Idle: electric border + "> ACQUIRE" mono label + neon glow
 *   • Adding: holo-spinning cursor + "// ACQUIRING..."
 *   • Added: green check + "// ACQUIRED"
 */
export default function AddToCartButton({
  productId,
  slug,
  name,
  price,
  image,
  available,
}: Props) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  if (!available) {
    return (
      <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-slab-danger/40 bg-slab-danger/[0.06] px-6 py-3 font-mono text-sm uppercase tracking-widest text-slab-danger neon-glow-crimson sm:inline-flex sm:w-auto">
        <span
          className="h-1.5 w-1.5 rounded-full bg-slab-danger"
          style={{ boxShadow: "0 0 6px rgba(239, 68, 68, 0.7)" }}
        />
        [ ARCHIVED ]
      </div>
    );
  }

  async function handleAdd() {
    setAdding(true);
    await addItem({ productId, slug, name, price, image });
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={adding}
      className={cn(
        // Full-width on mobile, natural on >= sm — this is THE primary
        // CTA on the product page, gives thumbs a clear tap surface.
        "flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all disabled:opacity-60 sm:inline-flex sm:w-auto",
        added
          ? "border border-slab-success/60 bg-slab-success/[0.08] text-slab-success neon-glow-cyan"
          : "border border-slab-electric/60 bg-slab-electric/[0.04] text-slab-white hover:border-slab-neon-cyan hover:text-slab-neon-cyan electric-border",
      )}
    >
      {adding ? (
        <>
          <span className="h-3.5 w-3.5 animate-spin rounded-full border border-slab-neon-cyan/30 border-t-slab-neon-cyan" />
          <span>// ACQUIRING…</span>
        </>
      ) : added ? (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>// ACQUIRED</span>
        </>
      ) : (
        <>
          <span className="text-slab-neon-cyan/70">{">"}</span>
          <span>ACQUIRE</span>
        </>
      )}
    </button>
  );
}
