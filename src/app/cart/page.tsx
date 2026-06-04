"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, total, loading, removeItem, updateQuantity } = useCart();

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slab-white">Your Cart</h1>
        <p className="mt-4 text-slab-muted">Loading...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slab-white">Your Cart</h1>
        <div className="mt-10 text-center">
          <svg className="mx-auto h-16 w-16 text-slab-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <p className="mt-4 text-lg text-slab-muted">Your cart is empty</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slab-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-slab-crimson/90"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slab-white">Your Cart</h1>
      <p className="mt-1 text-sm text-slab-muted">{items.length} {items.length === 1 ? "item" : "items"}</p>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 rounded-xl border border-white/5 bg-slab-surface p-4"
          >
            {/* Image */}
            <Link href={`/product/${item.slug}`} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slab-charcoal">
              {item.image && (
                <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="80px" />
              )}
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link href={`/product/${item.slug}`} className="text-sm font-semibold text-slab-white hover:text-slab-crimson transition-colors">
                {item.name}
              </Link>
              <p className="mt-1 font-mono text-sm text-slab-muted">{formatPrice(item.price)}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slab-muted hover:bg-slab-surface hover:text-slab-white"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-medium text-slab-white">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slab-muted hover:bg-slab-surface hover:text-slab-white"
              >
                +
              </button>
            </div>

            {/* Line total */}
            <div className="w-24 text-right">
              <span className="font-mono text-sm font-bold text-slab-white">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.productId)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slab-muted hover:bg-slab-danger/10 hover:text-slab-danger"
              aria-label="Remove"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="mt-8 rounded-xl border border-white/5 bg-slab-surface p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-slab-muted">Total</span>
          <span className="font-mono text-2xl font-bold text-slab-white">{formatPrice(total)}</span>
        </div>
        <Link
          href="/checkout"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slab-crimson px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slab-crimson/90"
        >
          Proceed to Checkout
        </Link>
        <Link href="/shop" className="mt-2 block text-center text-sm text-slab-muted hover:text-slab-white">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
