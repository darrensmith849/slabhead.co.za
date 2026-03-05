"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ui/ProductCard";
import FilterBar from "@/components/ui/FilterBar";
import { getAllProducts, getAllCategories, getAllGradeCompanies } from "@/lib/products";

export default function ShopGrid() {
  const allProducts = getAllProducts();
  const categories = getAllCategories();
  const gradeCompanies = getAllGradeCompanies();

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
          p.tags?.some((t) => t.includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedGrade) {
      result = result.filter((p) => p.gradeCompany === selectedGrade);
    }

    if (selectedAvailability) {
      result = result.filter((p) => p.availability === selectedAvailability);
    }

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
          (a, b) =>
            new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime()
        );
    }

    return result;
  }, [allProducts, searchQuery, selectedCategory, selectedGrade, selectedAvailability, sortBy]);

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
        onCategoryChange={setSelectedCategory}
        onGradeChange={setSelectedGrade}
        onAvailabilityChange={setSelectedAvailability}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
      />

      <p className="mt-4 text-sm text-slab-muted">
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-slab-muted">No products match your filters.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("");
              setSelectedGrade("");
              setSelectedAvailability("");
            }}
            className="mt-3 text-sm font-medium text-slab-crimson hover:text-slab-crimson-light"
          >
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
