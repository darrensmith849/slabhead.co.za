import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import CategoryPage from "@/components/sections/CategoryPage";

export const metadata: Metadata = {
  title: "Dragon Ball Z Cards",
  description:
    "Browse Dragon Ball Z graded cards, singles and sealed products from Slabhead in Cape Town.",
};

export default async function DragonBallZPage() {
  const products = await getProductsByCategory("Dragon Ball Z");

  return (
    <CategoryPage
      title="Dragon Ball Z"
      description="Graded cards, raw singles and sealed products from the Dragon Ball universe."
      heroLabel="// DRAGON_BALL_Z_VAULT"
      roomTheme="dragonball"
      products={products}
      subPortals={[
        { label: "SLABBED", href: "/dragon-ball-z?type=slabbed" },
        { label: "SINGLES", href: "/dragon-ball-z?type=singles" },
        { label: "SEALED", href: "/dragon-ball-z?type=sealed" },
      ]}
    />
  );
}
