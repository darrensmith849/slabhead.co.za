import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { productImages, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";
import { ACTIVE_PRODUCT_CATEGORIES, type Availability, type ProductCategory } from "@/lib/types";

function authorised(request: NextRequest): boolean {
  return Boolean(verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value));
}

function databaseReady(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function refreshStorefront() {
  ["/", "/shop", "/new", "/pokemon", "/dragon-ball-z", "/one-piece"].forEach((path) =>
    revalidatePath(path),
  );
}

export async function PATCH(request: NextRequest) {
  if (!authorised(request)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  if (!databaseReady()) return NextResponse.json({ error: "Database is not configured" }, { status: 503 });

  const body = (await request.json()) as {
    id?: number;
    name?: string;
    price?: number;
    category?: ProductCategory;
    availability?: Availability;
  };
  if (!body.id) return NextResponse.json({ error: "Product id is required" }, { status: 400 });
  if (body.category && !ACTIVE_PRODUCT_CATEGORIES.includes(body.category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  if (body.price !== undefined && (!Number.isFinite(body.price) || body.price < 0)) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const [updated] = await db
    .update(products)
    .set({
      ...(body.name?.trim() ? { name: body.name.trim() } : {}),
      ...(body.price !== undefined ? { price: body.price.toFixed(2) } : {}),
      ...(body.category ? { category: body.category } : {}),
      ...(body.availability ? { availability: body.availability } : {}),
      dateModified: new Date().toISOString().slice(0, 10),
    })
    .where(eq(products.id, body.id))
    .returning();

  if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  refreshStorefront();
  return NextResponse.json({ product: updated });
}

export async function POST(request: NextRequest) {
  if (!authorised(request)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  if (!databaseReady()) return NextResponse.json({ error: "Database is not configured" }, { status: 503 });

  const body = (await request.json()) as {
    name?: string;
    slug?: string;
    sku?: string;
    price?: number;
    category?: ProductCategory;
    description?: string;
  };
  if (!body.name?.trim() || !body.slug?.trim() || !body.sku?.trim() || body.price === undefined || !body.category) {
    return NextResponse.json({ error: "Name, slug, SKU, price and category are required" }, { status: 400 });
  }
  if (!ACTIVE_PRODUCT_CATEGORIES.includes(body.category) || !Number.isFinite(body.price) || body.price < 0) {
    return NextResponse.json({ error: "Invalid category or price" }, { status: 400 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const [created] = await db
    .insert(products)
    .values({
      name: body.name.trim(),
      slug: body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      description: body.description?.trim() || body.name.trim(),
      sku: body.sku.trim(),
      price: body.price.toFixed(2),
      priceValidUntil: `${new Date().getFullYear() + 2}-12-31`,
      availability: "InStock",
      condition: "NewCondition",
      category: body.category,
      datePublished: today,
      dateModified: today,
    })
    .returning({ id: products.id });

  await db.insert(productImages).values({
    productId: created.id,
    url: "",
    localPath: "/images/placeholder-specimen.svg",
    width: 400,
    height: 533,
    sortOrder: 0,
  });

  refreshStorefront();
  return NextResponse.json({ id: created.id }, { status: 201 });
}
