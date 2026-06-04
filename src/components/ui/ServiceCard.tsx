import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  /** Show a "[ONLINE]" status indicator. Default: true. */
  showStatus?: boolean;
}

/**
 * Control panel "module" — bracketed corners + status light + electric border on hover.
 * Used in homepage Network section + /services-categories hub.
 */
export default function ServiceCard({
  title,
  description,
  href,
  icon,
  showStatus = true,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group bracketed relative flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-slab-charcoal/50 p-5 backdrop-blur-sm",
        "transition-all duration-300 hover:border-slab-neon-cyan/40 hover:bg-slab-charcoal/70",
      )}
    >
      {/* Status indicator */}
      {showStatus && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-slab-success">
          <span
            className="h-1.5 w-1.5 rounded-full bg-slab-success"
            style={{ boxShadow: "0 0 6px rgba(34, 197, 94, 0.8)" }}
          />
          [ONLINE]
        </span>
      )}

      {/* Icon block */}
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg border border-slab-neon-cyan/30 bg-slab-neon-cyan/[0.06] text-slab-neon-cyan",
          "transition-all duration-300 group-hover:border-slab-neon-cyan group-hover:bg-slab-neon-cyan/15 group-hover:neon-box-cyan",
        )}
      >
        {icon}
      </div>

      <h3 className="font-display text-sm uppercase tracking-wider text-slab-white">
        {title}
      </h3>
      <p className="text-xs leading-relaxed text-slab-muted">{description}</p>

      {/* Bottom action affordance */}
      <span className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/0 transition-all group-hover:text-slab-neon-cyan/80">
        {">"} ENTER
      </span>
    </Link>
  );
}
