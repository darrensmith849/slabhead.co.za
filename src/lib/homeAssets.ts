import homeManifest from "@/data/asset-manifest.home.json";

export interface HomeAssetRecord {
  localPath: string;
  bytes?: number;
  contentType?: string;
  sha256?: string;
  source?: "homepage";
  downloadedAt?: string;
}

type HomeManifest = Record<string, HomeAssetRecord>;

export function getHomeAsset(originalUrl: string): string | null {
  const manifest = homeManifest as HomeManifest;
  const rec = manifest[originalUrl];
  return rec?.localPath ?? null;
}

export function listHomeAssets(): Array<{ originalUrl: string; localPath: string }> {
  const manifest = homeManifest as HomeManifest;
  return Object.entries(manifest).map(([originalUrl, rec]) => ({ originalUrl, localPath: rec.localPath }));
}
