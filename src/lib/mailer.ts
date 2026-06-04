/**
 * Shared mail transport.
 *
 * Reads SMTP config from env. If SMTP_HOST is unset, mail is a no-op and the
 * caller gets `{ skipped: true }` — useful for dev / staging without an SMTP
 * provider. In production, set:
 *
 *   SMTP_HOST       e.g. smtp.xneelo.co.za
 *   SMTP_PORT       e.g. 587
 *   SMTP_USER       e.g. info@slabhead.co.za
 *   SMTP_PASS       <secret>
 *   SMTP_FROM       e.g. "Slabhead <info@slabhead.co.za>"
 *   CONTACT_TO_EMAIL e.g. info@slabhead.co.za
 *   NEWSLETTER_TO_EMAIL e.g. info@slabhead.co.za
 */
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let cached: Transporter | null = null;

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransport(): Transporter | null {
  if (!isMailConfigured()) return null;
  if (cached) return cached;

  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return cached;
}

export type SendArgs = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export async function sendMail({
  to,
  subject,
  text,
  html,
  replyTo,
}: SendArgs): Promise<{ ok: true; skipped?: boolean }> {
  const transport = getTransport();

  if (!transport) {
    // Dev / staging without SMTP — log and skip cleanly
    console.log("[mailer] skipped (SMTP not configured)", { to, subject });
    return { ok: true, skipped: true };
  }

  const from = process.env.SMTP_FROM ?? `Slabhead <${process.env.SMTP_USER}>`;
  await transport.sendMail({
    from,
    to,
    subject,
    text,
    ...(html ? { html } : {}),
    ...(replyTo ? { replyTo } : {}),
  });
  return { ok: true };
}
