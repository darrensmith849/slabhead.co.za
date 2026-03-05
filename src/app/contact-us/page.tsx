import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have questions, need a quote, or want to start a hunt? Get in touch with the Slabhead team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slab-white">Contact Us</h1>
      <p className="mt-2 text-slab-muted">
        Have questions, need a quote, or want to start a hunt? We&apos;d love to
        hear from you.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slab-white uppercase tracking-wider">
              Email
            </h3>
            <a
              href="mailto:info@slabhead.co.za"
              className="mt-1 block text-slab-crimson hover:text-slab-crimson-light transition-colors"
            >
              info@slabhead.co.za
            </a>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slab-white uppercase tracking-wider">
              Location
            </h3>
            <p className="mt-1 text-slab-muted">Cape Town, South Africa</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slab-white uppercase tracking-wider">
              Response Time
            </h3>
            <p className="mt-1 text-slab-muted">
              We typically respond within 24 hours on business days.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slab-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-slab-surface px-3 py-2.5 text-sm text-slab-white placeholder-slab-muted focus:border-slab-crimson focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slab-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-slab-surface px-3 py-2.5 text-sm text-slab-white placeholder-slab-muted focus:border-slab-crimson focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slab-white">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="mt-1 w-full rounded-lg border border-white/10 bg-slab-surface px-3 py-2.5 text-sm text-slab-white focus:border-slab-crimson focus:outline-none"
            >
              <option>General Enquiry</option>
              <option>SlabHunter Request</option>
              <option>SlabTrader</option>
              <option>Sell My Cards</option>
              <option>Grading Service</option>
              <option>Loan Enquiry</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slab-white">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-slab-surface px-3 py-2.5 text-sm text-slab-white placeholder-slab-muted focus:border-slab-crimson focus:outline-none"
              placeholder="Tell us what you're looking for..."
            />
          </div>
          <Button type="submit" size="lg">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
