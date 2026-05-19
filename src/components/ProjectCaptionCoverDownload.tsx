"use client";

import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import ProjectCaptionCover from "@/components/ProjectCaptionCover";
import { Button } from "@/components/ui/button";
import type { ProjectCaptionCoverPreset } from "@/lib/project-cover-presets";

const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = Math.round((EXPORT_WIDTH * 633) / 724);

type ProjectCaptionCoverDownloadProps = {
  slug: string;
  title: string;
  summary: string;
  preset: ProjectCaptionCoverPreset;
};

export default function ProjectCaptionCoverDownload({
  slug,
  title,
  summary,
  preset,
}: ProjectCaptionCoverDownloadProps) {
  const coverRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    if (!coverRef.current || isDownloading) {
      return;
    }

    setIsDownloading(true);
    setError(null);

    try {
      const dataUrl = await toPng(coverRef.current, {
        pixelRatio: 2,
        backgroundColor: "#090d14",
        cacheBust: true,
        width: EXPORT_WIDTH,
        height: EXPORT_HEIGHT,
        style: {
          width: `${EXPORT_WIDTH}px`,
          height: `${EXPORT_HEIGHT}px`,
          maxWidth: "none",
        },
      });

      const downloadLink = document.createElement("a");
      downloadLink.download = `${slug}-cover.png`;
      downloadLink.href = dataUrl;
      downloadLink.click();
    } catch {
      setError("Could not generate PNG. Refresh and try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-400">
            Internal preview
          </p>
          <p className="text-sm text-neutral-300">
            Manual screenshot target for project announcement artwork.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleDownload}
            disabled={isDownloading}
            className="border-border/80 bg-panel/35 text-neutral-100 hover:bg-panel/55 hover:text-neutral-50"
          >
            <Download className="h-4 w-4" />
            {isDownloading ? "Preparing PNG..." : "Download PNG"}
          </Button>
          {error ? <p className="text-xs text-rose-300">{error}</p> : null}
        </div>
      </div>

      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 px-4 sm:px-6 lg:px-10">
        <div className="flex justify-center pb-3">
          <div ref={coverRef}>
            <ProjectCaptionCover
              title={title}
              summary={summary}
              preset={preset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
