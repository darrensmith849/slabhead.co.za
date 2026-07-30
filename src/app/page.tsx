import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import ServiceCard from "@/components/ui/ServiceCard";
import NeonDivider from "@/components/atmosphere/NeonDivider";
import NeonFrame from "@/components/atmosphere/NeonFrame";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";
import TerminalText from "@/components/atmosphere/TerminalText";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import MarqueeStrip from "@/components/atmosphere/MarqueeStrip";
import PsaSlab from "@/components/atmosphere/PsaSlab";
import {
  getNewDrops,
  getFeaturedProducts,
  getGrailProducts,
  getCategoryCounts,
} from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default async function Home() {
  const [newDrops, hotProducts, grails, categoryCounts] = await Promise.all([
    getNewDrops(8),
    getFeaturedProducts(6),
    getGrailProducts(3),
    getCategoryCounts(),
  ]);

  return (
    <>
      {/* ═══ 1. HERO — "Walking In" ══════════════════════════════ */}
      <section className="relative flex min-h-[88svh] items-center overflow-hidden md:min-h-[88vh]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(0, 240, 255, 0.08) 0%, transparent 60%), " +
                "radial-gradient(ellipse 50% 40% at 70% 60%, rgba(255, 0, 200, 0.06) 0%, transparent 60%)",
            }}
          />
          <div className="absolute inset-0 scanlines opacity-30" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <NeonBadge tone="cyan" intensity="high" className="w-fit">
              // PSA · CGC · BGS // AUTHENTICATED
            </NeonBadge>

            <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-slab-white sm:text-5xl lg:text-6xl">
              <TerminalText text="SOUTH AFRICA'S" speed={45} cursor={false} as="span" className="block" />
              <span className="block mt-1 text-slab-neon-cyan neon-glow-cyan">
                <TerminalText text="HOME FOR" speed={45} startDelay={700} cursor={false} as="span" />
              </span>
              <span className="block mt-1 text-slab-crimson neon-glow-crimson">
                <TerminalText text="GRADED CARDS" speed={45} startDelay={1400} cursor={false} as="span" />
              </span>
            </h1>

            <RevealOnScroll variant="fade-up" delay={1.8}>
              <p className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-slab-muted">
                {">"} Rare Pokémon, Dragon Ball Z and One Piece cards — professionally
                graded and securely shipped from Cape Town.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/shop" variant="neon" size="lg" terminalPrefix block>
                  BROWSE_INVENTORY
                </Button>
                <Button href="/we-buy-cards" variant="secondary" size="lg" block>
                  WE BUY CARDS
                </Button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Hero anchor — stylized PSA grading slab (replaces the
              abstract card-stack placeholder per client direction).
              Scaled down on mobile + the negative margins absorb the
              empty space transform:scale leaves in the layout box, so
              the section doesn't grow taller than it needs to. */}
          <div className="mt-8 flex items-center justify-center lg:mt-0">
            <div className="origin-center scale-[0.62] -my-[107px] sm:scale-[0.78] sm:-my-[62px] lg:scale-100 lg:my-0">
              <PsaSlab />
            </div>
          </div>
        </div>

        {/* Bottom marquee */}
        <div className="absolute bottom-0 left-0 right-0">
          <MarqueeStrip
            items={[
              "PSA_AUTHENTICATED",
              "CGC_VERIFIED",
              "BGS_GRADED",
              "CAPE_TOWN.ZA",
              "INSURED_SHIPPING",
              "WORLDWIDE_HUNTING",
              "EXPERT_AUTHENTICATION",
            ]}
            tone="cyan"
          />
        </div>
      </section>

      {/* ═══ 2. SPECS BAR ═══════════════════════════════════════ */}
      <section className="relative border-y border-white/[0.05] bg-slab-charcoal/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-4 sm:px-6">
          {[
            { label: "PSA_CGC_VERIFIED", color: "text-slab-gold", bg: "bg-slab-gold" },
            { label: "SECURE_CHECKOUT", color: "text-slab-success", bg: "bg-slab-success" },
            { label: "CAPE_TOWN_BASED", color: "text-slab-neon-cyan", bg: "bg-slab-neon-cyan" },
            { label: "INSURED_SHIPPING", color: "text-slab-electric", bg: "bg-slab-electric" },
            { label: "100+_SPECIMENS", color: "text-slab-crimson-light", bg: "bg-slab-crimson-light" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
              <span className={`h-1.5 w-1.5 rounded-full ${b.bg}`} />
              <span className={b.color}>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. LATEST ACQUISITIONS ════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <NeonDivider label="// LATEST_ACQUISITIONS" accent="cyan" className="mb-4" />
              <h2 className="font-display text-3xl text-slab-white">Latest Acquisitions</h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slab-muted">
                {">"} JUST LANDED IN THE VAULT
              </p>
            </div>
            <Link
              href="/new"
              className="hidden font-mono text-xs uppercase tracking-widest text-slab-neon-cyan hover:neon-glow-cyan sm:inline-flex"
            >
              VIEW_ALL {">"}
            </Link>
          </div>
          <RevealOnScroll
            variant="fade-up"
            stagger={0.06}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6"
          >
            {newDrops.map((product, i) => (
              <ProductCard key={product.slug} product={product} priority={i < 2} />
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ 4. TRENDING SLABS — magenta tint ═════════════════ */}
      <section
        className="relative py-20 scanlines"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 70% 50%, rgba(255, 0, 200, 0.06) 0%, transparent 60%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <NeonDivider label="// TRENDING_SLABS" accent="magenta" className="mb-4" />
              <h2 className="font-display text-3xl text-slab-white">Trending Slabs</h2>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slab-muted">
                {">"} STAFF PICKS & TOP SELLERS
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden font-mono text-xs uppercase tracking-widest text-slab-neon-magenta hover:neon-glow-magenta sm:inline-flex"
            >
              VIEW_ALL {">"}
            </Link>
          </div>
          <RevealOnScroll
            variant="fade-up"
            stagger={0.06}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6"
          >
            {hotProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ 5. CHOOSE YOUR FACTION ═══════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NeonDivider label="// FACTIONS" accent="electric" className="mb-4" />
          <h2 className="font-display text-3xl text-slab-white">Choose Your Faction</h2>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slab-muted">
            {">"} FIND EXACTLY WHAT YOU&apos;RE AFTER
          </p>
          <RevealOnScroll
            variant="scale"
            stagger={0.08}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <CategoryCard
              title="Pokémon"
              description="Graded slabs, sealed product & accessories"
              href="/pokemon"
              count={(categoryCounts["Pokemon"] || 0) + (categoryCounts["TCG Accessories"] || 0)}
              scene="pokemon"
              icon="⚡"
            />
            <CategoryCard
              title="Dragon Ball Z"
              description="Graded cards, singles and sealed product"
              href="/dragon-ball-z"
              count={categoryCounts["Dragon Ball Z"] || 0}
              scene="dragonball"
              icon="★"
            />
            <CategoryCard
              title="One Piece"
              description="Graded cards, singles and sealed product"
              href="/one-piece"
              count={categoryCounts["One Piece"] || 0}
              scene="onepiece"
              icon="☠"
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ 6. THE PRIVATE COLLECTION — gold ═════════════════ */}
      <section
        className="relative overflow-hidden py-24"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at center, rgba(212, 175, 55, 0.08) 0%, transparent 50%), " +
            "linear-gradient(180deg, transparent, rgba(10, 10, 15, 0.6) 50%, transparent)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(10, 10, 15, 0.5) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <NeonBadge tone="gold" intensity="high">
              // VAULT_ACCESS_REQUIRED
            </NeonBadge>
            <h2 className="mt-6 font-display text-4xl text-slab-gold neon-glow-gold">
              The Private Collection
            </h2>
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slab-muted">
              {">"} THESE DON&apos;T COME AROUND OFTEN · PREMIUM SLABS FOR SERIOUS COLLECTORS
            </p>
          </div>
          <RevealOnScroll
            variant="fade-up"
            stagger={0.1}
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {grails.map((product) => (
              <Link key={product.slug} href={`/product/${product.slug}`} className="group block">
                <NeonFrame accent="gold">
                  <div className="overflow-hidden rounded-[11px] bg-slab-black">
                    <div className="relative aspect-[3/4] scanlines">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slab-gold/15 to-transparent" />
                      {product.images[0]?.localPath && (
                        <Image
                          src={product.images[0].localPath}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                          className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg text-slab-white">{product.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slab-muted line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-mono text-2xl font-bold text-slab-gold neon-glow-gold">
                          {formatPrice(product.price)}
                        </span>
                        {product.gradeCompany && product.gradeScore !== undefined && (
                          <span className="rounded border border-slab-gold/40 bg-slab-gold/10 px-2 py-0.5 font-mono text-xs font-bold text-slab-gold">
                            {product.gradeCompany} {product.gradeScore}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </NeonFrame>
              </Link>
            ))}
          </RevealOnScroll>
          <div className="mt-12 sm:text-center">
            <Button href="/grails" variant="neon" size="lg" terminalPrefix block>
              ENTER_VAULT
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ 7. THE NETWORK ═══════════════════════════════════ */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <NeonDivider label="// THE_NETWORK" accent="cyan" className="mb-4" />
          <h2 className="font-display text-3xl text-slab-white">Our Services</h2>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-slab-muted">
            {">"} 3 MODULES // ONLINE // READY FOR COMMANDS
          </p>
          <RevealOnScroll
            variant="fade-up"
            stagger={0.08}
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <ServiceCard
              title="We Buy Cards"
              description="Sell slabs, raw cards, sealed product or a full collection at a fair price."
              href="/we-buy-cards"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              }
            />
            <ServiceCard
              title="SlabHunter"
              description="Can&apos;t find it locally? We&apos;ll source it worldwide."
              href="/slabhunter"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            <ServiceCard
              title="SlabTrader"
              description="Want to trade? List what you have and what you want."
              href="/slabtrader"
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              }
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ 9. FOUNDER'S LOG ════════════════════════════════ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <RevealOnScroll variant="fade-up">
            <NeonBadge tone="muted" intensity="medium">
              // ENTRY_001 · 2025_07_01 · ORIGIN
            </NeonBadge>
            <h2 className="mt-6 font-display text-3xl text-slab-white">
              Built by Collectors, for Collectors
            </h2>
            <p className="mt-6 font-mono text-sm leading-relaxed text-slab-muted">
              Slabhead started with a simple dream: grow South Africa&apos;s collector
              market and give local enthusiasts a safe, trusted place to find
              graded cards they can&apos;t get anywhere else. Based in Cape Town,
              we hand-pick every slab and ship with care. Whether you&apos;re
              chasing a childhood Charizard or building a gem-mint Pikachu
              collection, we&apos;re here to help you find your next grail.
              <span className="terminal-cursor" />
            </p>
            <div className="mt-8">
              <Button href="/about-us" variant="secondary" size="md">
                Read the Founder&apos;s Log
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ═══ 10. INITIATE — final CTA ════════════════════════ */}
      <section
        className="relative overflow-hidden border-t border-white/[0.05] py-24"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at center, rgba(0, 240, 255, 0.10) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 80%)",
        }}
      >
        <div className="absolute inset-0 scanlines opacity-40" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <NeonBadge tone="cyan" intensity="high">
            // INITIATE
          </NeonBadge>
          <h2 className="mt-6 font-display text-4xl text-slab-white sm:text-5xl">
            <span className="block">Looking for</span>
            <span className="block mt-1 text-slab-neon-cyan neon-glow-cyan">
              Something Specific?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-mono text-sm leading-relaxed text-slab-muted">
            {">"} Our SlabHunter network can track down any card, anywhere in
            the world. Tell us what you&apos;re after and we&apos;ll make it happen.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Button href="/slabhunter" variant="neon" size="lg" terminalPrefix block>
              START_A_HUNT
            </Button>
            <Button href="/contact-us" variant="secondary" size="lg" block>
              GET IN TOUCH
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
