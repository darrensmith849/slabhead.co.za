"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export default function CartButton() {
  const { count } = useCart();
  const hasItems = count > 0;

  return (
    <Link
      href="/cart"
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-lg transition-all",
        hasItems
          ? "text-slab-neon-cyan hover:bg-slab-neon-cyan/10"
          : "text-slab-muted hover:bg-slab-surface hover:text-slab-white",
      )}
      aria-label={`Cart (${count} items)`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
        />
      </svg>
      {hasItems && (
        <span
          className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-slab-neon-cyan px-1 font-mono text-[9px] font-bold text-slab-black"
          style={{
            boxShadow: "0 0 6px rgba(0, 240, 255, 0.7), 0 0 12px rgba(0, 240, 255, 0.4)",
            animation: "electric-pulse 2.5s ease-in-out infinite",
          }}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
