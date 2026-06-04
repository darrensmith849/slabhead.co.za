import { OG_ALT, OG_SIZE, renderSlabheadOgImage } from "@/lib/og-image";

// Twitter Card image — same 1200×630 art as the OG image. Twitter
// reads twitter:image first then falls back to og:image, but providing
// both keeps the preview consistent across X and the rest.
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function TwitterImage() {
  return renderSlabheadOgImage();
}
