interface TrustBadgeProps {
  icon: React.ReactNode;
  label: string;
}

export default function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slab-surface/50 px-4 py-2 text-sm text-slab-muted">
      <span className="text-slab-crimson">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
