import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Cancelled",
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slab-danger/10">
        <svg className="h-8 w-8 text-slab-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="mt-6 text-3xl font-bold text-slab-white">Payment Cancelled</h1>
      <p className="mt-3 text-slab-muted">
        Your payment was not completed. Your cart items are still saved.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 rounded-xl bg-slab-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-slab-crimson/90"
        >
          Return to Cart
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-slab-white hover:bg-slab-surface"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
