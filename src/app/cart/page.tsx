"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import NeonFrame from "@/components/atmosphere/NeonFrame";

export default function CartPage() {
  const { items, total, loading, removeItem, updateQuantity } = useCart();

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <NeonBadge tone="cyan" intensity="high">
          // INITIALIZING
        </NeonBadge>
        <p className="mt-6 font-mono text-sm uppercase tracking-widest text-slab-muted">
          {">"} LOADING QUEUE<span className="terminal-cursor" />
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <NeonBadge tone="cyan" intensity="high">
          // ACQUISITION_QUEUE
        </NeonBadge>
        <h1 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
          Your Queue
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slab-muted">
          {">"} QUEUE_EMPTY // NO_SPECIMENS_SELECTED
        </p>

        <div className="mt-10 rounded-xl border border-dashed border-slab-neon-cyan/20 bg-slab-charcoal/40 px-6 py-12 text-center backdrop-blur-sm">
          <svg
            className="mx-auto h-12 w-12 text-slab-neon-cyan/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          <p className="mt-4 font-mono text-sm uppercase tracking-widest text-slab-muted">
            {">"} NO ACTIVE ACQUISITIONS
          </p>
          <p className="mt-2 text-sm text-slab-muted/70">
            Browse the inventory to add specimens.
          </p>
          <div className="mt-6">
            <Button href="/shop" variant="neon" size="lg" terminalPrefix>
              BROWSE_INVENTORY
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <NeonBadge tone="cyan" intensity="high">
        // ACQUISITION_QUEUE // {items.length}_SPECIMEN{items.length === 1 ? "" : "S"}
      </NeonBadge>
      <h1 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
        Your Queue
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slab-muted">
        {">"} REVIEW & ADJUST QUANTITIES BEFORE ACQUISITION
      </p>

      <NeonDivider label="// QUEUED_SPECIMENS" accent="cyan" className="mt-10 mb-6" />

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="bracketed flex flex-col gap-4 rounded-xl border border-white/[0.06] bg-slab-charcoal/60 p-4 backdrop-blur-sm sm:flex-row sm:items-center"
          >
            {/* Specimen thumb */}
            <Link
              href={`/product/${item.slug}`}
              className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slab-neon-cyan/20 bg-slab-black scanlines"
            >
              {item.image && (
                <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="80px" />
              )}
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                href={`/product/${item.slug}`}
                className="block text-sm font-semibold text-slab-white transition-colors hover:text-slab-neon-cyan"
              >
                {item.name}
              </Link>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slab-muted">
                // UNIT_PRICE: {formatPrice(item.price)}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-1 rounded border border-white/10 bg-slab-black/40 px-1 py-1">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded font-mono text-xs uppercase text-slab-muted transition-colors hover:bg-slab-neon-cyan/10 hover:text-slab-neon-cyan"
                aria-label="Decrease"
              >
                DECR
              </button>
              <span className="w-8 text-center font-mono text-sm font-bold text-slab-white">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded font-mono text-xs uppercase text-slab-muted transition-colors hover:bg-slab-neon-cyan/10 hover:text-slab-neon-cyan"
                aria-label="Increase"
              >
                INCR
              </button>
            </div>

            {/* Line total */}
            <div className="w-24 text-right">
              <span className="font-mono text-lg font-bold text-slab-white">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>

            {/* Eject */}
            <button
              onClick={() => removeItem(item.productId)}
              className="flex items-center gap-1 rounded border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-slab-muted transition-all hover:border-slab-danger/40 hover:bg-slab-danger/10 hover:text-slab-danger"
              aria-label="Remove"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              EJECT
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <NeonDivider label="// TOTAL_ACQUISITION_VALUE" accent="cyan" className="mt-10 mb-6" />

      <NeonFrame accent="cyan">
        <div className="rounded-[11px] bg-slab-charcoal/70 p-6 backdrop-blur-sm">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/70">
                // TOTAL_VALUE
              </p>
              <p className="mt-1 font-mono text-4xl font-bold text-slab-white neon-glow-white">
                {formatPrice(total)}
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slab-muted">
              CURRENCY: ZAR
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/checkout" variant="neon" size="lg" terminalPrefix className="flex-1">
              PROCEED_TO_ACQUISITION
            </Button>
            <Button href="/shop" variant="secondary" size="lg" className="flex-1">
              ← CONTINUE_BROWSING
            </Button>
          </div>
        </div>
      </NeonFrame>
    </div>
  );
}
