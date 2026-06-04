import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonFrame from "@/components/atmosphere/NeonFrame";

export const metadata: Metadata = {
  title: "Acquisition Complete",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const orderRef = order ? `SH_${order}` : "SH_PENDING";

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <NeonBadge tone="cyan" intensity="high">
          // TRANSACTION_CONFIRMED
        </NeonBadge>
        <h1 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
          Acquisition Complete
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-widest text-slab-muted">
          {">"} PAYMENT_RECEIVED // SPECIMENS RESERVED FOR DISPATCH
        </p>
      </div>

      <NeonFrame accent="cyan" className="mt-12">
        <div className="rounded-[11px] bg-slab-charcoal/70 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/70">
              // ORDER_REFERENCE
            </span>
            <span
              className="h-2 w-2 rounded-full bg-slab-success"
              style={{ boxShadow: "0 0 8px rgba(34, 197, 94, 0.8)" }}
            />
          </div>
          <div className="mt-3 font-mono text-3xl font-bold text-slab-white neon-glow-white">
            {orderRef}
          </div>

          {/* Procedural ticker */}
          <div className="mt-6 space-y-2 border-t border-white/[0.05] pt-4 font-mono text-xs uppercase tracking-widest">
            {[
              ["// PAYMENT_RECEIVED", "OK"],
              ["// INVOICE_GENERATED", "OK"],
              ["// INVENTORY_RESERVED", "OK"],
              ["// SHIPPING_QUEUED", "PENDING"],
              ["// TRACKING_DISPATCH", "PENDING"],
            ].map(([label, status], i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-slab-muted">{label}</span>
                <span
                  className={
                    status === "OK"
                      ? "text-slab-success"
                      : "text-slab-electric"
                  }
                >
                  [{status}]
                </span>
              </div>
            ))}
          </div>
        </div>
      </NeonFrame>

      <p className="mx-auto mt-8 max-w-md text-center font-mono text-sm leading-relaxed text-slab-muted">
        {">"} You&apos;ll receive a tax invoice from Sage Pastel shortly at the email address provided. Tracking number will follow once dispatched.
      </p>

      <div className="mt-10 flex justify-center">
        <Button href="/shop" variant="neon" size="lg" terminalPrefix>
          CONTINUE_EXPLORATION
        </Button>
      </div>
    </div>
  );
}
