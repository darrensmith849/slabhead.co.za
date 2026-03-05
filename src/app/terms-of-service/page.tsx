import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Slabhead terms of service — the rules and conditions governing use of our website and services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slab-white">Terms of Service</h1>
      <p className="mt-2 text-sm text-slab-muted">Last updated: March 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slab-muted">
        <section>
          <h2 className="text-lg font-semibold text-slab-white">1. Overview</h2>
          <p className="mt-2">
            These terms govern your use of the Slabhead website (slabhead.co.za)
            and all services we provide, including card sales, sourcing,
            trading, grading submissions and loan brokering. By using our site
            or services, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slab-white">2. Products & Pricing</h2>
          <p className="mt-2">
            All prices are listed in South African Rand (ZAR) and are subject to
            change without notice. We make every effort to ensure product
            descriptions and images are accurate. Grading information reflects
            the certification provided by PSA, CGC, BGS or other listed grading
            companies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slab-white">3. Orders & Payment</h2>
          <p className="mt-2">
            Placing an order constitutes an offer to purchase. We reserve the
            right to accept or decline any order. Payment must be received in
            full before dispatch. We accept EFT and other payment methods as
            indicated at checkout.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slab-white">4. Shipping & Returns</h2>
          <p className="mt-2">
            All shipments are insured and tracked. Delivery times depend on your
            location within South Africa. If you receive a product that
            doesn&apos;t match its description, contact us within 7 days for a
            resolution.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slab-white">5. Services</h2>
          <p className="mt-2">
            Our sourcing (SlabHunter), trading (SlabTrader), buying (We Buy
            Cards), grading (Slabbing) and loan broker services are provided on
            a best-effort basis. Specific terms for each service will be
            communicated before any commitment is made.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slab-white">6. Limitation of Liability</h2>
          <p className="mt-2">
            Slabhead is not liable for any indirect, incidental or consequential
            damages arising from the use of our site or services, to the extent
            permitted by South African law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slab-white">7. Contact</h2>
          <p className="mt-2">
            For questions about these terms, contact us at{" "}
            <a href="mailto:info@slabhead.co.za" className="text-slab-crimson hover:text-slab-crimson-light">
              info@slabhead.co.za
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
