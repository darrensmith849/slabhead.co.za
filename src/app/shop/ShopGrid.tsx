"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ui/ProductCard";
import FilterBar from "@/components/ui/FilterBar";
import RevealOnScroll from "@/components/atmosphere/RevealOnScroll";
import NeonBadge from "@/components/atmosphere/NeonBadge";
import type { Product, ProductCategory, GradeCompany } from "@/lib/types";

interface Props {
  products: Product[];
  categories: ProductCategory[];
  gradeCompanies: GradeCompany[];
}

export default function ShopGrid({ products: allProducts, categories, gradeCompanies }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.includes(q)),
      );
    }
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedGrade) result = result.filter((p) => p.gradeCompany === selectedGrade);
    if (selectedAvailability) result = result.filter((p) => p.availability === selectedAvailability);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        result.sort(
          (a, b) => new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime(),
        );
    }

    return result;
  }, [allProducts, searchQuery, selectedCategory, selectedGrade, selectedAvailability, sortBy]);

  const clearAll = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedGrade("");
    setSelectedAvailability("");
  };

  return (
    <>
      <FilterBar
        categories={categories}
        gradeCompanies={gradeCompanies}
        selectedCategory={selectedCategory}
        selectedGrade={selectedGrade}
        selectedAvailability={selectedAvailability}
        searchQuery={searchQuery}
        sortBy={sortBy}
        resultCount={filtered.length}
        onCategoryChange={setSelectedCategory}
        onGradeChange={setSelectedGrade}
        onAvailabilityChange={setSelectedAvailability}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
      />

      <RevealOnScroll
        variant="fade-up"
        stagger={0.04}
        className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6"
      >
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </RevealOnScroll>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <NeonBadge tone="crimson" intensity="medium" className="mx-auto">
            // NO_RESULTS
          </NeonBadge>
          <p className="mt-4 font-mono text-sm uppercase tracking-widest text-slab-muted">
            {">"} ADJUST QUERY PARAMETERS
          </p>
          <button
            onClick={clearAll}
            className="mt-6 rounded border border-slab-neon-cyan/40 bg-slab-neon-cyan/[0.04] px-5 py-2 font-mono text-sm uppercase tracking-widest text-slab-neon-cyan transition-colors hover:bg-slab-neon-cyan/10"
          >
            {">"} CLEAR_ALL_FILTERS
          </button>
        </div>
      )}
    </>
  );
}
