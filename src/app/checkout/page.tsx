"use client";

import { useState, useRef, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, total, loading } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const payFastFormRef = useRef<HTMLFormElement>(null);

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
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

      // Create and submit PayFast form
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
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slab-white">Checkout</h1>
        <p className="mt-4 text-slab-muted">Loading...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slab-white">Checkout</h1>
        <p className="mt-4 text-slab-muted">Your cart is empty.</p>
        <Link href="/shop" className="mt-4 inline-block text-sm text-slab-crimson hover:text-slab-crimson/80">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slab-white">Checkout</h1>

      {/* Order Summary */}
      <div className="mt-6 rounded-xl border border-white/5 bg-slab-surface p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slab-muted">Order Summary</h2>
        <div className="mt-3 space-y-2">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="text-slab-white">
                {item.name} <span className="text-slab-muted">x{item.quantity}</span>
              </span>
              <span className="font-mono text-slab-white">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-white/5 pt-2 flex justify-between">
            <span className="font-semibold text-slab-white">Total</span>
            <span className="font-mono text-lg font-bold text-slab-white">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Customer Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slab-muted">Your Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slab-muted mb-1">First Name *</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} required className="w-full rounded-lg border border-white/10 bg-slab-charcoal px-3 py-2.5 text-sm text-slab-white placeholder:text-slab-muted/50 focus:border-slab-crimson focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs text-slab-muted mb-1">Last Name *</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} required className="w-full rounded-lg border border-white/10 bg-slab-charcoal px-3 py-2.5 text-sm text-slab-white placeholder:text-slab-muted/50 focus:border-slab-crimson focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slab-muted mb-1">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full rounded-lg border border-white/10 bg-slab-charcoal px-3 py-2.5 text-sm text-slab-white placeholder:text-slab-muted/50 focus:border-slab-crimson focus:outline-none" />
        </div>

        <div>
          <label className="block text-xs text-slab-muted mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-slab-charcoal px-3 py-2.5 text-sm text-slab-white placeholder:text-slab-muted/50 focus:border-slab-crimson focus:outline-none" />
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-wider text-slab-muted pt-4">Shipping Address</h2>

        <div>
          <label className="block text-xs text-slab-muted mb-1">Address Line 1</label>
          <input name="addressLine1" value={form.addressLine1} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-slab-charcoal px-3 py-2.5 text-sm text-slab-white placeholder:text-slab-muted/50 focus:border-slab-crimson focus:outline-none" />
        </div>

        <div>
          <label className="block text-xs text-slab-muted mb-1">Address Line 2</label>
          <input name="addressLine2" value={form.addressLine2} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-slab-charcoal px-3 py-2.5 text-sm text-slab-white placeholder:text-slab-muted/50 focus:border-slab-crimson focus:outline-none" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slab-muted mb-1">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-slab-charcoal px-3 py-2.5 text-sm text-slab-white placeholder:text-slab-muted/50 focus:border-slab-crimson focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs text-slab-muted mb-1">Province</label>
            <select name="province" value={form.province} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-slab-charcoal px-3 py-2.5 text-sm text-slab-white focus:border-slab-crimson focus:outline-none">
              <option value="">Select</option>
              <option value="Eastern Cape">Eastern Cape</option>
              <option value="Free State">Free State</option>
              <option value="Gauteng">Gauteng</option>
              <option value="KwaZulu-Natal">KwaZulu-Natal</option>
              <option value="Limpopo">Limpopo</option>
              <option value="Mpumalanga">Mpumalanga</option>
              <option value="North West">North West</option>
              <option value="Northern Cape">Northern Cape</option>
              <option value="Western Cape">Western Cape</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slab-muted mb-1">Postal Code</label>
            <input name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full rounded-lg border border-white/10 bg-slab-charcoal px-3 py-2.5 text-sm text-slab-white placeholder:text-slab-muted/50 focus:border-slab-crimson focus:outline-none" />
          </div>
        </div>

        {error && (
          <p className="text-sm text-slab-danger">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-slab-crimson px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slab-crimson/90 disabled:opacity-50"
        >
          {submitting ? "Processing..." : `Pay ${formatPrice(total)} with PayFast`}
        </button>

        <p className="text-center text-xs text-slab-muted">
          You will be redirected to PayFast to complete your payment securely.
        </p>
      </form>
    </div>
  );
}
