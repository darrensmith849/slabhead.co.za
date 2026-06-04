import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { cartSessions, cartItems, products, productImages } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

async function getOrCreateSession() {
  const cookieStore = await cookies();
  let token = cookieStore.get("cart_session")?.value;

  if (token) {
    const sessions = await db
      .select()
      .from(cartSessions)
      .where(eq(cartSessions.sessionToken, token))
      .limit(1);

    if (sessions.length > 0) return { token, sessionId: sessions[0].id };
  }

  // Create new session
  token = randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const [session] = await db
    .insert(cartSessions)
    .values({ sessionToken: token, expiresAt })
    .returning({ id: cartSessions.id });

  cookieStore.set("cart_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return { token, sessionId: session.id };
}

async function getCartItems(sessionId: number) {
  const items = await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      slug: products.slug,
      name: products.name,
      price: products.price,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartSessionId, sessionId));

  // Get images for all products in cart
  const productIds = items.map((i) => i.productId);
  let images: { productId: number; localPath: string }[] = [];
  if (productIds.length > 0) {
    images = await db
      .select({ productId: productImages.productId, localPath: productImages.localPath })
      .from(productImages)
      .where(sql`${productImages.productId} IN (${sql.join(productIds.map(id => sql`${id}`), sql`, `)})`)
      .orderBy(productImages.sortOrder);
  }

  return items.map((item) => ({
    productId: item.productId,
    slug: item.slug,
    name: item.name,
    price: Number(item.price),
    quantity: item.quantity,
    image: images.find((img) => img.productId === item.productId)?.localPath || "",
  }));
}

// GET — fetch cart
export async function GET() {
  try {
    const { sessionId } = await getOrCreateSession();
    const items = await getCartItems(sessionId);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

// POST — add item
export async function POST(request: NextRequest) {
  const { sessionId } = await getOrCreateSession();
  const body = await request.json();
  const { productId, quantity = 1 } = body;

  // Check if already in cart
  const existing = await db
    .select()
    .from(cartItems)
    .where(and(eq(cartItems.cartSessionId, sessionId), eq(cartItems.productId, productId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(cartItems)
      .set({ quantity: existing[0].quantity + quantity })
      .where(eq(cartItems.id, existing[0].id));
  } else {
    await db.insert(cartItems).values({ cartSessionId: sessionId, productId, quantity });
  }

  const items = await getCartItems(sessionId);
  return NextResponse.json({ items });
}

// PATCH — update quantity
export async function PATCH(request: NextRequest) {
  const { sessionId } = await getOrCreateSession();
  const { productId, quantity } = await request.json();

  if (quantity <= 0) {
    await db
      .delete(cartItems)
      .where(and(eq(cartItems.cartSessionId, sessionId), eq(cartItems.productId, productId)));
  } else {
    await db
      .update(cartItems)
      .set({ quantity })
      .where(and(eq(cartItems.cartSessionId, sessionId), eq(cartItems.productId, productId)));
  }

  const items = await getCartItems(sessionId);
  return NextResponse.json({ items });
}

// DELETE — remove item or clear cart
export async function DELETE(request: NextRequest) {
  const { sessionId } = await getOrCreateSession();
  const body = await request.json();

  if (body.clearAll) {
    await db.delete(cartItems).where(eq(cartItems.cartSessionId, sessionId));
  } else {
    await db
      .delete(cartItems)
      .where(and(eq(cartItems.cartSessionId, sessionId), eq(cartItems.productId, body.productId)));
  }

  const items = await getCartItems(sessionId);
  return NextResponse.json({ items });
}
