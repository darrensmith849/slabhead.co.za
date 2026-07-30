import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { productImages, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";
import { storeProductImage } from "@/lib/product-image-storage";
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

  let image: File | null = null;
  let imageWidth = 0;
  let imageHeight = 0;
  let body: {
    name?: string;
    slug?: string;
    sku?: string;
    price?: number;
    category?: ProductCategory;
    description?: string;
  };

  if (request.headers.get("content-type")?.includes("multipart/form-data")) {
    const formData = await request.formData();
    const selectedImage = formData.get("image");
    image = selectedImage instanceof File ? selectedImage : null;
    imageWidth = Number(formData.get("imageWidth"));
    imageHeight = Number(formData.get("imageHeight"));
    body = {
      name: String(formData.get("name") || ""),
      slug: String(formData.get("slug") || ""),
      sku: String(formData.get("sku") || ""),
      price: Number(formData.get("price")),
      category: String(formData.get("category") || "") as ProductCategory,
      description: String(formData.get("description") || ""),
    };
  } else {
    body = (await request.json()) as typeof body;
  }

  if (!body.name?.trim() || !body.slug?.trim() || !body.sku?.trim() || body.price === undefined || !body.category) {
    return NextResponse.json({ error: "Name, slug, SKU, price and category are required" }, { status: 400 });
  }
  if (!ACTIVE_PRODUCT_CATEGORIES.includes(body.category) || !Number.isFinite(body.price) || body.price < 0) {
    return NextResponse.json({ error: "Invalid category or price" }, { status: 400 });
  }

  let storedImage = null;
  try {
    storedImage = image ? await storeProductImage(image, imageWidth, imageHeight) : null;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image upload failed" },
      { status: 400 },
    );
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
    localPath: storedImage?.localPath || "/images/placeholder-specimen.svg",
    width: storedImage?.width || 400,
    height: storedImage?.height || 533,
    sortOrder: 0,
  });

  refreshStorefront();
  return NextResponse.json({ id: created.id }, { status: 201 });
}
