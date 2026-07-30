import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { customers, orders, orderItems, cartSessions, cartItems, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { buildPayFastForm, getPayFastUrl } from "@/lib/payfast";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, firstName, lastName, phone, addressLine1, addressLine2, city, province, postalCode } = body;

  // Validate required fields
  if (!email || !firstName || !lastName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Get cart session
  const cookieStore = await cookies();
  const token = cookieStore.get("cart_session")?.value;
  if (!token) {
    return NextResponse.json({ error: "No cart found" }, { status: 400 });
  }

  const sessions = await db
    .select()
    .from(cartSessions)
    .where(eq(cartSessions.sessionToken, token))
    .limit(1);

  if (sessions.length === 0) {
    return NextResponse.json({ error: "Cart session not found" }, { status: 400 });
  }

  const sessionId = sessions[0].id;

  // Get cart items with product details
  const items = await db
    .select({
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      name: products.name,
      price: products.price,
      availability: products.availability,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.cartSessionId, sessionId));

  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  // Check all items are still in stock
  const outOfStock = items.filter((i) => i.availability !== "InStock");
  if (outOfStock.length > 0) {
    return NextResponse.json(
      { error: `Some items are out of stock: ${outOfStock.map((i) => i.name).join(", ")}` },
      { status: 400 }
    );
  }

  // Find or create customer
  const existingCustomer = await db
    .select()
    .from(customers)
    .where(eq(customers.email, email))
    .limit(1);

  let customerId: number;
  if (existingCustomer.length > 0) {
    customerId = existingCustomer[0].id;
    await db.update(customers).set({ firstName, lastName, phone, addressLine1, addressLine2, city, province, postalCode }).where(eq(customers.id, customerId));
  } else {
    const [newCustomer] = await db
      .insert(customers)
      .values({ email, firstName, lastName, phone, addressLine1, addressLine2, city, province, postalCode })
      .returning({ id: customers.id });
    customerId = newCustomer.id;
  }

  // Calculate total
  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  // Create order
  const [order] = await db
    .insert(orders)
    .values({ customerId, total: String(total), status: "pending" })
    .returning({ id: orders.id });

  // Create order items
  for (const item of items) {
    await db.insert(orderItems).values({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.price,
    });
  }

  // Build PayFast form
  const itemNames = items.map((i) => i.name).join(", ");
  const paymentData = buildPayFastForm({
    orderId: order.id,
    total,
    customerEmail: email,
    customerFirstName: firstName,
    customerLastName: lastName,
    itemName: itemNames.length > 100 ? `${itemNames.slice(0, 97)}...` : itemNames,
    customerPhone: phone,
  });

  return NextResponse.json({
    orderId: order.id,
    payFastUrl: getPayFastUrl(),
    payFastData: paymentData,
  });
}
