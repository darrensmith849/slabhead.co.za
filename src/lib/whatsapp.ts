interface PaidOrderNotification {
  orderId: number;
  total: number;
  customerName: string;
  customerPhone?: string | null;
  itemSummary: string;
}

const FOUNDER_NUMBERS = ["27834549253", "27835018993"];

function normalisePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("0")) return `27${digits.slice(1)}`;
  return digits;
}

function notificationRecipients(customerPhone?: string | null): string[] {
  const configured = process.env.WHATSAPP_NOTIFY_NUMBERS
    ?.split(",")
    .map(normalisePhone)
    .filter(Boolean);
  const staff = configured?.length ? configured : FOUNDER_NUMBERS;
  const customer = customerPhone ? normalisePhone(customerPhone) : "";
  return Array.from(new Set([customer, ...staff].filter(Boolean)));
}

async function sendTemplateMessage(
  recipient: string,
  notification: PaidOrderNotification,
): Promise<void> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_ORDER_TEMPLATE_NAME;
  if (!token || !phoneNumberId || !templateName) return;

  const graphVersion = process.env.WHATSAPP_GRAPH_VERSION || "v25.0";
  const languageCode = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US";
  const response = await fetch(
    `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient,
        type: "template",
        template: {
          name: templateName,
          language: { code: languageCode },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: notification.customerName },
                { type: "text", text: `SH-${notification.orderId}` },
                { type: "text", text: `R ${notification.total.toFixed(2)}` },
                { type: "text", text: notification.itemSummary.slice(0, 900) },
              ],
            },
          ],
        },
      }),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`WhatsApp API ${response.status}: ${detail.slice(0, 500)}`);
  }
}

export function isWhatsAppOrderMessagingConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_ORDER_TEMPLATE_NAME,
  );
}

export async function notifyPaidOrderViaWhatsApp(
  notification: PaidOrderNotification,
): Promise<void> {
  if (!isWhatsAppOrderMessagingConfigured()) {
    console.info("[WhatsApp] Order messaging is not configured; notification skipped");
    return;
  }

  const results = await Promise.allSettled(
    notificationRecipients(notification.customerPhone).map((recipient) =>
      sendTemplateMessage(recipient, notification),
    ),
  );

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("[WhatsApp] Failed to send paid-order notification", result.reason);
    }
  });
}
