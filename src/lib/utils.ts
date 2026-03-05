import type { GradeCompany } from "./types";

export function formatPrice(price: number): string {
  return `R ${price.toLocaleString("en-ZA")}`;
}

export function gradeColor(company: GradeCompany | null | undefined): string {
  switch (company) {
    case "PSA":
      return "bg-slab-gold text-slab-black";
    case "CGC":
      return "bg-slab-blue text-white";
    case "BGS":
    case "Beckett":
      return "bg-slab-silver text-slab-black";
    case "PCG":
      return "bg-emerald-500 text-white";
    default:
      return "bg-slab-surface text-slab-white";
  }
}

export function isGemMint(score: number | undefined): boolean {
  return score !== undefined && score >= 10;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
