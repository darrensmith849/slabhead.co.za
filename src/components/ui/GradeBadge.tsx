import type { GradeCompany } from "@/lib/types";
import { gradeColor, isGemMint, cn } from "@/lib/utils";

interface GradeBadgeProps {
  company: GradeCompany;
  score: number;
}

export default function GradeBadge({ company, score }: GradeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold font-mono tracking-wide",
        gradeColor(company),
        isGemMint(score) && "grade-gem"
      )}
    >
      {company} {score}
    </span>
  );
}
