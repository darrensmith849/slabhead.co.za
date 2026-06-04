import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import NeonBadge from "@/components/atmosphere/NeonBadge";

export const metadata: Metadata = {
  title: "Transaction Cancelled",
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <NeonBadge tone="crimson" intensity="high">
        // TRANSACTION_ABORTED
      </NeonBadge>
      <h1 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
        Transaction Cancelled
      </h1>
      <p className="mt-4 font-mono text-sm uppercase tracking-widest text-slab-muted">
        {">"} PAYMENT_NOT_COMPLETED
      </p>

      <div className="mx-auto mt-8 max-w-md rounded-xl border border-slab-success/30 bg-slab-success/[0.05] p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-slab-success">
          {">"} QUEUE_PRESERVED
        </p>
        <p className="mt-2 text-sm text-slab-muted">
          Your specimens are still in the acquisition queue — nothing was lost.
          Return whenever you&apos;re ready.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Button href="/cart" variant="neon" size="lg" terminalPrefix block>
          RETRY_ACQUISITION
        </Button>
        <Button href="/shop" variant="secondary" size="lg" block>
          ← BACK_TO_INVENTORY
        </Button>
      </div>
    </div>
  );
}
