import { ImageResponse } from "next/og";

/**
 * Shared "card" used by /opengraph-image.tsx and /twitter-image.tsx.
 *
 * 1200×630 — the standard 1.91:1 ratio that FB / WhatsApp / iMessage /
 * Social and messaging apps render this size cleanly.
 *
 * Note on fonts: Satori (the renderer Next uses for ImageResponse) only
 * accepts TTF/OTF, not woff2. Google Fonts only serves woff2 for modern
 * UAs, so runtime-loading Audiowide isn't viable without bundling a TTF.
 * The wordmark uses a high-contrast system mono stack instead — still
 * reads as on-brand cyberpunk against the neon gradient.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_ALT = "Slabhead — South Africa's Home for Graded Cards";

const DISPLAY_FONT =
  '"Impact", "Helvetica Neue", "Arial Black", sans-serif';
const MONO_FONT = "ui-monospace, monospace";

export async function renderSlabheadOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0F",
          backgroundImage: [
            "radial-gradient(ellipse 70% 60% at 25% 25%, rgba(168, 85, 247, 0.22), transparent 55%)",
            "radial-gradient(ellipse 70% 60% at 80% 85%, rgba(236, 72, 153, 0.20), transparent 55%)",
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(26, 15, 46, 0.85), transparent 70%)",
          ].join(", "),
          padding: "60px 80px",
          position: "relative",
          fontFamily: MONO_FONT,
          color: "#F8FAFC",
        }}
      >
        {/* corner brackets — cyberpunk frame */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 48,
            height: 48,
            borderTop: "3px solid rgba(168, 85, 247, 0.9)",
            borderLeft: "3px solid rgba(168, 85, 247, 0.9)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 48,
            height: 48,
            borderTop: "3px solid rgba(168, 85, 247, 0.9)",
            borderRight: "3px solid rgba(168, 85, 247, 0.9)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 48,
            height: 48,
            borderBottom: "3px solid rgba(168, 85, 247, 0.9)",
            borderLeft: "3px solid rgba(168, 85, 247, 0.9)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 48,
            height: 48,
            borderBottom: "3px solid rgba(168, 85, 247, 0.9)",
            borderRight: "3px solid rgba(168, 85, 247, 0.9)",
          }}
        />

        {/* top status row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 18,
            letterSpacing: 6,
            color: "rgba(168, 85, 247, 0.85)",
          }}
        >
          <span>{"// CAPE_TOWN.ZA"}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#22C55E",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.9)",
              }}
            />
            <span>SYSTEMS // ONLINE</span>
          </span>
        </div>

        {/* center: wordmark + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: DISPLAY_FONT,
              fontSize: 200,
              fontWeight: 900,
              letterSpacing: 4,
              lineHeight: 1,
            }}
          >
            <span style={{ color: "#F8FAFC" }}>SLAB</span>
            <span
              style={{
                color: "#FF3DBE",
                textShadow:
                  "0 0 24px rgba(255, 61, 190, 0.75), 0 0 60px rgba(255, 61, 190, 0.35)",
              }}
            >
              H
            </span>
            <span
              style={{
                color: "#E845D3",
                textShadow:
                  "0 0 24px rgba(232, 69, 211, 0.70), 0 0 60px rgba(232, 69, 211, 0.35)",
              }}
            >
              E
            </span>
            <span
              style={{
                color: "#C158EC",
                textShadow:
                  "0 0 26px rgba(193, 88, 236, 0.70), 0 0 60px rgba(168, 85, 247, 0.40)",
              }}
            >
              A
            </span>
            <span
              style={{
                color: "#A855F7",
                textShadow:
                  "0 0 30px rgba(168, 85, 247, 0.80), 0 0 64px rgba(168, 85, 247, 0.45)",
              }}
            >
              D
            </span>
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#CBD5E1",
              letterSpacing: 4,
              display: "flex",
            }}
          >
            <span style={{ color: "rgba(168, 85, 247, 0.9)", marginRight: 12 }}>
              {">"}
            </span>
            <span>Curated for collectors under Slabhead</span>
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 18,
              color: "rgba(236, 72, 153, 0.80)",
              letterSpacing: 8,
            }}
          >
            PSA · CGC · BGS · POKEMON · DRAGON BALL Z · ONE PIECE
          </div>
        </div>

        {/* bottom status row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 16,
            letterSpacing: 4,
            color: "#94A3B8",
          }}
        >
          <span>{"// SLABHEAD.CO.ZA"}</span>
          <span>CURRENCY: ZAR · INSURED_SHIPPING</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    },
  );
}
