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
  onCategoryChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const selectStyles =
  "rounded-lg border border-white/10 bg-slab-surface px-3 py-2 text-sm text-slab-white focus:border-slab-crimson focus:outline-none";

export default function FilterBar({
  categories,
  gradeCompanies,
  selectedCategory,
  selectedGrade,
  selectedAvailability,
  searchQuery,
  sortBy,
  onCategoryChange,
  onGradeChange,
  onAvailabilityChange,
  onSearchChange,
  onSortChange,
}: FilterBarProps) {
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value),
    [onSearchChange]
  );

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/5 bg-slab-charcoal p-4 sm:flex-row sm:flex-wrap sm:items-center">
      {/* Search */}
      <div className="relative flex-1 sm:min-w-[200px]">
        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slab-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search cards..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full rounded-lg border border-white/10 bg-slab-surface py-2 pl-9 pr-3 text-sm text-slab-white placeholder-slab-muted focus:border-slab-crimson focus:outline-none"
        />
      </div>

      {/* Category */}
      <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} className={selectStyles}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Grade Company */}
      <select value={selectedGrade} onChange={(e) => onGradeChange(e.target.value)} className={selectStyles}>
        <option value="">All Grades</option>
        {gradeCompanies.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      {/* Availability */}
      <select value={selectedAvailability} onChange={(e) => onAvailabilityChange(e.target.value)} className={selectStyles}>
        <option value="">All Stock</option>
        <option value="InStock">In Stock</option>
        <option value="OutOfStock">Sold</option>
      </select>

      {/* Sort */}
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} className={selectStyles}>
        <option value="newest">Newest First</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name">Name A-Z</option>
      </select>
    </div>
  );
}
