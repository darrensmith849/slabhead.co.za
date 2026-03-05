import Link from "next/link";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  count: number;
  icon: React.ReactNode;
}

export default function CategoryCard({ title, description, href, count, icon }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-end overflow-hidden rounded-xl border border-white/5 bg-slab-surface p-6 transition-all duration-300 hover:border-slab-crimson/30 hover:shadow-[0_12px_48px_rgba(167,20,76,0.15)] min-h-[200px]"
    >
      <div className="absolute top-4 right-4 text-3xl opacity-20 transition-opacity group-hover:opacity-40">
        {icon}
      </div>
      <div>
        <span className="text-xs font-mono font-medium text-slab-muted">
          {count} items
        </span>
        <h3 className="mt-1 text-xl font-bold text-slab-white group-hover:text-slab-crimson transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-sm text-slab-muted line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
