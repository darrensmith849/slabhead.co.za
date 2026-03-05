import Button from "@/components/ui/Button";

interface Step {
  title: string;
  description: string;
}

interface ServicePageProps {
  title: string;
  tagline: string;
  description: string;
  steps: Step[];
  ctaText: string;
  ctaHref: string;
}

export default function ServicePage({
  title,
  tagline,
  description,
  steps,
  ctaText,
  ctaHref,
}: ServicePageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <span className="inline-flex items-center rounded-full border border-slab-crimson/30 bg-slab-crimson/10 px-3 py-1 text-xs font-medium text-slab-crimson">
          Slabhead Service
        </span>
        <h1 className="mt-4 text-4xl font-bold text-slab-white">{title}</h1>
        <p className="mt-2 text-lg text-slab-crimson">{tagline}</p>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slab-muted">
          {description}
        </p>
      </div>

      {/* How It Works */}
      <div className="mt-16">
        <h2 className="text-center text-xl font-bold text-slab-white">How It Works</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-slab-surface p-6"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slab-crimson/10 font-mono text-sm font-bold text-slab-crimson">
                {i + 1}
              </div>
              <h3 className="mt-3 font-semibold text-slab-white">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slab-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Button href={ctaHref} size="lg">
          {ctaText}
        </Button>
      </div>
    </div>
  );
}
