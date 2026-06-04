import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { products as productData } from "../src/data/products";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  console.log(`Seeding ${productData.length} products...\n`);

  for (const p of productData) {
    // Upsert product
    const existing = await db
      .select({ id: schema.products.id })
      .from(schema.products)
      .where(eq(schema.products.slug, p.slug))
      .limit(1);

    let productId: number;

    if (existing.length > 0) {
      productId = existing[0].id;
      await db
        .update(schema.products)
        .set({
          name: p.name,
          price: String(p.price),
          availability: p.availability,
          dateModified: p.dateModified,
        })
        .where(eq(schema.products.id, productId));
    } else {
      const [inserted] = await db
        .insert(schema.products)
        .values({
          slug: p.slug,
          name: p.name,
          description: p.description,
          sku: p.sku,
          price: String(p.price),
          currency: p.currency,
          priceValidUntil: p.priceValidUntil,
          availability: p.availability,
          condition: p.condition,
          category: p.category,
          subcategory: p.subcategory || null,
          gradeCompany: p.gradeCompany || null,
          gradeScore: p.gradeScore ? String(p.gradeScore) : null,
          era: p.era || null,
          edition: p.edition || null,
          datePublished: p.datePublished,
          dateModified: p.dateModified,
        })
        .returning({ id: schema.products.id });
      productId = inserted.id;
    }

    // Clear and re-insert images
    await db
      .delete(schema.productImages)
      .where(eq(schema.productImages.productId, productId));
    for (let i = 0; i < p.images.length; i++) {
      const img = p.images[i];
      await db.insert(schema.productImages).values({
        productId,
        url: img.url,
        localPath: img.localPath,
        width: img.width,
        height: img.height,
        sortOrder: i,
      });
    }

    // Clear and re-insert tags
    await db
      .delete(schema.productTags)
      .where(eq(schema.productTags.productId, productId));
    if (p.tags) {
      for (const tag of p.tags) {
        await db.insert(schema.productTags).values({ productId, tag });
      }
    }

    console.log(`  ✓ ${p.name}`);
  }

  console.log(`\nDone! ${productData.length} products seeded.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
