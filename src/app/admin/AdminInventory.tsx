"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, ProductCategory } from "@/lib/types";
import { ACTIVE_PRODUCT_CATEGORIES } from "@/lib/types";

interface Props {
  initialProducts: Product[];
  databaseConfigured: boolean;
}

const inputClass =
  "w-full rounded border border-white/10 bg-slab-black/60 px-3 py-2 font-mono text-xs text-slab-white focus:border-slab-neon-cyan focus:outline-none";

export default function AdminInventory({ initialProducts, databaseConfigured }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({
    name: "",
    slug: "",
    sku: "",
    price: "",
    category: "Pokemon" as ProductCategory,
    description: "",
  });

  function updateProduct(slug: string, field: keyof Product, value: string | number) {
    setProducts((current) =>
      current.map((product) => (product.slug === slug ? { ...product, [field]: value } : product)),
    );
  }

  async function save(product: Product) {
    if (!product.id) return;
    setSavingId(product.id);
    setMessage("");
    const response = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        category: product.category,
        availability: product.availability,
      }),
    });
    const result = await response.json();
    setMessage(response.ok ? `${product.name} saved` : result.error || "Save failed");
    setSavingId(null);
    router.refresh();
  }

  async function createProduct(event: React.FormEvent) {
    event.preventDefault();
    setCreating(true);
    setMessage("");
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...draft, price: Number(draft.price) }),
    });
    const result = await response.json();
    if (response.ok) {
      setMessage("Product created with a placeholder image");
      setDraft({ name: "", slug: "", sku: "", price: "", category: "Pokemon", description: "" });
      window.location.reload();
      return;
    }
    setMessage(result.error || "Create failed");
    setCreating(false);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">// INVENTORY_CONTROL</p>
          <h1 className="mt-3 font-display text-4xl text-slab-white">Products & Stock</h1>
        </div>
        <button onClick={logout} className="rounded border border-white/10 px-4 py-2 font-mono text-xs text-slab-muted hover:text-slab-white">
          SIGN_OUT
        </button>
      </div>

      {!databaseConfigured && (
        <div className="mt-8 rounded border border-slab-danger/40 bg-slab-danger/[0.06] p-4 text-sm text-slab-danger">
          Database access is not configured in this environment. Products are read-only until DATABASE_URL is supplied.
        </div>
      )}
      {message && <div className="mt-6 rounded border border-slab-neon-cyan/30 bg-slab-neon-cyan/[0.04] p-3 text-sm text-slab-neon-cyan">{message}</div>}

      <form onSubmit={createProduct} className="mt-8 rounded-xl border border-white/10 bg-slab-charcoal/60 p-5">
        <h2 className="font-display text-xl text-slab-white">Add Inventory</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <input required placeholder="Product name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className={`${inputClass} lg:col-span-2`} />
          <input required placeholder="product-slug" value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} className={inputClass} />
          <input required placeholder="SKU" value={draft.sku} onChange={(event) => setDraft({ ...draft, sku: event.target.value })} className={inputClass} />
          <input required type="number" min="0" step="0.01" placeholder="Price" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} className={inputClass} />
          <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as ProductCategory })} className={inputClass}>
            {ACTIVE_PRODUCT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
          </select>
          <input placeholder="Short description" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className={`${inputClass} sm:col-span-2 lg:col-span-5`} />
          <button disabled={!databaseConfigured || creating} className="rounded border border-slab-neon-cyan/50 bg-slab-neon-cyan/[0.06] px-4 py-2 font-mono text-xs text-slab-neon-cyan disabled:opacity-40">
            {creating ? "ADDING…" : "ADD_PRODUCT"}
          </button>
        </div>
      </form>

      <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[850px] text-left">
          <thead className="bg-slab-charcoal text-[10px] uppercase tracking-widest text-slab-muted">
            <tr><th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3">Action</th></tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug} className="border-t border-white/[0.06] bg-slab-black/30">
                <td className="p-3"><input value={product.name} onChange={(event) => updateProduct(product.slug, "name", event.target.value)} className={inputClass} /></td>
                <td className="p-3"><select value={product.category} onChange={(event) => updateProduct(product.slug, "category", event.target.value)} className={inputClass}>{ACTIVE_PRODUCT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></td>
                <td className="p-3"><input type="number" min="0" step="0.01" value={product.price} onChange={(event) => updateProduct(product.slug, "price", Number(event.target.value))} className={inputClass} /></td>
                <td className="p-3"><select value={product.availability} onChange={(event) => updateProduct(product.slug, "availability", event.target.value)} className={inputClass}><option value="InStock">In stock</option><option value="OutOfStock">Out of stock</option></select></td>
                <td className="p-3"><button type="button" disabled={!databaseConfigured || !product.id || savingId === product.id} onClick={() => save(product)} className="rounded border border-slab-neon-cyan/40 px-4 py-2 font-mono text-xs text-slab-neon-cyan disabled:opacity-40">{savingId === product.id ? "SAVING…" : "SAVE"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
