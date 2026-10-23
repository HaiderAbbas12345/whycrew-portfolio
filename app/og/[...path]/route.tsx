import { ImageResponse } from "next/og";
import { OG_CARDS, OG_HEIGHT, OG_WIDTH } from "@/lib/og";

/**
 * Per-page link-preview cards, /og/<page path>.png (the homepage is
 * /og/home.png). Every card is rendered once at build time from lib/og.ts;
 * any path not registered there 404s rather than rendering arbitrary text
 * under the WhyCrew name.
 */

export const dynamic = "force-static";
export const dynamicParams = false;

const toPagePath = (segments: string[]) => {
  const joined = segments.join("/").replace(/\.png$/, "");
  return joined === "home" ? "/" : `/${joined}`;
};

export function generateStaticParams() {
  return Object.keys(OG_CARDS).map((pagePath) => ({
    path: `${pagePath === "/" ? "home" : pagePath.slice(1)}.png`.split("/"),
  }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const card = OG_CARDS[toPagePath(path)];
  if (!card) return new Response("Not found", { status: 404 });

  // Long titles step the type down so they stay inside three lines.
  const titleSize = card.title.length > 60 ? 56 : card.title.length > 38 ? 66 : 78;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#04060d",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(47,92,255,0.45), transparent 46%), radial-gradient(circle at 6% 100%, rgba(45,212,168,0.22), transparent 42%)",
          color: "#f2f6ff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6ff0cc",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: "#2dd4a8",
              marginRight: 18,
            }}
          />
          {card.eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1,
            maxWidth: 1000,
          }}
        >
          {card.title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #1b2848",
            paddingTop: 28,
            fontSize: 28,
            color: "#b9c5de",
          }}
        >
          <div style={{ display: "flex", fontWeight: 700, color: "#f2f6ff" }}>
            WhyCrew
          </div>
          <div style={{ display: "flex" }}>whycrew.com</div>
        </div>
      </div>
    ),
    { width: OG_WIDTH, height: OG_HEIGHT }
  );
}
