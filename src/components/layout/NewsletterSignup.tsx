"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, hp, source: "footer" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrMsg(data.error ?? "Signup failed. Try again.");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrMsg("Signup failed. Try again.");
    }
  }

  return (
    <div className="mb-10 rounded-xl border border-slab-neon-cyan/15 bg-slab-charcoal/40 p-6 backdrop-blur-sm">
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-slab-neon-cyan/80 neon-glow-cyan">
            // FREQUENCY_BROADCAST
          </h3>
          <p className="mt-2 font-display text-xl text-slab-white">Stay in the loop</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-slab-muted">
            {">"} New acquisitions · grail drops · service updates
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 md:flex-row">
          {/* honeypot */}
          <input
            type="text"
            name="hp"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting" || status === "success"}
            placeholder="> EMAIL_ADDRESS"
            autoComplete="email"
            inputMode="email"
            enterKeyHint="send"
            className="flex-1 rounded-md border border-slab-neon-cyan/20 bg-slab-black/60 px-4 py-2 font-mono text-sm text-slab-white placeholder:text-slab-muted/60 focus:border-slab-neon-cyan focus:outline-none focus:ring-1 focus:ring-slab-neon-cyan disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "submitting" || status === "success"}
            className="w-full rounded-md border border-slab-neon-cyan/40 bg-slab-neon-cyan/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-slab-neon-cyan transition-all hover:bg-slab-neon-cyan/20 hover:neon-glow-cyan disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {status === "submitting"
              ? "// TRANSMITTING…"
              : status === "success"
                ? "// SUBSCRIBED"
                : "> SUBSCRIBE"}
          </button>
        </form>
      </div>

      {status === "success" && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-slab-success">
          {">"} CONNECTION_ESTABLISHED // WELCOME_TO_THE_NETWORK
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-slab-crimson">
          {">"} ERROR: {errMsg}
        </p>
      )}
    </div>
  );
}
