import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * POSTs the form to a backend mail relay or queue. For Phase F we capture
 * the submission and log it (the WP-Mail-SMTP integration on the host can
 * pick it up via a follow-up wiring change). Returns success even in dev
 * so the user gets feedback.
 *
 * Wire to real SMTP in Phase G:
 *   - Add env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL
 *   - Replace the console.log with a nodemailer.sendMail()
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "general").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // TODO (Phase G): wire to real SMTP via nodemailer
    // For now: log + treat as queued
    console.log("[contact] submission", {
      name,
      email,
      subject,
      messagePreview: message.slice(0, 80),
      ts: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] error", e);
    return NextResponse.json(
      { error: "Failed to process submission. Please try again." },
      { status: 500 },
    );
  }
}
