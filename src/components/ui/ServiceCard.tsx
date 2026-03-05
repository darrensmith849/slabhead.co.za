import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export default function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-xl border border-white/5 bg-slab-surface/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-slab-crimson/30 hover:bg-slab-surface"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slab-crimson/10 text-slab-crimson transition-colors group-hover:bg-slab-crimson group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slab-white">{title}</h3>
      <p className="text-xs leading-relaxed text-slab-muted">{description}</p>
    </Link>
  );
}
