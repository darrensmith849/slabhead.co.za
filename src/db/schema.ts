import {
  pgTable,
  varchar,
  integer,
  numeric,
  text,
  timestamp,
  serial,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

// ── Products ──

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    sku: varchar("sku", { length: 100 }).notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("ZAR"),
    priceValidUntil: varchar("price_valid_until", { length: 20 }).notNull(),
    availability: varchar("availability", { length: 20 })
      .notNull()
      .default("InStock"),
    condition: varchar("condition", { length: 50 })
      .notNull()
      .default("NewCondition"),
    category: varchar("category", { length: 100 }).notNull(),
    subcategory: varchar("subcategory", { length: 100 }),
    gradeCompany: varchar("grade_company", { length: 20 }),
    gradeScore: numeric("grade_score", { precision: 4, scale: 1 }),
    era: varchar("era", { length: 100 }),
    edition: varchar("edition", { length: 100 }),
    datePublished: varchar("date_published", { length: 20 }).notNull(),
    dateModified: varchar("date_modified", { length: 20 }).notNull(),
  },
  (table) => [
    uniqueIndex("slug_idx").on(table.slug),
    index("category_idx").on(table.category),
    index("availability_idx").on(table.availability),
  ]
);

export const productImages = pgTable(
  "product_images",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    url: text("url").notNull(),
    localPath: varchar("local_path", { length: 500 }).notNull(),
    width: integer("width").notNull(),
    height: integer("height").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [index("product_id_idx").on(table.productId)]
);

export const productTags = pgTable(
  "product_tags",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id").notNull(),
    tag: varchar("tag", { length: 100 }).notNull(),
  },
  (table) => [index("product_tag_idx").on(table.productId)]
);

// ── Customers ──

export const customers = pgTable(
  "customers",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 30 }),
    addressLine1: varchar("address_line1", { length: 255 }),
    addressLine2: varchar("address_line2", { length: 255 }),
    city: varchar("city", { length: 100 }),
    province: varchar("province", { length: 100 }),
    postalCode: varchar("postal_code", { length: 20 }),
    country: varchar("country", { length: 100 }).default("South Africa"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("email_idx").on(table.email)]
);

// ── Orders ──

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull(),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("ZAR"),
    paymentRef: varchar("payment_ref", { length: 255 }),
    sageInvoiceId: varchar("sage_invoice_id", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("customer_id_idx").on(table.customerId),
    index("status_idx").on(table.status),
  ]
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull(),
    productId: integer("product_id").notNull(),
    quantity: integer("quantity").notNull().default(1),
    unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  },
  (table) => [index("order_id_idx").on(table.orderId)]
);

// ── Cart ──

export const cartSessions = pgTable(
  "cart_sessions",
  {
    id: serial("id").primaryKey(),
    sessionToken: varchar("session_token", { length: 255 }).notNull(),
    customerId: integer("customer_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at").notNull(),
  },
  (table) => [uniqueIndex("session_token_idx").on(table.sessionToken)]
);

export const cartItems = pgTable(
  "cart_items",
  {
    id: serial("id").primaryKey(),
    cartSessionId: integer("cart_session_id").notNull(),
    productId: integer("product_id").notNull(),
    quantity: integer("quantity").notNull().default(1),
  },
  (table) => [index("cart_session_id_idx").on(table.cartSessionId)]
);
