import { ImageResponse } from "next/og";
import { getBlogMetaBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const meta = await getBlogMetaBySlug(slug);

  const title = meta?.title ?? "Blog";
  const summary = meta?.summary ?? siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 15% -10%, rgba(148, 163, 184, 0.22), transparent 45%), #0b0f14",
          color: "#f8fafc",
          padding: "56px",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#94a3b8",
          }}
        >
          Engineering Blog
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.08, fontWeight: 700 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, color: "#cbd5e1" }}>
            {summary}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "32px",
              borderRadius: "9999px",
              backgroundColor: "#34d399",
            }}
          />
          {siteConfig.name}
        </div>
      </div>
    ),
    size
  );
}
