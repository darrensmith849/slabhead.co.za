"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/types";
import NeonFrame from "@/components/atmosphere/NeonFrame";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

/**
 * "Specimen viewer" — the product photo inside a NeonFrame with scanlines
 * overlay. Click a thumbnail to rotate the active specimen. Each rotation
 * fades through (no jarring swap).
 */
export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  const activeSrc = images[activeIndex]?.localPath || images[activeIndex]?.url;

  return (
    <div className="flex flex-col gap-4">
      {/* Specimen viewer */}
      <NeonFrame accent="cyan">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[11px] bg-slab-black scanlines">
          <Image
            key={activeIndex}
            src={activeSrc}
            alt={productName}
            fill
            className="object-contain p-8 animate-fade"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            style={{ animation: "specimen-fade 0.4s ease-out" }}
          />
          {/* Specimen metadata corner */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded border border-slab-neon-cyan/30 bg-slab-black/70 px-2 py-1 backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full bg-slab-neon-cyan"
              style={{ boxShadow: "0 0 6px rgba(0, 240, 255, 0.7)" }}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/80">
              SPECIMEN_{(activeIndex + 1).toString().padStart(2, "0")}
            </span>
          </div>
          <style>{`
            @keyframes specimen-fade {
              from { opacity: 0; transform: scale(0.98); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      </NeonFrame>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-slab-muted">
              // ROTATE_SPECIMEN
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slab-neon-cyan/60">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border transition-all",
                  i === activeIndex
                    ? "border-slab-neon-cyan neon-box-cyan"
                    : "border-white/10 opacity-60 hover:border-slab-neon-cyan/40 hover:opacity-100",
                )}
                aria-label={`Specimen ${i + 1}`}
              >
                <Image
                  src={img.localPath || img.url}
                  alt={`${productName} ${i + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
