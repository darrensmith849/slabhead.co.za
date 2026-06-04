import crypto from "crypto";

const PAYFAST_SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";
const PAYFAST_LIVE_URL = "https://www.payfast.co.za/eng/process";

interface PayFastPaymentData {
  orderId: number;
  total: number;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  itemName: string;
}

export function getPayFastUrl(): string {
  return process.env.PAYFAST_SANDBOX === "true" ? PAYFAST_SANDBOX_URL : PAYFAST_LIVE_URL;
}

export function buildPayFastForm(data: PayFastPaymentData): Record<string, string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://slabhead.co.za";

  const params: Record<string, string> = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID || "",
    merchant_key: process.env.PAYFAST_MERCHANT_KEY || "",
    return_url: `${siteUrl}/checkout/success?order=${data.orderId}`,
    cancel_url: `${siteUrl}/checkout/cancel?order=${data.orderId}`,
    notify_url: `${siteUrl}/api/payfast/notify`,
    name_first: data.customerFirstName,
    name_last: data.customerLastName,
    email_address: data.customerEmail,
    m_payment_id: String(data.orderId),
    amount: data.total.toFixed(2),
    item_name: data.itemName,
  };

  // Generate signature
  const passphrase = process.env.PAYFAST_PASSPHRASE || "";
  const signatureString = Object.entries(params)
    .filter(([, v]) => v !== "")
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, "+")}`)
    .join("&");

  const signatureWithPassphrase = passphrase
    ? `${signatureString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
    : signatureString;

  params.signature = crypto.createHash("md5").update(signatureWithPassphrase).digest("hex");

  return params;
}

export function validateITN(data: Record<string, string>): boolean {
  const passphrase = process.env.PAYFAST_PASSPHRASE || "";

  // Build signature string from received data (excluding signature)
  const signatureString = Object.entries(data)
    .filter(([k]) => k !== "signature")
    .map(([k, v]) => `${k}=${encodeURIComponent(v.trim()).replace(/%20/g, "+")}`)
    .join("&");

  const fullString = passphrase
    ? `${signatureString}&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`
    : signatureString;

  const calculatedSignature = crypto.createHash("md5").update(fullString).digest("hex");
  return calculatedSignature === data.signature;
}
