import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products, customers, cartItems, cartSessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  validateITN,
  validatePayFastMerchant,
  validatePayFastServerConfirmation,
} from "@/lib/payfast";
import { createSageInvoice } from "@/lib/sage";
import { notifyPaidOrderViaWhatsApp } from "@/lib/whatsapp";

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

  if (!validatePayFastMerchant(data)) {
    console.error("[PayFast ITN] Merchant mismatch");
    return new NextResponse("Invalid merchant", { status: 400 });
  }

  if (!(await validatePayFastServerConfirmation(data))) {
    console.error("[PayFast ITN] Server confirmation rejected");
    return new NextResponse("Invalid server confirmation", { status: 400 });
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
  const expectedAmount = Number(order.total);
  if (Math.abs(Number(data.amount_gross) - expectedAmount) > 0.01) {
    console.error(`[PayFast ITN] Amount mismatch: expected ${expectedAmount}, got ${data.amount_gross}`);
    return new NextResponse("Amount mismatch", { status: 400 });
  }

  if (order.status === "paid") {
    return new NextResponse("OK", { status: 200 });
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
        productId: orderItems.productId,
        name: products.name,
        quantity: orderItems.quantity,
        unitPrice: orderItems.unitPrice,
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, orderId));

    // Each storefront listing represents a unique collectable. Mark every
    // purchased listing unavailable immediately after verified payment.
    for (const item of items) {
      await db
        .update(products)
        .set({ availability: "OutOfStock", dateModified: new Date().toISOString().slice(0, 10) })
        .where(eq(products.id, item.productId));
    }

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

    if (customer) {
      await notifyPaidOrderViaWhatsApp({
        orderId,
        total: expectedAmount,
        customerName: `${customer.firstName} ${customer.lastName}`.trim(),
        customerPhone: customer.phone,
        itemSummary: items.map((item) => `${item.quantity}× ${item.name}`).join(", "),
      });
    }

    console.log(`[PayFast ITN] Order ${orderId} paid successfully`);
  }

  return new NextResponse("OK", { status: 200 });
}
