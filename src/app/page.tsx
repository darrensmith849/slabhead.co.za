import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import ServiceCard from "@/components/ui/ServiceCard";
import {
  getNewDrops,
  getFeaturedProducts,
  getGrailProducts,
  getCategoryCounts,
} from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default function Home() {
  const newDrops = getNewDrops(8);
  const hotProducts = getFeaturedProducts(6);
  const grails = getGrailProducts(3);
  const categoryCounts = getCategoryCounts();

  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-slab-black">
        {/* Background image */}
        <Image
          src="/slabhead-import/home/16ac962f824408dd-003-SH-Neon-03-1536x878.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slab-black via-slab-black/80 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slab-crimson/30 bg-slab-crimson/10 px-3 py-1 text-xs font-medium text-slab-crimson">
              PSA &middot; CGC &middot; BGS Authenticated
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slab-white sm:text-5xl lg:text-6xl">
              South Africa&apos;s Home for{" "}
              <span className="text-slab-crimson">Graded Cards</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-slab-muted">
              Rare Pokémon, Yu-Gi-Oh &amp; Magic: The Gathering cards — professionally
              graded, securely shipped from Cape Town. Plus Japanese culture
              collectables, books &amp; art.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/shop" size="lg">
                Browse the Shop
              </Button>
              <Button href="/slabhunter" variant="secondary" size="lg">
                Can&apos;t Find It? We Hunt It
              </Button>
            </div>
          </div>

          {/* Featured card showcase */}
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative">
              {[
                { src: "/slabhead-import/home/97230e83adb5c635-Scene-02.jpg", alt: "Graded card collection" },
                { src: "/slabhead-import/home/3f08c4e777974109-WhatsApp-Image-2025-01-15-at-14.12.08.jpeg", alt: "PSA graded slab" },
                { src: "/slabhead-import/home/5b847058d8d8a3ea-Scene-03.jpg", alt: "Premium slabs" },
              ].map((card, i) => {
                const offsets = [
                  "rotate-[-6deg] translate-x-[-40px]",
                  "rotate-0 z-10 scale-105",
                  "rotate-[6deg] translate-x-[40px]",
                ];
                return (
                  <div
                    key={card.src}
                    className={`${i === 1 ? "relative" : "absolute top-0"} ${offsets[i]} transition-transform duration-500`}
                  >
                    <div className="h-[360px] w-[260px] overflow-hidden rounded-xl border border-white/10 bg-slab-surface shadow-2xl">
                      <Image
                        src={card.src}
                        alt={card.alt}
                        width={260}
                        height={360}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STRIP ── */}
      <section className="border-y border-white/5 bg-slab-charcoal/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 py-5 sm:gap-10 sm:px-6">
          {[
            { icon: "🛡️", label: "PSA & CGC Certified" },
            { icon: "🔒", label: "Secure Checkout" },
            { icon: "🇿🇦", label: "Based in Cape Town" },
            { icon: "📦", label: "Insured Shipping" },
            { icon: "💎", label: "100+ Graded Cards" },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-sm text-slab-muted">
              <span>{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. NEW DROPS ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slab-white">New Drops</h2>
              <p className="mt-1 text-sm text-slab-muted">Just landed in the vault</p>
            </div>
            <Link href="/shop" className="text-sm font-medium text-slab-crimson hover:text-slab-crimson-light transition-colors">
              View All →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {newDrops.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOT RIGHT NOW ── */}
      <section className="bg-slab-charcoal/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slab-white">Hot Right Now</h2>
              <p className="mt-1 text-sm text-slab-muted">Staff picks &amp; top sellers</p>
            </div>
            <Link href="/shop" className="text-sm font-medium text-slab-crimson hover:text-slab-crimson-light transition-colors">
              View All →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
            {hotProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CATEGORY CARDS ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slab-white">Browse by Category</h2>
          <p className="mt-1 text-sm text-slab-muted">Find exactly what you&apos;re after</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <CategoryCard
              title="Pokémon"
              description="Graded slabs, sealed product & accessories"
              href="/pokemon"
              count={(categoryCounts["Pokemon"] || 0) + (categoryCounts["TCG Accessories"] || 0)}
              icon={<span>⚡</span>}
              bgImage="/slabhead-import/home/7651aa96c5aea126-ash_ketchum___pokemon____ai__by_anastassia027_dhxhjh5-pre-e1737031249745.jpg"
            />
            <CategoryCard
              title="Yu-Gi-Oh"
              description="Sealed boxes and structure decks"
              href="/yu-gi-oh"
              count={categoryCounts["Yu-Gi-Oh"] || 0}
              icon={<span>🃏</span>}
              bgImage="/slabhead-import/home/bd9fc14f9bcecf36-Screenshot-2025-01-16-at-14.34.54-2048x1162.jpg"
            />
            <CategoryCard
              title="Magic: The Gathering"
              description="Collector boosters and commander decks"
              href="/mtg"
              count={categoryCounts["Magic the Gathering"] || 0}
              icon={<span>🧙</span>}
              bgImage="/slabhead-import/home/4f67b4b67954c9d8-Screenshot-2025-01-16-at-14.34.44-2048x1155.jpg"
            />
            <CategoryCard
              title="Culture & Books"
              description="Japanese literature, art books, zen & manga"
              href="/culture"
              count={(categoryCounts["Books"] || 0) + (categoryCounts["Stationery"] || 0)}
              icon={<span>📚</span>}
              bgImage="/slabhead-import/home/db8082df8cab1a05-DALL-C2-B7E-2025-02-10-04.37.48-A-minimalistic-cyberpunk-inspired-desk-setup-with-a-few-carefully-placed-stationery-items.-The-desk-has-a-sleek-futuristic-design-with-subtle-neon-li.webp"
            />
          </div>
        </div>
      </section>

      {/* ── 6. GRAIL VAULT ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slab-black via-slab-charcoal to-slab-black py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-1 rounded-full border border-slab-gold/30 bg-slab-gold/10 px-3 py-1 text-xs font-mono font-medium text-slab-gold">
              💎 GRAIL VAULT
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slab-white">
              These Don&apos;t Come Around Often
            </h2>
            <p className="mt-2 text-slab-muted">
              Premium graded cards &amp; collector pieces for serious enthusiasts
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grails.map((product) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="card-shimmer group relative overflow-hidden rounded-2xl border border-slab-gold/20 bg-slab-surface p-1 transition-all duration-500 hover:border-slab-gold/40 hover:shadow-[0_0_48px_rgba(212,175,55,0.15)]"
              >
                <div className="overflow-hidden rounded-xl bg-slab-charcoal">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={product.images[0]?.localPath || "/images/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slab-white">{product.name}</h3>
                    <p className="mt-1 text-sm text-slab-muted">{product.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-mono text-xl font-bold text-slab-gold">
                        {formatPrice(product.price)}
                      </span>
                      {product.gradeCompany && product.gradeScore !== undefined && (
                        <span className="rounded-md bg-slab-gold/10 px-2 py-0.5 font-mono text-xs font-bold text-slab-gold">
                          {product.gradeCompany} {product.gradeScore}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SERVICES STRIP ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slab-white">Our Services</h2>
          <p className="mt-1 text-sm text-slab-muted">
            More than a shop — we help collectors buy, sell, trade and protect their cards
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <ServiceCard
              title="SlabHunter"
              description="Can't find it locally? We'll source it for you worldwide."
              href="/slabhunter"
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            />
            <ServiceCard
              title="SlabTrader"
              description="Want to trade? List what you have and what you're after."
              href="/slabtrader"
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
            />
            <ServiceCard
              title="We Buy Cards"
              description="Need cash? We'll buy your collection at a fair price."
              href="/we-buy-cards"
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>}
            />
            <ServiceCard
              title="Slabbing"
              description="Get your cards professionally graded by PSA, CGC or BGS."
              href="/slabbing"
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
            />
            <ServiceCard
              title="Loan Broker"
              description="Use your graded cards as collateral for competitive-rate loans."
              href="/loan-broker"
              icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            />
          </div>
        </div>
      </section>

      {/* ── 8. CULTURE TEASER ── */}
      <section className="bg-slab-charcoal/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slab-white">Beyond the Cards</h2>
              <p className="mt-1 text-sm text-slab-muted">
                Japanese culture, art, books &amp; stationery
              </p>
            </div>
            <Link href="/culture" className="text-sm font-medium text-slab-crimson hover:text-slab-crimson-light transition-colors">
              Explore Culture →
            </Link>
          </div>

          {/* Culture visual banner */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link href="/culture" className="group relative overflow-hidden rounded-xl aspect-[16/9]">
              <Image
                src="/slabhead-import/home/00295d55087f890f-DALL-C2-B7E-2025-01-16-12.23.34-A-cyberpunk-inspired-cover-photo-for-a-trading-card-platform-set-in-a-secretive-back-alley.-Two-silhouettes-are-trading-cards-under-the-glow-of-neon-1-2.jpg"
                alt="Trading card culture"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slab-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-lg font-bold text-slab-white">The Trading Scene</span>
              </div>
            </Link>
            <Link href="/culture" className="group relative overflow-hidden rounded-xl aspect-[16/9]">
              <Image
                src="/slabhead-import/home/0ec44a2beb73b382-Slab-Hunter-Edit.jpg"
                alt="SlabHunter service"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slab-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-lg font-bold text-slab-white">Collector Culture</span>
              </div>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {[
              ...getNewDrops(28).filter((p) => ["Books", "Stationery", "Art"].includes(p.category)),
            ]
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* ── 9. ABOUT/STORY ── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-slab-white">
            Built by Collectors, for Collectors
          </h2>
          <p className="mt-4 leading-relaxed text-slab-muted">
            Slabhead started with a simple dream: grow South Africa&apos;s collector
            market and give local enthusiasts a safe, trusted place to find
            graded cards they can&apos;t get anywhere else. Based in Cape Town,
            we hand-pick every slab and ship with care. Whether you&apos;re
            chasing a childhood Charizard or building a gem-mint Pikachu
            collection, we&apos;re here to help you find your next grail.
          </p>
          <div className="mt-6">
            <Button href="/about-us" variant="secondary">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* ── 10. CTA ── */}
      <section className="border-t border-white/5 bg-gradient-to-r from-slab-crimson/20 via-slab-black to-slab-crimson/20 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-slab-white sm:text-3xl">
            Looking for Something Specific?
          </h2>
          <p className="mt-3 text-slab-muted">
            Our SlabHunter service can track down any card, anywhere in the
            world. Tell us what you&apos;re after and we&apos;ll make it happen.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/slabhunter" size="lg">
              Start a Hunt
            </Button>
            <Button href="/contact-us" variant="secondary" size="lg">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
