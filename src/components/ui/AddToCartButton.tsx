"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

interface Props {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  available: boolean;
}

export default function AddToCartButton({ productId, slug, name, price, image, available }: Props) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  if (!available) {
    return (
      <button
        disabled
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slab-surface px-6 py-3 text-sm font-semibold text-slab-muted cursor-not-allowed"
      >
        Sold Out
      </button>
    );
  }

  async function handleAdd() {
    setAdding(true);
    await addItem({ productId, slug, name, price, image });
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={adding}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slab-crimson px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slab-crimson/90 disabled:opacity-50"
    >
      {adding ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Adding...
        </>
      ) : added ? (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Added to Cart
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
}
