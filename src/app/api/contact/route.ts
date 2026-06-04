import { NextResponse } from "next/server";
import { sendMail, isMailConfigured } from "@/lib/mailer";

/**
 * Contact form endpoint.
 *
 * Validates the submission and dispatches it to CONTACT_TO_EMAIL via the
 * shared mailer. If SMTP is not configured (dev / staging), the request is
 * still accepted and the payload is logged — the user gets a green path.
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

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message too long. Please keep it under 5000 characters." },
        { status: 400 },
      );
    }

    const to = process.env.CONTACT_TO_EMAIL ?? "info@slabhead.co.za";

    const lines = [
      "// SLABHEAD TRANSMISSION",
      "================================",
      `FROM:    ${name} <${email}>`,
      `SUBJECT: ${subject}`,
      `TS:      ${new Date().toISOString()}`,
      "--------------------------------",
      message,
      "================================",
    ];
    const text = lines.join("\n");

    const html = `
      <div style="font-family: 'JetBrains Mono', monospace; background:#0A0A0F; color:#F8FAFC; padding:24px; border-radius:8px;">
        <div style="color:#00F0FF; font-size:11px; letter-spacing:2px; text-transform:uppercase;">// SLABHEAD TRANSMISSION</div>
        <hr style="border:0; border-top:1px solid #1A0F2E; margin:16px 0;" />
        <p><strong style="color:#00F0FF;">FROM:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong style="color:#00F0FF;">SUBJECT:</strong> ${escapeHtml(subject)}</p>
        <p><strong style="color:#00F0FF;">TS:</strong> ${new Date().toISOString()}</p>
        <hr style="border:0; border-top:1px solid #1A0F2E; margin:16px 0;" />
        <pre style="white-space:pre-wrap; font-family: inherit; line-height:1.6;">${escapeHtml(message)}</pre>
      </div>
    `;

    const result = await sendMail({
      to,
      subject: `[Slabhead] ${subject} — ${name}`,
      text,
      html,
      replyTo: email,
    });

    if (result.skipped) {
      console.log("[contact] queued (SMTP not configured)", {
        name,
        email,
        subject,
        messagePreview: message.slice(0, 80),
        ts: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] error", e);
    return NextResponse.json(
      { error: "Failed to process submission. Please try again." },
      { status: 500 },
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Surface mail status for ops checks
export function GET() {
  return NextResponse.json({
    ok: true,
    mailConfigured: isMailConfigured(),
  });
}
