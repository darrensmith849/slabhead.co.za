import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slab-success/10">
        <svg className="h-8 w-8 text-slab-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="mt-6 text-3xl font-bold text-slab-white">Order Confirmed!</h1>
      <p className="mt-3 text-slab-muted">
        Thank you for your purchase. Your payment has been received and we&apos;re preparing your order.
      </p>

      {order && (
        <p className="mt-2 font-mono text-sm text-slab-muted">
          Order reference: <span className="text-slab-white">SH-{order}</span>
        </p>
      )}

      <p className="mt-4 text-sm text-slab-muted">
        You&apos;ll receive a tax invoice from Sage Pastel shortly at the email address you provided.
      </p>

      <Link
        href="/shop"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slab-crimson px-6 py-3 text-sm font-semibold text-white hover:bg-slab-crimson/90"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
