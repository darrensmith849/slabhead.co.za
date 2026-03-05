import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="font-mono text-6xl font-bold text-slab-crimson">404</span>
      <h1 className="mt-4 text-2xl font-bold text-slab-white">Page Not Found</h1>
      <p className="mt-2 text-slab-muted">
        This card must have slipped out of the binder. Let&apos;s get you back on track.
      </p>
      <div className="mt-6 flex gap-3">
        <Button href="/">Home</Button>
        <Button href="/shop" variant="secondary">
          Shop
        </Button>
      </div>
    </div>
  );
}
