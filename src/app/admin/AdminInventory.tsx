"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Availability, Product, ProductCategory } from "@/lib/types";
import { ACTIVE_PRODUCT_CATEGORIES } from "@/lib/types";

interface Props {
  initialProducts: Product[];
  databaseConfigured: boolean;
}

type StockFilter = "all" | Availability;
type SortOption = "newest" | "name" | "price-low" | "price-high";

const inputClass =
  "w-full rounded border border-white/10 bg-slab-black/60 px-3 py-2.5 font-mono text-xs text-slab-white focus:border-slab-neon-cyan focus:outline-none";

const emptyDraft = {
  name: "",
  slug: "",
  sku: "",
  price: "",
  category: "Pokemon" as ProductCategory,
  description: "",
};

function imageSource(product: Product): string {
  return product.images[0]?.localPath || product.images[0]?.url || "/images/placeholder-specimen.svg";
}

async function imageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const source = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
      URL.revokeObjectURL(source);
    };
    image.onerror = () => {
      resolve({ width: 800, height: 1000 });
      URL.revokeObjectURL(source);
    };
    image.src = source;
  });
}

export default function AdminInventory({ initialProducts, databaseConfigured }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [uploadingImageId, setUploadingImageId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState(emptyDraft);
  const [draftImage, setDraftImage] = useState<File | null>(null);
  const [draftImagePreview, setDraftImagePreview] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | ProductCategory>("all");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [sort, setSort] = useState<SortOption>("newest");

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !creating) setModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, creating]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products
      .filter((product) => {
        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.slug.toLowerCase().includes(query);
        const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
        const matchesStock = stockFilter === "all" || product.availability === stockFilter;
        return matchesSearch && matchesCategory && matchesStock;
      })
      .sort((left, right) => {
        if (sort === "name") return left.name.localeCompare(right.name);
        if (sort === "price-low") return left.price - right.price;
        if (sort === "price-high") return right.price - left.price;
        return new Date(right.dateModified).getTime() - new Date(left.dateModified).getTime();
      });
  }, [products, search, categoryFilter, stockFilter, sort]);

  const inStockCount = products.filter((product) => product.availability === "InStock").length;

  function updateProduct(slug: string, field: keyof Product, value: string | number) {
    setProducts((current) =>
      current.map((product) => (product.slug === slug ? { ...product, [field]: value } : product)),
    );
  }

  function selectDraftImage(file: File | null) {
    if (draftImagePreview) URL.revokeObjectURL(draftImagePreview);
    setDraftImage(file);
    setDraftImagePreview(file ? URL.createObjectURL(file) : "");
  }

  function closeModal() {
    if (creating) return;
    selectDraftImage(null);
    setDraft(emptyDraft);
    setModalOpen(false);
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
    if (!draftImage) {
      setMessage("Select a product image before adding inventory");
      return;
    }

    setCreating(true);
    setMessage("");
    const dimensions = await imageDimensions(draftImage);
    const formData = new FormData();
    Object.entries(draft).forEach(([key, value]) => formData.append(key, value));
    formData.append("image", draftImage);
    formData.append("imageWidth", String(dimensions.width));
    formData.append("imageHeight", String(dimensions.height));

    const response = await fetch("/api/admin/products", { method: "POST", body: formData });
    const result = await response.json();
    if (response.ok) {
      setMessage("Product and image added successfully");
      window.location.reload();
      return;
    }
    setMessage(result.error || "Create failed");
    setCreating(false);
  }

  async function replaceImage(product: Product, file: File | null) {
    if (!product.id || !file) return;
    setUploadingImageId(product.id);
    setMessage("");
    const dimensions = await imageDimensions(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("imageWidth", String(dimensions.width));
    formData.append("imageHeight", String(dimensions.height));
    const response = await fetch(`/api/admin/products/${product.id}/image`, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    if (response.ok) {
      setMessage(`${product.name} image updated`);
      window.location.reload();
      return;
    }
    setMessage(result.error || "Image upload failed");
    setUploadingImageId(null);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">
            // INVENTORY_CONTROL
          </p>
          <h1 className="mt-3 font-display text-4xl text-slab-white">Products & Stock</h1>
          <p className="mt-3 font-mono text-xs text-slab-muted">
            {products.length} products · {inStockCount} in stock · {products.length - inStockCount} out of stock
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            disabled={!databaseConfigured}
            className="rounded border border-slab-neon-cyan/60 bg-slab-neon-cyan/[0.08] px-5 py-2.5 font-mono text-xs tracking-wider text-slab-neon-cyan shadow-[0_0_24px_rgba(0,220,255,0.12)] transition hover:bg-slab-neon-cyan/[0.14] disabled:opacity-40"
          >
            + ADD_INVENTORY
          </button>
          <button
            onClick={logout}
            className="rounded border border-white/10 px-4 py-2.5 font-mono text-xs text-slab-muted hover:text-slab-white"
          >
            SIGN_OUT
          </button>
        </div>
      </div>

      {!databaseConfigured && (
        <div className="mt-8 rounded border border-slab-danger/40 bg-slab-danger/[0.06] p-4 text-sm text-slab-danger">
          Database access is not configured in this environment. Products are read-only until DATABASE_URL is supplied.
        </div>
      )}
      {message && (
        <div className="mt-6 rounded border border-slab-neon-cyan/30 bg-slab-neon-cyan/[0.04] p-3 text-sm text-slab-neon-cyan">
          {message}
        </div>
      )}

      <section className="mt-8 rounded-xl border border-white/10 bg-slab-charcoal/50 p-4" aria-label="Inventory filters">
        <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_220px_220px]">
          <label className="relative">
            <span className="sr-only">Search inventory</span>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-slab-neon-cyan">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, SKU or slug…"
              className={`${inputClass} pl-9`}
            />
          </label>
          <label>
            <span className="sr-only">Filter by category</span>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value as "all" | ProductCategory)}
              className={inputClass}
            >
              <option value="all">All categories</option>
              {ACTIVE_PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Sort inventory</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className={inputClass}>
              <option value="newest">Recently updated</option>
              <option value="name">Name A–Z</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {([
            ["all", "All stock"],
            ["InStock", "In stock"],
            ["OutOfStock", "Out of stock"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setStockFilter(value)}
              aria-pressed={stockFilter === value}
              className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition ${
                stockFilter === value
                  ? "border-slab-neon-pink/60 bg-slab-neon-pink/[0.10] text-slab-neon-pink"
                  : "border-white/10 text-slab-muted hover:border-white/20 hover:text-slab-white"
              }`}
            >
              {label}
            </button>
          ))}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-slab-muted">
            Showing {visibleProducts.length} of {products.length}
          </span>
        </div>
      </section>

      <div className="mt-5 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[980px] text-left">
          <thead className="bg-slab-charcoal text-[10px] uppercase tracking-widest text-slab-muted">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((product) => (
              <tr key={product.slug} className="border-t border-white/[0.06] bg-slab-black/30 align-middle">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded border border-white/10 bg-slab-charcoal">
                      <Image src={imageSource(product)} alt="" fill sizes="48px" unoptimized className="object-cover" />
                    </div>
                    <label className="cursor-pointer font-mono text-[9px] uppercase tracking-wider text-slab-neon-cyan hover:text-slab-white">
                      {uploadingImageId === product.id ? "Uploading…" : "Replace"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        disabled={!databaseConfigured || uploadingImageId === product.id}
                        onChange={(event) => replaceImage(product, event.target.files?.[0] || null)}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </td>
                <td className="p-3">
                  <input
                    value={product.name}
                    onChange={(event) => updateProduct(product.slug, "name", event.target.value)}
                    className={inputClass}
                  />
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-slab-muted">SKU {product.sku}</p>
                </td>
                <td className="p-3">
                  <select
                    value={product.category}
                    onChange={(event) => updateProduct(product.slug, "category", event.target.value)}
                    className={inputClass}
                  >
                    {ACTIVE_PRODUCT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                  </select>
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={product.price}
                    onChange={(event) => updateProduct(product.slug, "price", Number(event.target.value))}
                    className={inputClass}
                  />
                </td>
                <td className="p-3">
                  <select
                    value={product.availability}
                    onChange={(event) => updateProduct(product.slug, "availability", event.target.value)}
                    className={inputClass}
                  >
                    <option value="InStock">In stock</option>
                    <option value="OutOfStock">Out of stock</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    type="button"
                    disabled={!databaseConfigured || !product.id || savingId === product.id}
                    onClick={() => save(product)}
                    className="rounded border border-slab-neon-cyan/40 px-4 py-2 font-mono text-xs text-slab-neon-cyan disabled:opacity-40"
                  >
                    {savingId === product.id ? "SAVING…" : "SAVE"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleProducts.length === 0 && (
          <div className="border-t border-white/[0.06] bg-slab-black/30 px-6 py-16 text-center font-mono text-xs text-slab-muted">
            No inventory matches these filters.
          </div>
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slab-black/85 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div role="dialog" aria-modal="true" aria-labelledby="add-inventory-title" className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slab-neon-cyan/30 bg-slab-charcoal p-5 shadow-[0_0_80px_rgba(0,220,255,0.12)] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">// NEW_SPECIMEN</p>
                <h2 id="add-inventory-title" className="mt-2 font-display text-3xl text-slab-white">Add Inventory</h2>
              </div>
              <button type="button" onClick={closeModal} className="rounded border border-white/10 px-3 py-2 text-slab-muted hover:text-slab-white" aria-label="Close add inventory dialog">✕</button>
            </div>

            <form onSubmit={createProduct} className="mt-7 grid gap-5 md:grid-cols-[200px_1fr]">
              <div>
                <label className="block cursor-pointer">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">Product image</span>
                  <div
                    className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-xl border border-dashed border-slab-neon-cyan/35 bg-slab-black/50 bg-cover bg-center p-4 text-center"
                    style={draftImagePreview ? { backgroundImage: `url(${draftImagePreview})` } : undefined}
                  >
                    {!draftImagePreview && (
                      <span className="font-mono text-[10px] uppercase leading-relaxed tracking-wider text-slab-muted">
                        Click to upload<br />JPG, PNG or WebP<br />Maximum 8 MB
                      </span>
                    )}
                  </div>
                  <input
                    required
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => selectDraftImage(event.target.files?.[0] || null)}
                    className="sr-only"
                  />
                </label>
                {draftImage && <p className="mt-2 truncate font-mono text-[9px] text-slab-muted">{draftImage.name}</p>}
              </div>

              <div className="grid content-start gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">Product name</span>
                  <input required value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className={inputClass} />
                </label>
                <label>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">Slug</span>
                  <input required placeholder="product-slug" value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} className={inputClass} />
                </label>
                <label>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">SKU</span>
                  <input required value={draft.sku} onChange={(event) => setDraft({ ...draft, sku: event.target.value })} className={inputClass} />
                </label>
                <label>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">Price (ZAR)</span>
                  <input required type="number" min="0" step="0.01" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} className={inputClass} />
                </label>
                <label>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">Category</span>
                  <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as ProductCategory })} className={inputClass}>
                    {ACTIVE_PRODUCT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan">Description</span>
                  <textarea rows={4} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className={`${inputClass} resize-y`} />
                </label>
                <div className="flex justify-end gap-3 sm:col-span-2">
                  <button type="button" onClick={closeModal} disabled={creating} className="rounded border border-white/10 px-5 py-2.5 font-mono text-xs text-slab-muted hover:text-slab-white disabled:opacity-40">CANCEL</button>
                  <button disabled={!databaseConfigured || creating} className="rounded border border-slab-neon-cyan/50 bg-slab-neon-cyan/[0.08] px-5 py-2.5 font-mono text-xs text-slab-neon-cyan disabled:opacity-40">
                    {creating ? "ADDING…" : "ADD_PRODUCT"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
