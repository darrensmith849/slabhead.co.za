"use client";

import { useCallback } from "react";
import type { ProductCategory, GradeCompany } from "@/lib/types";

interface FilterBarProps {
  categories: ProductCategory[];
  gradeCompanies: GradeCompany[];
  selectedCategory: string;
  selectedGrade: string;
  selectedAvailability: string;
  searchQuery: string;
  sortBy: string;
  /** Optional running result count to display at the right. */
  resultCount?: number;
  onCategoryChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const labelStyle =
  "font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/70";

const inputStyle =
  "w-full rounded border border-white/10 bg-slab-black/40 px-3 py-2 font-mono text-sm text-slab-white placeholder:text-slab-muted/50 transition-colors focus:border-slab-neon-cyan focus:outline-none focus:ring-1 focus:ring-slab-neon-cyan/30";

export default function FilterBar({
  categories,
  gradeCompanies,
  selectedCategory,
  selectedGrade,
  selectedAvailability,
  searchQuery,
  sortBy,
  resultCount,
  onCategoryChange,
  onGradeChange,
  onAvailabilityChange,
  onSearchChange,
  onSortChange,
}: FilterBarProps) {
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value),
    [onSearchChange],
  );

  return (
    <div className="bracketed rounded-xl border border-slab-neon-cyan/20 bg-slab-charcoal/60 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-slab-neon-cyan/80 neon-glow-cyan">
          // QUERY_TERMINAL
        </span>
        {typeof resultCount === "number" && (
          <span
            key={resultCount}
            className="rounded border border-slab-neon-cyan/30 bg-slab-neon-cyan/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/80"
            style={{ animation: "neon-flicker 0.3s steps(2) 1" }}
          >
            RESULTS: {resultCount}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className={labelStyle}>{">"} QUERY:</label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slab-neon-cyan/60">
              ⌕
            </span>
            <input
              type="text"
              placeholder="search specimens…"
              value={searchQuery}
              onChange={handleSearch}
              className={`${inputStyle} pl-9`}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className={labelStyle}>{">"} CATEGORY:</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={`${inputStyle} mt-1`}
          >
            <option value="">[ ALL ]</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Grade */}
        <div>
          <label className={labelStyle}>{">"} GRADE:</label>
          <select
            value={selectedGrade}
            onChange={(e) => onGradeChange(e.target.value)}
            className={`${inputStyle} mt-1`}
          >
            <option value="">[ ANY ]</option>
            {gradeCompanies.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className={labelStyle}>{">"} STATUS:</label>
          <select
            value={selectedAvailability}
            onChange={(e) => onAvailabilityChange(e.target.value)}
            className={`${inputStyle} mt-1`}
          >
            <option value="">[ ANY ]</option>
            <option value="InStock">IN_STOCK</option>
            <option value="OutOfStock">ARCHIVED</option>
          </select>
        </div>

        {/* Sort */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className={labelStyle}>{">"} SORT:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={`${inputStyle} mt-1`}
          >
            <option value="newest">NEWEST_FIRST</option>
            <option value="price-asc">PRICE_ASC</option>
            <option value="price-desc">PRICE_DESC</option>
            <option value="name">NAME_A→Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
