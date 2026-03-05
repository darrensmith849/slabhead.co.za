import type { Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";

interface CategoryPageProps {
  title: string;
  description: string;
  products: Product[];
}

export default function CategoryPage({ title, description, products }: CategoryPageProps) {
  const inStock = products.filter((p) => p.availability === "InStock");
  const sold = products.filter((p) => p.availability === "OutOfStock");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slab-white">{title}</h1>
        <p className="mt-1 text-slab-muted">{description}</p>
        <p className="mt-2 text-sm text-slab-muted">
          {inStock.length} in stock &middot; {sold.length} sold
        </p>
      </div>

      {inStock.length > 0 && (
        <>
          <h2 className="mb-4 text-lg font-semibold text-slab-white">Available Now</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {inStock.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </>
      )}

      {sold.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-semibold text-slab-muted">Previously Sold</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {sold.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}

      {products.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-slab-muted">No products in this category yet.</p>
          <div className="mt-4">
            <Button href="/shop">Browse All Products</Button>
          </div>
        </div>
      )}
    </div>
  );
}
