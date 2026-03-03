"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MermaidDiagramProps = {
  chart: string;
  className?: string;
};

let mermaidConfigured = false;

async function getMermaid() {
  const mermaid = (await import("mermaid")).default;

  if (!mermaidConfigured) {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "dark",
      themeVariables: {
        fontSize: "16px",
        lineColor: "#93c5fd",
        textColor: "#e5e7eb",
        primaryColor: "#0f172a",
        primaryTextColor: "#e5e7eb",
      },
    });
    mermaidConfigured = true;
  }

  return mermaid;
}

export default function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  const renderId = useMemo(
    () => `mermaid-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [id]
  );

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      try {
        const mermaid = await getMermaid();
        const { svg } = await mermaid.render(renderId, chart);

        if (cancelled) {
          return;
        }

        container.innerHTML = svg;
        setError(null);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(err instanceof Error ? err.message : "Failed to render diagram.");
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, renderId]);

  if (error) {
    return (
      <div className={cn("not-prose my-6 space-y-3", className)}>
        <p className="text-xs text-rose-300">Mermaid render failed: {error}</p>
        <pre className="overflow-x-auto rounded-xl border border-border/70 bg-panel/35 p-4 text-xs text-neutral-200">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className={cn("not-prose my-6", className)}>
      <div className="overflow-x-auto rounded-xl border border-border/70 bg-panel/35 p-4">
        <div
          ref={containerRef}
          className="[&_svg]:h-auto [&_svg]:max-w-none [&_svg]:min-w-[760px] md:[&_svg]:min-w-0"
          aria-label="Mermaid diagram"
        />
      </div>
    </div>
  );
}
