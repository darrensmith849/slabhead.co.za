import type { Product, ProductCategory, GradeCompany } from "./types";

// Static fallback data (used at build time when DATABASE_URL is not set)
import { products as staticProducts } from "@/data/products";

function useDb(): boolean {
  return !!process.env.DATABASE_URL;
}

// ── Static data helpers (fallback) ──

function staticGetAll(): Product[] {
  return staticProducts;
}

// ── Database helpers ──

async function dbGetAll(): Promise<Product[]> {
  const { db } = await import("@/db");
  const { products, productImages, productTags } = await import("@/db/schema");
  const { sql } = await import("drizzle-orm");

  const rows = await db.select().from(products);
  return hydrateFromDb(rows);
}

async function hydrateFromDb(
  rows: { id: number; slug: string; name: string; description: string; sku: string; price: string; currency: string; priceValidUntil: string; availability: string; condition: string; category: string; subcategory: string | null; gradeCompany: string | null; gradeScore: string | null; era: string | null; edition: string | null; datePublished: string; dateModified: string }[]
): Promise<Product[]> {
  if (rows.length === 0) return [];

  const { db } = await import("@/db");
  const { productImages, productTags } = await import("@/db/schema");
  const { sql } = await import("drizzle-orm");

  const ids = rows.map((r) => r.id);

  const allImages = await db
    .select()
    .from(productImages)
    .where(sql`${productImages.productId} IN (${sql.join(ids.map((id) => sql`${id}`), sql`, `)})`);

  const allTags = await db
    .select()
    .from(productTags)
    .where(sql`${productTags.productId} IN (${sql.join(ids.map((id) => sql`${id}`), sql`, `)})`);

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    sku: row.sku,
    price: Number(row.price),
    currency: "ZAR" as const,
    priceValidUntil: row.priceValidUntil,
    availability: row.availability as Product["availability"],
    condition: "NewCondition" as const,
    category: row.category as ProductCategory,
    subcategory: row.subcategory || undefined,
    gradeCompany: (row.gradeCompany as GradeCompany) || undefined,
    gradeScore: row.gradeScore ? Number(row.gradeScore) : undefined,
    era: row.era || undefined,
    edition: row.edition || undefined,
    images: allImages
      .filter((img) => img.productId === row.id)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((img) => ({ url: img.url, localPath: img.localPath, width: img.width, height: img.height })),
    datePublished: row.datePublished,
    dateModified: row.dateModified,
    tags: allTags.filter((t) => t.productId === row.id).map((t) => t.tag),
  }));
}

// ── Public API ──

export async function getAllProducts(): Promise<Product[]> {
  if (!useDb()) return staticGetAll();
  return dbGetAll();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!useDb()) return staticProducts.find((p) => p.slug === slug);

  const { db } = await import("@/db");
  const { products } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");

  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (rows.length === 0) return undefined;
  const result = await hydrateFromDb(rows);
  return result[0];
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  if (!useDb()) return staticProducts.filter((p) => p.category === category);

  const { db } = await import("@/db");
  const { products } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");

  const rows = await db.select().from(products).where(eq(products.category, category));
  return hydrateFromDb(rows);
}

export async function getFeaturedProducts(count = 8): Promise<Product[]> {
  if (!useDb()) {
    return staticProducts
      .filter((p) => p.availability === "InStock")
      .sort((a, b) => new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime())
      .slice(0, count);
  }

  const { db } = await import("@/db");
  const { products } = await import("@/db/schema");
  const { eq, desc } = await import("drizzle-orm");

  const rows = await db.select().from(products).where(eq(products.availability, "InStock")).orderBy(desc(products.dateModified)).limit(count);
  return hydrateFromDb(rows);
}

export async function getGrailProducts(count = 3): Promise<Product[]> {
  if (!useDb()) {
    return staticProducts
      .filter((p) => p.price >= 5000)
      .sort((a, b) => b.price - a.price)
      .slice(0, count);
  }

  const { db } = await import("@/db");
  const { products } = await import("@/db/schema");
  const { gte, desc } = await import("drizzle-orm");

  const rows = await db.select().from(products).where(gte(products.price, "5000")).orderBy(desc(products.price)).limit(count);
  return hydrateFromDb(rows);
}

export async function getNewDrops(count = 8): Promise<Product[]> {
  if (!useDb()) {
    return [...staticProducts]
      .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
      .slice(0, count);
  }

  const { db } = await import("@/db");
  const { products } = await import("@/db/schema");
  const { desc } = await import("drizzle-orm");

  const rows = await db.select().from(products).orderBy(desc(products.datePublished)).limit(count);
  return hydrateFromDb(rows);
}

export async function getAllCategories(): Promise<ProductCategory[]> {
  if (!useDb()) {
    return Array.from(new Set(staticProducts.map((p) => p.category)));
  }

  const { db } = await import("@/db");
  const { products } = await import("@/db/schema");

  const rows = await db.selectDistinct({ category: products.category }).from(products);
  return rows.map((r) => r.category as ProductCategory);
}

export async function getAllGradeCompanies(): Promise<GradeCompany[]> {
  if (!useDb()) {
    return Array.from(new Set(staticProducts.filter((p) => p.gradeCompany).map((p) => p.gradeCompany as GradeCompany)));
  }

  const { db } = await import("@/db");
  const { products } = await import("@/db/schema");
  const { sql } = await import("drizzle-orm");

  const rows = await db.selectDistinct({ gradeCompany: products.gradeCompany }).from(products).where(sql`${products.gradeCompany} IS NOT NULL`);
  return rows.map((r) => r.gradeCompany as GradeCompany);
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  if (!useDb()) {
    const counts: Record<string, number> = {};
    for (const p of staticProducts) counts[p.category] = (counts[p.category] || 0) + 1;
    return counts;
  }

  const { db } = await import("@/db");
  const { products } = await import("@/db/schema");
  const { sql } = await import("drizzle-orm");

  const rows = await db.select({ category: products.category, count: sql<number>`count(*)` }).from(products).groupBy(products.category);
  const counts: Record<string, number> = {};
  for (const row of rows) counts[row.category] = Number(row.count);
  return counts;
}

export async function getRelatedProducts(product: Product, count = 4): Promise<Product[]> {
  if (!useDb()) {
    return staticProducts
      .filter((p) => p.slug !== product.slug && p.category === product.category)
      .slice(0, count);
  }

  const { db } = await import("@/db");
  const { products } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");

  const rows = await db.select().from(products).where(eq(products.category, product.category)).limit(count + 1);
  const filtered = rows.filter((r) => r.slug !== product.slug).slice(0, count);
  return hydrateFromDb(filtered);
}
