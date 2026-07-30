"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CartButton from "@/components/ui/CartButton";

const navLinks = [
  { label: "SHOP", href: "/shop" },
  { label: "POKÉMON", href: "/pokemon" },
  { label: "DRAGON BALL Z", href: "/dragon-ball-z" },
  { label: "ONE PIECE", href: "/one-piece" },
  { label: "SERVICES", href: "/services-categories" },
  { label: "ABOUT", href: "/about-us" },
  { label: "CONTACT", href: "/contact-us" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  // Keyboard shortcut: ⌘K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile drawer or search overlay is open. Prevents
  // background-scroll on iOS Safari + Android Chrome.
  useEffect(() => {
    const shouldLock = mobileOpen || searchOpen;
    if (!shouldLock) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen, searchOpen]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (!q) return;
    setSearchOpen(false);
    setSearchValue("");
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-slab-black/70 backdrop-blur-xl">
        {/* Subtle electric line at bottom of nav */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-50"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5) 50%, transparent)",
          }}
        />
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 font-display text-xl tracking-wider"
          >
            <span className="brand-wordmark">SLABHEAD</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-3 py-2 font-mono text-xs uppercase tracking-widest text-slab-muted transition-all hover:bg-white/[0.04] hover:text-slab-neon-cyan hover:neon-glow-cyan"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden h-10 w-10 items-center justify-center rounded-lg text-slab-muted transition-colors hover:bg-slab-surface hover:text-slab-neon-cyan md:flex"
              aria-label="Search (⌘K)"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <CartButton />

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slab-muted transition-colors hover:bg-slab-surface hover:text-slab-white lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile drawer + tap-out backdrop — sibling of <nav>, NOT inside it.
          A fixed+z-indexed <nav> creates its own stacking context; nesting
          the drawer inside puts it under main (z-10) because the drawer's
          z-40 is interpreted relative to nav, not body. Rendering as a
          sibling restores normal body-level stacking (z-55 > main z-10). */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 top-16 z-[55] bg-slab-black/50 backdrop-blur-[2px] lg:hidden"
            aria-hidden="true"
          />
        )}
        {mobileOpen && (
          <motion.div
            key="drawer-panel"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-16 right-0 bottom-0 z-[56] flex w-72 flex-col gap-1 overflow-y-auto overscroll-contain border-l border-slab-neon-cyan/30 bg-slab-black/95 px-4 py-4 backdrop-blur-xl lg:hidden"
          >
            <span className="mb-2 px-3 font-mono text-[10px] uppercase tracking-widest text-slab-muted">
              // CONSOLE_DRAWER
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded px-3 py-2.5 font-mono text-sm uppercase tracking-widest text-slab-muted transition-colors hover:bg-slab-neon-cyan/10 hover:text-slab-neon-cyan"
              >
                {">"} {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className="mt-2 rounded px-3 py-2.5 text-left font-mono text-sm uppercase tracking-widest text-slab-muted transition-colors hover:bg-slab-neon-cyan/10 hover:text-slab-neon-cyan"
            >
              {">"} SEARCH
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-slab-black/85 backdrop-blur-md pt-32"
          >
            <motion.form
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={onSearchSubmit}
              className="mx-4 w-full max-w-2xl"
            >
              <div className="rounded-xl border border-slab-neon-cyan/40 bg-slab-charcoal p-4 neon-box-cyan">
                <label htmlFor="cmdk-search" className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/80">
                  // QUERY_TERMINAL
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slab-neon-cyan" aria-hidden="true">{">"}</span>
                  <input
                    id="cmdk-search"
                    autoFocus
                    type="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="search specimens…"
                    aria-label="Search specimens"
                    inputMode="search"
                    enterKeyHint="search"
                    autoComplete="off"
                    className="flex-1 bg-transparent font-mono text-base text-slab-white placeholder:text-slab-muted/50 focus:outline-none terminal-cursor"
                  />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-slab-muted/70">
                  [ENTER] EXECUTE  ·  [ESC] EXIT
                </p>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
