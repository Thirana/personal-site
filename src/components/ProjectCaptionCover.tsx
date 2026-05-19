import type {
  ProjectCaptionCoverPillar,
  ProjectCaptionCoverPreset,
} from "@/lib/project-cover-presets";
import { cn } from "@/lib/utils";

type ProjectCaptionCoverProps = {
  title: string;
  summary: string;
  preset: ProjectCaptionCoverPreset;
  className?: string;
};

const pillarToneStyles: Record<
  ProjectCaptionCoverPillar["tone"],
  {
    rail: string;
    badge: string;
  }
> = {
  cyan: {
    rail: "from-cyan-300/90 to-emerald-300/70",
    badge: "border-cyan-300/25 bg-cyan-400/12 text-cyan-200",
  },
  amber: {
    rail: "from-amber-300/90 to-orange-300/70",
    badge: "border-amber-300/25 bg-amber-400/12 text-amber-100",
  },
  slate: {
    rail: "from-slate-300/55 to-slate-400/30",
    badge: "border-slate-300/20 bg-slate-300/10 text-slate-200",
  },
};

function normalizeAccentWords(words: string[]) {
  return new Set(
    words
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word.length > 0)
  );
}

function renderAccentedTitle(title: string, accentWords: string[]) {
  const normalizedAccentWords = normalizeAccentWords(accentWords);

  return title.split("\n").map((line, lineIndex) => (
    <span key={`line-${lineIndex}`} className="block">
      {line.split(/(\s+)/).map((token, tokenIndex) => {
        const normalizedToken = token.replace(/[^a-z0-9]/gi, "").toLowerCase();
        const isAccent = normalizedAccentWords.has(normalizedToken);

        return (
          <span
            key={`${lineIndex}-${token}-${tokenIndex}`}
            className={isAccent ? "text-cyan-200" : undefined}
          >
            {token}
          </span>
        );
      })}
    </span>
  ));
}

function PillarCard({
  title,
  detail,
  tone,
  index,
}: ProjectCaptionCoverPillar & { index: number }) {
  const styles = pillarToneStyles[tone];

  return (
    <div className="relative overflow-hidden rounded-[1rem] border border-white/10 bg-[#0c1119]/92 px-5 py-4 backdrop-blur-sm">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b",
          styles.rail
        )}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-[clamp(1rem,1.35vw,1.16rem)] font-semibold leading-snug text-slate-50">
            {title}
          </p>
          <p className="max-w-[28ch] text-[clamp(0.84rem,1.05vw,0.96rem)] leading-[1.5] text-slate-400">
            {detail}
          </p>
        </div>
        <div
          className={cn(
            "rounded-full border px-2.5 py-1 font-mono text-[0.72rem] uppercase tracking-[0.18em]",
            styles.badge
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCaptionCover({
  title,
  summary,
  preset,
  className,
}: ProjectCaptionCoverProps) {
  const displayTitle = preset.displayTitle ?? title;
  const displaySummary = preset.displaySummary ?? summary;
  const accentWords = preset.accentWords ?? [];
  const hasEyebrow = preset.eyebrow.trim().length > 0;

  return (
    <div
      className={cn(
        "relative aspect-[724/633] w-[1080px] max-w-full overflow-hidden border border-border/80 bg-[#090d14] text-foreground shadow-[0_30px_80px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_16%_-10%,rgba(45,212,191,0.12),transparent_34%),radial-gradient(circle_at_84%_112%,rgba(56,189,248,0.1),transparent_28%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02)_0%,rgba(15,23,42,0.08)_58%,rgba(15,23,42,0.2)_100%)]"
      />
      <div className="relative flex h-full flex-col px-[clamp(1.5rem,4vw,4.4rem)] py-[clamp(1.5rem,4vw,3.4rem)]">
        <div className="pt-[clamp(1.75rem,4vw,2.8rem)]">
          {hasEyebrow ? (
            <p className="font-mono text-[clamp(0.72rem,0.95vw,0.88rem)] uppercase tracking-[0.22em] text-slate-400">
              {preset.eyebrow}
            </p>
          ) : null}

          <div
            className={cn(
              "max-w-[34rem] space-y-[clamp(1.1rem,2vw,1.45rem)]",
              hasEyebrow
                ? "mt-[clamp(1.5rem,3.2vw,2.25rem)]"
                : "mt-[clamp(0.5rem,1vw,0.9rem)]"
            )}
          >
            <h1 className="max-w-[13ch] text-balance whitespace-pre-line text-[clamp(2.8rem,6vw,5.1rem)] leading-[0.93] font-semibold tracking-[-0.018em] text-slate-50">
              {accentWords.length > 0
                ? renderAccentedTitle(displayTitle, accentWords)
                : displayTitle}
            </h1>
            <p className="max-w-[34ch] whitespace-pre-line text-[clamp(1rem,1.8vw,1.6rem)] leading-[1.5] text-slate-300">
              {displaySummary}
            </p>
          </div>
        </div>

        <div className="mt-[clamp(2.2rem,4.4vw,3.2rem)] max-w-[min(100%,54rem)] space-y-4">
          <p className="font-mono text-[clamp(0.72rem,0.95vw,0.86rem)] uppercase tracking-[0.24em] text-cyan-300">
            {preset.panelLabel}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {preset.pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} index={index} {...pillar} />
            ))}
            <PillarCard
              index={preset.pillars.length}
              title={preset.repoLabel}
              detail={preset.repoDetail}
              tone="amber"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
