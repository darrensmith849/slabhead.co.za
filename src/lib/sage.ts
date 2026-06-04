// Sage Business Cloud Accounting API integration
// Docs: https://developer.sage.com/accounting/reference/

const SAGE_API_BASE = "https://api.accounting.sage.com/v3.1";

interface SageInvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface SageInvoiceData {
  customerEmail: string;
  customerName: string;
  lineItems: SageInvoiceLineItem[];
  reference: string;
}

async function sageRequest(endpoint: string, options: RequestInit = {}) {
  const apiKey = process.env.SAGE_API_KEY;
  if (!apiKey) {
    console.warn("[Sage] No API key configured — skipping Sage integration");
    return null;
  }

  const res = await fetch(`${SAGE_API_BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[Sage] API error ${res.status}: ${body}`);
    throw new Error(`Sage API error: ${res.status}`);
  }

  return res.json();
}

// Find or create a contact in Sage by email
async function findOrCreateContact(email: string, name: string) {
  // Search for existing contact
  const searchRes = await sageRequest(`/contacts?email=${encodeURIComponent(email)}`);
  if (searchRes?.$items?.length > 0) {
    return searchRes.$items[0].id;
  }

  // Create new contact
  const nameParts = name.split(" ");
  const contact = await sageRequest("/contacts", {
    method: "POST",
    body: JSON.stringify({
      contact: {
        contact_type_ids: ["CUSTOMER"],
        name,
        email,
        main_address: {},
      },
    }),
  });

  return contact?.id;
}

// Create a sales invoice in Sage
export async function createSageInvoice(data: SageInvoiceData): Promise<string | null> {
  try {
    const contactId = await findOrCreateContact(data.customerEmail, data.customerName);
    if (!contactId) return null;

    const invoice = await sageRequest("/sales_invoices", {
      method: "POST",
      body: JSON.stringify({
        sales_invoice: {
          contact_id: contactId,
          date: new Date().toISOString().split("T")[0],
          reference: data.reference,
          invoice_lines: data.lineItems.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            tax_rate_id: null, // Will use default tax rate
          })),
          main_address: {},
        },
      }),
    });

    if (invoice?.id) {
      console.log(`[Sage] Invoice created: ${invoice.id}`);
      return invoice.id;
    }

    return null;
  } catch (err) {
    console.error("[Sage] Failed to create invoice:", err);
    return null;
  }
}
