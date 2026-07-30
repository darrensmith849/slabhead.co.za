"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error || "Unable to sign in");
      setLoading(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6">
      <NeonBadge tone="cyan" intensity="high">// INVENTORY_ACCESS</NeonBadge>
      <h1 className="mt-6 font-display text-4xl text-slab-white">Admin Sign In</h1>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slab-muted">
        {">"} AUTHORISED_PERSONNEL_ONLY
      </p>
      <form onSubmit={submit} className="mt-10 rounded-xl border border-white/10 bg-slab-charcoal/70 p-6">
        <label className="block font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">
          USERNAME
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
            className="mt-2 w-full rounded border border-white/10 bg-slab-black/60 px-3 py-2.5 text-sm text-slab-white focus:border-slab-neon-cyan focus:outline-none"
          />
        </label>
        <label className="mt-5 block font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">
          PASSWORD
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded border border-white/10 bg-slab-black/60 px-3 py-2.5 text-sm text-slab-white focus:border-slab-neon-cyan focus:outline-none"
          />
        </label>
        {error && <p className="mt-4 text-sm text-slab-danger">{error}</p>}
        <div className="mt-6">
          <Button type="submit" variant="neon" size="lg" terminalPrefix block>
            {loading ? "AUTHENTICATING…" : "SIGN_IN"}
          </Button>
        </div>
      </form>
    </div>
  );
}
