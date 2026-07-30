import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "slabhead_admin_session";
const SESSION_LIFETIME_SECONDS = 12 * 60 * 60;

interface AdminSession {
  username: string;
  expiresAt: number;
}

function sessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function signature(payload: string): string {
  return crypto.createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET,
  );
}

export function authenticateAdmin(username: string, password: string): boolean {
  if (!isAdminConfigured()) return false;
  return (
    safeEqual(username, process.env.ADMIN_USERNAME || "") &&
    safeEqual(password, process.env.ADMIN_PASSWORD || "")
  );
}

export function createAdminSessionToken(username: string): string {
  const session: AdminSession = {
    username,
    expiresAt: Date.now() + SESSION_LIFETIME_SECONDS * 1000,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifyAdminSessionToken(token?: string): AdminSession | null {
  if (!token || !isAdminConfigured()) return null;
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature || !safeEqual(signature(payload), suppliedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as AdminSession;
    if (session.expiresAt <= Date.now() || session.username !== process.env.ADMIN_USERNAME) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export const ADMIN_SESSION_MAX_AGE = SESSION_LIFETIME_SECONDS;
