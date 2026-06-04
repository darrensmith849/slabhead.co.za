"use client";

import { useState } from "react";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const labelStyle = "font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/70";
const inputStyle =
  "w-full rounded border border-white/10 bg-slab-black/40 px-3 py-2.5 font-mono text-sm text-slab-white placeholder:text-slab-muted/40 transition-colors focus:border-slab-neon-cyan focus:outline-none focus:ring-1 focus:ring-slab-neon-cyan/30";

const SUBJECTS = [
  ["general", "GENERAL_ENQUIRY"],
  ["slabhunter", "SLABHUNTER_REQUEST"],
  ["slabtrader", "SLABTRADER"],
  ["sell", "SELL_MY_CARDS"],
  ["slabbing", "GRADING_SERVICE"],
  ["loan", "LOAN_ENQUIRY"],
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Submission failed.");
      } else {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "general", message: "" });
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <NeonBadge tone="cyan" intensity="high">
        // TRANSMISSION_TERMINAL
      </NeonBadge>
      <h1 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
        Contact
      </h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slab-muted">
        {">"} OPEN_CHANNEL // EXPECT RESPONSE WITHIN 24h BUSINESS DAYS
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        {/* Transmission channels */}
        <div>
          <NeonDivider label="// TRANSMISSION_CHANNELS" accent="cyan" className="mb-6" />
          <div className="bracketed space-y-4 rounded-xl border border-white/[0.06] bg-slab-charcoal/60 p-5 backdrop-blur-sm">
            <ChannelRow label="EMAIL" value="info@slabhead.co.za" href="mailto:info@slabhead.co.za" />
            <ChannelRow label="LOCATION" value="CAPE_TOWN.ZA" />
            <ChannelRow label="RESPONSE_TIME" value="24h · BUSINESS_DAYS" />
            <ChannelRow label="CURRENCY" value="ZAR" />

            <div className="border-t border-white/[0.05] pt-4">
              <span className={cn(labelStyle, "block")}>// SOCIAL_NETWORKS</span>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-slab-muted">
                // PENDING_CLIENT_PROVIDES_HANDLES
              </p>
              <div className="mt-3 flex gap-2">
                {["IG", "X", "DC"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/10 bg-slab-black/40 font-mono text-[10px] uppercase tracking-widest text-slab-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <NeonDivider label="// COMPOSE_MESSAGE" accent="cyan" className="mb-6" />
          <div className="bracketed rounded-xl border border-white/[0.06] bg-slab-charcoal/60 p-5 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelStyle}>{">"} NAME:</label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  enterKeyHint="next"
                  className={cn(inputStyle, "mt-1")}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelStyle}>{">"} EMAIL:</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  inputMode="email"
                  enterKeyHint="next"
                  className={cn(inputStyle, "mt-1")}
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-subject" className={labelStyle}>{">"} SUBJECT:</label>
              <select
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={cn(inputStyle, "mt-1")}
              >
                {SUBJECTS.map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-message" className={labelStyle}>{">"} MESSAGE:</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                enterKeyHint="send"
                className={cn(inputStyle, "mt-1 resize-y")}
              />
            </div>

            {status === "sent" && (
              <div className="mt-5 rounded border border-slab-success/40 bg-slab-success/[0.06] p-4 font-mono text-xs uppercase tracking-widest text-slab-success">
                {">"} MESSAGE_TRANSMITTED // EXPECT_RESPONSE_WITHIN_24H<span className="terminal-cursor" />
              </div>
            )}
            {status === "error" && (
              <div className="mt-5 rounded border border-slab-danger/30 bg-slab-danger/[0.06] p-4 font-mono text-xs uppercase tracking-widest text-slab-danger">
                {">"} ERROR: {errorMsg}
              </div>
            )}

            <div className="mt-6">
              <Button type="submit" variant="neon" size="lg" terminalPrefix block>
                {submitting ? "TRANSMITTING…" : "TRANSMIT_MESSAGE"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ChannelRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const v = href ? (
    <a href={href} className="text-slab-neon-cyan hover:neon-glow-cyan">
      {value}
    </a>
  ) : (
    <span className="text-slab-white">{value}</span>
  );
  return (
    <div className="flex items-center justify-between font-mono text-sm">
      <span className="text-slab-muted">
        <span className="text-slab-neon-cyan/70">{">"}</span> {label}:
      </span>
      {v}
    </div>
  );
}
