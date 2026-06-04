import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products, customers, cartItems, cartSessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { validateITN } from "@/lib/payfast";
import { createSageInvoice } from "@/lib/sage";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = String(value);
  });

  console.log("[PayFast ITN] Received:", data.m_payment_id, data.payment_status);

  // Validate signature
  if (!validateITN(data)) {
    console.error("[PayFast ITN] Invalid signature");
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const orderId = Number(data.m_payment_id);
  if (!orderId) {
    return new NextResponse("Invalid order ID", { status: 400 });
  }

  // Get the order
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  if (!order) {
    console.error(`[PayFast ITN] Order ${orderId} not found`);
    return new NextResponse("Order not found", { status: 404 });
  }

  // Verify payment amount matches
  const expectedAmount = Number(order.total).toFixed(2);
  if (data.amount_gross !== expectedAmount) {
    console.error(`[PayFast ITN] Amount mismatch: expected ${expectedAmount}, got ${data.amount_gross}`);
    return new NextResponse("Amount mismatch", { status: 400 });
  }

  if (data.payment_status === "COMPLETE") {
    // Update order status
    await db
      .update(orders)
      .set({ status: "paid", paymentRef: data.pf_payment_id, updatedAt: new Date() })
      .where(eq(orders.id, orderId));

    // Get customer and order items for Sage invoice
    const [customer] = await db.select().from(customers).where(eq(customers.id, order.customerId)).limit(1);

    const items = await db
      .select({
        name: products.name,
        quantity: orderItems.quantity,
        unitPrice: orderItems.unitPrice,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, orderId));

    // Create Sage Pastel invoice
    if (customer) {
      const sageInvoiceId = await createSageInvoice({
        customerEmail: customer.email,
        customerName: `${customer.firstName} ${customer.lastName}`,
        reference: `SH-${orderId}`,
        lineItems: items.map((item) => ({
          description: item.name,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice),
        })),
      });

      if (sageInvoiceId) {
        await db
          .update(orders)
          .set({ sageInvoiceId })
          .where(eq(orders.id, orderId));
      }
    }

    // Clear the cart (find session linked to this customer)
    const sessions = await db
      .select()
      .from(cartSessions)
      .where(eq(cartSessions.customerId, order.customerId));

    for (const session of sessions) {
      await db.delete(cartItems).where(eq(cartItems.cartSessionId, session.id));
    }

    console.log(`[PayFast ITN] Order ${orderId} paid successfully`);
  }

  return new NextResponse("OK", { status: 200 });
}
