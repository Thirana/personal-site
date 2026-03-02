import { ImageResponse } from "next/og";
import { getProjectMetaBySlug } from "@/lib/content";
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
  const meta = await getProjectMetaBySlug(slug);

  const title = meta?.title ?? "Project";
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
          background: "#0b0f14",
          color: "#f8fafc",
          padding: "56px",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#94a3b8",
          }}
        >
          Project Case Study
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", fontSize: 60, lineHeight: 1.08, fontWeight: 700 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 26, lineHeight: 1.35, color: "#cbd5e1" }}>
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
              height: "28px",
              borderRadius: "9999px",
              backgroundColor: "#22d3ee",
            }}
          />
          {siteConfig.name}
        </div>
      </div>
    ),
    size
  );
}
