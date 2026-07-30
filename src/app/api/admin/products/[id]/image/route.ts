import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { productImages, products } from "@/db/schema";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";
import { storeProductImage } from "@/lib/product-image-storage";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function authorised(request: NextRequest): boolean {
  return Boolean(verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value));
}

function refreshStorefront() {
  ["/", "/shop", "/new", "/pokemon", "/dragon-ball-z", "/one-piece"].forEach((route) =>
    revalidatePath(route),
  );
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  if (!authorised(request)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Database is not configured" }, { status: 503 });
  }

  const productId = Number((await params).id);
  if (!Number.isInteger(productId) || productId <= 0) {
    return NextResponse.json({ error: "Invalid product id" }, { status: 400 });
  }

  const formData = await request.formData();
  const image = formData.get("image");
  if (!(image instanceof File)) {
    return NextResponse.json({ error: "An image file is required" }, { status: 400 });
  }

  try {
    const stored = await storeProductImage(
      image,
      Number(formData.get("imageWidth")),
      Number(formData.get("imageHeight")),
    );
    const existing = await db
      .select({ id: productImages.id })
      .from(productImages)
      .where(eq(productImages.productId, productId))
      .limit(1);

    if (existing[0]) {
      await db
        .update(productImages)
        .set({ url: "", ...stored })
        .where(eq(productImages.id, existing[0].id));
    } else {
      await db.insert(productImages).values({ productId, url: "", ...stored, sortOrder: 0 });
    }

    await db
      .update(products)
      .set({ dateModified: new Date().toISOString().slice(0, 10) })
      .where(eq(products.id, productId));
    refreshStorefront();
    return NextResponse.json({ image: stored });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Image upload failed" },
      { status: 400 },
    );
  }
}
