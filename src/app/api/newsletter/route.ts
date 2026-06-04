import { NextResponse } from "next/server";
import { sendMail, isMailConfigured } from "@/lib/mailer";

/**
 * Newsletter signup endpoint.
 *
 * Accepts an email address and forwards it to NEWSLETTER_TO_EMAIL so the
 * client can manually add it to their list (or wire to Mailchimp /
 * ConvertKit later). Honours basic anti-spam via honeypot field `hp`.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email ?? "").trim();
    const source = String(body.source ?? "footer").trim();
    const honeypot = String(body.hp ?? "").trim();

    if (honeypot) {
      // Bot trap — accept silently, do nothing
      return NextResponse.json({ ok: true });
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const to = process.env.NEWSLETTER_TO_EMAIL ?? "info@slabhead.co.za";

    const text = [
      "// SLABHEAD NEWSLETTER SIGNUP",
      "================================",
      `EMAIL:  ${email}`,
      `SOURCE: ${source}`,
      `TS:     ${new Date().toISOString()}`,
      "================================",
    ].join("\n");

    const result = await sendMail({
      to,
      subject: `[Slabhead] newsletter signup — ${email}`,
      text,
    });

    if (result.skipped) {
      console.log("[newsletter] queued (SMTP not configured)", {
        email,
        source,
        ts: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[newsletter] error", e);
    return NextResponse.json(
      { error: "Failed to process signup. Please try again." },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({
    ok: true,
    mailConfigured: isMailConfigured(),
  });
}
