"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";

const labelStyle = "font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/70";
const inputStyle =
  "w-full rounded border border-white/10 bg-slab-black/40 px-3 py-2.5 font-mono text-sm text-slab-white placeholder:text-slab-muted/40 transition-colors focus:border-slab-neon-cyan focus:outline-none focus:ring-1 focus:ring-slab-neon-cyan/30";

const PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];

export default function CheckoutPage() {
  const { items, total, loading } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
    postalCode: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (fieldErrors[e.target.name]) {
      setFieldErrors((errs) => {
        const copy = { ...errs };
        delete copy[e.target.name];
        return copy;
      });
    }
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.addressLine1.trim()) errs.addressLine1 = "Required";
    if (!form.city.trim()) errs.city = "Required";
    if (!form.province) errs.province = "Required";
    if (!form.postalCode.trim()) errs.postalCode = "Required";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setSubmitting(false);
        return;
      }

      const payForm = document.createElement("form");
      payForm.method = "POST";
      payForm.action = data.payFastUrl;
      for (const [key, value] of Object.entries(data.payFastData)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        payForm.appendChild(input);
      }
      document.body.appendChild(payForm);
      payForm.submit();
    } catch {
      setError("Failed to process checkout. Please try again.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <NeonBadge tone="cyan" intensity="high">
          // INITIALIZING
        </NeonBadge>
        <p className="mt-6 font-mono text-sm uppercase tracking-widest text-slab-muted">
          {">"} LOADING<span className="terminal-cursor" />
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <NeonBadge tone="crimson" intensity="medium">
          // QUEUE_EMPTY
        </NeonBadge>
        <h1 className="mt-6 font-display text-4xl text-slab-white">Acquisition Confirmation</h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-widest text-slab-muted">
          {">"} NO SPECIMENS QUEUED // CANNOT_PROCEED
        </p>
        <div className="mt-6">
          <Button href="/shop" variant="neon" terminalPrefix>
            BROWSE_INVENTORY
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <NeonBadge tone="cyan" intensity="high">
        // ACQUISITION_CONFIRMATION
      </NeonBadge>
      <h1 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
        Acquisition Confirmation
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slab-muted">
        {">"} CONFIRM RECIPIENT DETAILS // EXECUTE PAYMENT VIA SECURE GATEWAY
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* Manifest */}
        <div>
          <NeonDivider label="// ACQUISITION_MANIFEST" accent="cyan" className="mb-6" />
          <div className="bracketed rounded-xl border border-white/[0.06] bg-slab-charcoal/60 p-5 backdrop-blur-sm">
            <div className="space-y-3 border-b border-white/[0.05] pb-4">
              {items.map((item) => (
                <div key={item.productId} className="flex items-start justify-between gap-4 font-mono text-sm">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-slab-white">{item.name}</div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-widest text-slab-muted">
                      // QTY: {item.quantity}
                    </div>
                  </div>
                  <span className="text-slab-white">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-end justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/70">
                // TOTAL_DUE
              </span>
              <span className="font-mono text-2xl font-bold text-slab-white neon-glow-white">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <NeonDivider label="// RECIPIENT_IDENTIFICATION" accent="cyan" className="mb-6" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="> FIRST_NAME" error={fieldErrors.firstName}>
              <input name="firstName" value={form.firstName} onChange={handleChange} className={inputStyle} required />
            </Field>
            <Field label="> LAST_NAME" error={fieldErrors.lastName}>
              <input name="lastName" value={form.lastName} onChange={handleChange} className={inputStyle} required />
            </Field>
            <Field label="> EMAIL" error={fieldErrors.email} fullSpan>
              <input name="email" type="email" value={form.email} onChange={handleChange} className={inputStyle} required />
            </Field>
            <Field label="> PHONE" fullSpan>
              <input name="phone" value={form.phone} onChange={handleChange} className={inputStyle} />
            </Field>
          </div>

          <NeonDivider label="// SHIPPING_COORDINATES" accent="cyan" className="mt-8 mb-6" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="> STREET_ADDRESS" error={fieldErrors.addressLine1} fullSpan>
              <input name="addressLine1" value={form.addressLine1} onChange={handleChange} className={inputStyle} required />
            </Field>
            <Field label="> ADDRESS_LINE_2" fullSpan>
              <input name="addressLine2" value={form.addressLine2} onChange={handleChange} className={inputStyle} />
            </Field>
            <Field label="> CITY" error={fieldErrors.city}>
              <input name="city" value={form.city} onChange={handleChange} className={inputStyle} required />
            </Field>
            <Field label="> PROVINCE" error={fieldErrors.province}>
              <select name="province" value={form.province} onChange={handleChange} className={inputStyle} required>
                <option value="">[ SELECT ]</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="> POSTAL" error={fieldErrors.postalCode}>
              <input name="postalCode" value={form.postalCode} onChange={handleChange} className={inputStyle} required />
            </Field>
          </div>

          {error && (
            <p className="mt-6 rounded border border-slab-danger/30 bg-slab-danger/[0.06] px-4 py-3 font-mono text-sm text-slab-danger">
              {">"} ERROR: {error}
            </p>
          )}

          <div className="mt-8">
            <Button type="submit" variant="neon" size="lg" terminalPrefix>
              {submitting ? "EXECUTING…" : `EXECUTE_PAYMENT — ${formatPrice(total)}`}
            </Button>
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slab-muted">
            {">"} REDIRECTING TO PAYFAST_SECURE_GATEWAY · ALL CARDS ENCRYPTED · SSL/TLS_1.3
          </p>

          <Link
            href="/cart"
            className="mt-4 inline-flex font-mono text-[10px] uppercase tracking-widest text-slab-muted hover:text-slab-neon-cyan"
          >
            ← BACK_TO_QUEUE
          </Link>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  fullSpan,
  children,
}: {
  label: string;
  error?: string;
  fullSpan?: boolean;
  children: React.ReactNode;
}) {
  // Wrap the input in the <label> for implicit association — sidesteps
  // needing to thread an id down to every checkout input.
  return (
    <label className={cn("block", fullSpan && "sm:col-span-2 sm:col-[1/-1]")}>
      <span className={labelStyle}>{label}:</span>
      <span className="mt-1 block">{children}</span>
      {error && (
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-slab-danger">
          {">"} {error}
        </span>
      )}
    </label>
  );
}
