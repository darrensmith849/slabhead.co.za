import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/admin-auth";
import { getAllProducts } from "@/lib/products";
import AdminInventory from "./AdminInventory";

export const metadata: Metadata = {
  title: "Inventory Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect("/admin/login");
  }

  const products = await getAllProducts();
  return <AdminInventory initialProducts={products} databaseConfigured={Boolean(process.env.DATABASE_URL)} />;
}
