import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Slabhead privacy policy — how we collect, use and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slab-white">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slab-muted">Last updated: March 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slab-muted">
        <section>
          <h2 className="text-lg font-semibold text-slab-white">1. Information We Collect</h2>
          <p className="mt-2">
            When you use our website or services, we may collect your name, email
            address, shipping address, phone number and payment details. We also
            collect standard web analytics data (pages visited, device type,
            referral source).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slab-white">2. How We Use Your Information</h2>
          <p className="mt-2">
            We use your information to process orders, respond to enquiries,
            provide our services (SlabHunter, SlabTrader, etc.), improve our
            website and communicate relevant updates about your orders or our
            products.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slab-white">3. Data Protection</h2>
          <p className="mt-2">
            We take reasonable measures to protect your personal information in
            accordance with the Protection of Personal Information Act (POPIA)
            of South Africa. Your data is stored securely and is not sold to
            third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slab-white">4. Cookies</h2>
          <p className="mt-2">
            Our website uses essential cookies to ensure functionality. We may
            use analytics cookies to understand how visitors use our site. You
            can control cookie settings in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slab-white">5. Your Rights</h2>
          <p className="mt-2">
            Under POPIA, you have the right to access, correct or delete your
            personal information. To exercise these rights, contact us at{" "}
            <a href="mailto:info@slabhead.co.za" className="text-slab-crimson hover:text-slab-crimson-light">
              info@slabhead.co.za
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
