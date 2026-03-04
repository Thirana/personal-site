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
  const status = meta?.status ?? "Live";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0f14",
          backgroundImage:
            "radial-gradient(circle at 95% 10%, rgba(56, 189, 248, 0.18), transparent 35%)",
          color: "#f8fafc",
          padding: "56px",
          fontFamily: "Inter, ui-sans-serif, system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            Systems Portfolio
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(148, 163, 184, 0.5)",
              color: "#d1d5db",
              borderRadius: "9999px",
              padding: "8px 16px",
              fontSize: 18,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {status}
          </div>
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
