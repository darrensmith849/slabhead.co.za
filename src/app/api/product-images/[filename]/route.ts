import { NextResponse } from "next/server";
import { readProductImage } from "@/lib/product-image-storage";

interface RouteContext {
  params: Promise<{ filename: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { filename } = await params;
  const image = await readProductImage(filename);
  if (!image) return NextResponse.json({ error: "Image not found" }, { status: 404 });

  return new Response(new Uint8Array(image.bytes), {
    headers: {
      "Content-Type": image.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
