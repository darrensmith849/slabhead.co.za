import { OG_ALT, OG_SIZE, renderSlabheadOgImage } from "@/lib/og-image";

// Picked up by Next.js App Router metadata convention: auto-injects
// <meta property="og:image"> + width/height/alt into every page.
// Override on a per-route basis by adding the same file to a route folder.
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return renderSlabheadOgImage();
}
