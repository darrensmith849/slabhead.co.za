import Link from "next/link";

const footerSections = [
  {
    title: "// SHOP",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Grail Vault", href: "/grails" },
      { label: "Latest Acquisitions", href: "/new" },
      { label: "Pokémon", href: "/pokemon" },
      { label: "Yu-Gi-Oh", href: "/yu-gi-oh" },
      { label: "MTG", href: "/mtg" },
      { label: "Culture", href: "/culture" },
    ],
  },
  {
    title: "// SERVICES",
    links: [
      { label: "SlabHunter", href: "/slabhunter" },
      { label: "SlabTrader", href: "/slabtrader" },
      { label: "We Buy Cards", href: "/we-buy-cards" },
      { label: "Slabbing", href: "/slabbing" },
      { label: "Loan Broker", href: "/loan-broker" },
    ],
  },
  {
    title: "// VAULT",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact", href: "/contact-us" },
      { label: "Terms of Engagement", href: "/terms-of-service" },
      { label: "Data Protocols", href: "/privacy-policy" },
    ],
  },
  {
    title: "// TRANSMISSION",
    links: [
      { label: "info@slabhead.co.za", href: "mailto:info@slabhead.co.za" },
      { label: "Cape Town · ZA", href: "/contact-us" },
      { label: "Instagram", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "Discord", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-slab-neon-cyan/10 bg-slab-black/80 backdrop-blur-md">
      {/* Top neon line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5) 50%, transparent)",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* System status header */}
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-white/[0.05] pb-4">
          <Link href="/" className="font-display text-2xl tracking-wider">
            <span className="text-slab-white">SLAB</span>
            <span className="text-slab-neon-cyan neon-glow-cyan">HEAD</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
            <span
              className="h-2 w-2 rounded-full bg-slab-success"
              style={{
                boxShadow:
                  "0 0 6px rgba(34, 197, 94, 0.8), 0 0 12px rgba(34, 197, 94, 0.4)",
                animation: "neon-flicker 6s ease-in-out infinite",
              }}
            />
            <span className="text-slab-success">SYSTEMS // ONLINE</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-slab-neon-cyan/80 neon-glow-cyan">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="font-mono text-xs text-slab-muted transition-colors hover:text-slab-neon-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom status bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-white/[0.05] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slab-muted">
            © {new Date().getFullYear()} SLABHEAD · CAPE_TOWN.ZA · CURRENCY: ZAR
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slab-muted">
            BUILD: cyberpunk-2026.06 · PSA · CGC · BGS · BUDDYBOSS_FREE
          </p>
        </div>
      </div>
    </footer>
  );
}
