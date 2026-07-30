import crypto from "crypto";
import path from "path";
import { mkdir, readFile, writeFile } from "fs/promises";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

const IMAGE_TYPES = {
  "image/jpeg": { extension: ".jpg", contentType: "image/jpeg" },
  "image/png": { extension: ".png", contentType: "image/png" },
  "image/webp": { extension: ".webp", contentType: "image/webp" },
} as const;

function uploadDirectory(): string {
  return process.env.PRODUCT_UPLOAD_DIR || path.join(process.cwd(), ".product-images");
}

function hasValidSignature(bytes: Uint8Array, mimeType: keyof typeof IMAGE_TYPES): boolean {
  if (mimeType === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (mimeType === "image/png") {
    return (
      bytes.length >= 8 &&
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    );
  }
  return (
    bytes.length >= 12 &&
    String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
  );
}

export interface StoredProductImage {
  localPath: string;
  width: number;
  height: number;
}

export async function storeProductImage(
  image: File,
  width: number,
  height: number,
): Promise<StoredProductImage> {
  if (image.size <= 0 || image.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be between 1 byte and 8 MB");
  }

  const imageType = IMAGE_TYPES[image.type as keyof typeof IMAGE_TYPES];
  if (!imageType) {
    throw new Error("Only JPG, PNG and WebP images are supported");
  }

  const bytes = new Uint8Array(await image.arrayBuffer());
  if (!hasValidSignature(bytes, image.type as keyof typeof IMAGE_TYPES)) {
    throw new Error("The selected file is not a valid image");
  }

  const directory = uploadDirectory();
  await mkdir(directory, { recursive: true, mode: 0o750 });
  const filename = `${crypto.randomUUID()}${imageType.extension}`;
  await writeFile(path.join(directory, filename), bytes, { mode: 0o640 });

  return {
    localPath: `/api/product-images/${filename}`,
    width: Number.isFinite(width) && width > 0 ? Math.round(width) : 800,
    height: Number.isFinite(height) && height > 0 ? Math.round(height) : 1000,
  };
}

export async function readProductImage(filename: string): Promise<{
  bytes: Buffer;
  contentType: string;
} | null> {
  if (!/^[0-9a-f-]{36}\.(?:jpg|png|webp)$/.test(filename)) return null;

  const extension = path.extname(filename);
  const contentType =
    extension === ".png" ? "image/png" : extension === ".webp" ? "image/webp" : "image/jpeg";

  try {
    return {
      bytes: await readFile(path.join(uploadDirectory(), filename)),
      contentType,
    };
  } catch {
    return null;
  }
}
