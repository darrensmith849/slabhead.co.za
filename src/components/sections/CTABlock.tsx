import Button from "@/components/ui/Button";

interface CTABlockProps {
  headline: string;
  description: string;
  buttonText: string;
  href: string;
  variant?: "crimson" | "dark";
}

export default function CTABlock({
  headline,
  description,
  buttonText,
  href,
  variant = "crimson",
}: CTABlockProps) {
  return (
    <section
      className={`py-16 ${
        variant === "crimson"
          ? "bg-gradient-to-r from-slab-crimson/20 via-slab-black to-slab-crimson/20"
          : "bg-slab-charcoal"
      }`}
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-slab-white sm:text-3xl">
          {headline}
        </h2>
        <p className="mt-3 text-slab-muted">{description}</p>
        <div className="mt-6">
          <Button href={href} size="lg">
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
