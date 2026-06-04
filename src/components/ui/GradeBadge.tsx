import type { GradeCompany } from "@/lib/types";
import { gradeColor, isGemMint, cn } from "@/lib/utils";

interface GradeBadgeProps {
  company: GradeCompany;
  score: number;
  /** Larger variant for product detail page. Default: false. */
  large?: boolean;
}

const COMPANY_GLOW: Record<GradeCompany, string> = {
  PSA: "neon-glow-gold",
  CGC: "neon-glow-cyan",
  BGS: "neon-glow-gold",
  PCG: "neon-glow-cyan",
  Beckett: "neon-glow-gold",
};

export default function GradeBadge({ company, score, large = false }: GradeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded font-bold font-mono uppercase tracking-widest border",
        gradeColor(company),
        COMPANY_GLOW[company],
        large ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs",
        isGemMint(score) ? "grade-gem" : "",
      )}
    >
      {company} {score}
    </span>
  );
}
