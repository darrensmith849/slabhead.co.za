import { products } from "@/data/products";
import type { Product, ProductCategory, GradeCompany } from "./types";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(count: number = 8): Product[] {
  return products
    .filter((p) => p.availability === "InStock")
    .sort((a, b) => new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime())
    .slice(0, count);
}

export function getGrailProducts(count: number = 3): Product[] {
  return products
    .filter((p) => p.price >= 5000)
    .sort((a, b) => b.price - a.price)
    .slice(0, count);
}

export function getNewDrops(count: number = 8): Product[] {
  return [...products]
    .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
    .slice(0, count);
}

export function getAllCategories(): ProductCategory[] {
  const cats = new Set(products.map((p) => p.category));
  return Array.from(cats) as ProductCategory[];
}

export function getAllGradeCompanies(): GradeCompany[] {
  const grades = new Set(
    products
      .filter((p) => p.gradeCompany)
      .map((p) => p.gradeCompany as GradeCompany)
  );
  return Array.from(grades);
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of products) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }
  return counts;
}

export function getRelatedProducts(product: Product, count: number = 4): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, count);
}
