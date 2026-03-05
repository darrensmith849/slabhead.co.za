import Link from "next/link";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Pokémon", href: "/pokemon" },
      { label: "Yu-Gi-Oh", href: "/yu-gi-oh" },
      { label: "Magic: The Gathering", href: "/mtg" },
      { label: "Culture", href: "/culture" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "SlabHunter", href: "/slabhunter" },
      { label: "SlabTrader", href: "/slabtrader" },
      { label: "We Buy Cards", href: "/we-buy-cards" },
      { label: "Slabbing", href: "/slabbing" },
      { label: "Loan Broker", href: "/loan-broker" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact", href: "/contact-us" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slab-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-slab-white">
              SLAB<span className="text-slab-crimson">HEAD</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slab-muted">
              South Africa&apos;s home for graded cards and collectables.
              PSA, CGC &amp; BGS authenticated. Shipped from Cape Town.
            </p>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold tracking-wider text-slab-white uppercase">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slab-muted transition-colors hover:text-slab-crimson"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-slab-muted">
            &copy; {new Date().getFullYear()} Slabhead. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slab-muted">
            <span>Cape Town, South Africa</span>
            <span className="text-slab-surface">|</span>
            <span>Prices in ZAR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
