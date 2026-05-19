import Tag from "@/components/Tag";
import { Badge } from "@/components/ui/badge";
import type {
  BlogCaptionCoverChecklistItem,
  BlogCaptionCoverComparisonRow,
  BlogCaptionCoverPreset,
} from "@/lib/blog-cover-presets";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type BlogCaptionCoverProps = {
  title: string;
  summary: string;
  preset: BlogCaptionCoverPreset;
  className?: string;
};

const rowToneStyles: Record<
  BlogCaptionCoverComparisonRow["tone"],
  {
    label: string;
    track: string;
    scan: string;
    marker: string;
    strong: string;
  }
> = {
  offset: {
    label: "text-rose-300",
    track: "border-rose-400/20 bg-[#12151d]",
    scan:
      "border-rose-300/35 bg-gradient-to-r from-rose-500/28 to-rose-400/38",
    marker:
      "border-rose-300/50 bg-gradient-to-b from-rose-400/85 to-rose-500/78 shadow-[0_0_16px_rgba(251,113,133,0.22)]",
    strong: "text-rose-300",
  },
  cursor: {
    label: "text-cyan-300",
    track: "border-cyan-400/16 bg-[#12151d]",
    scan:
      "border-cyan-300/20 bg-gradient-to-r from-slate-800/70 to-slate-700/45",
    marker:
      "border-emerald-200/45 bg-gradient-to-b from-cyan-300/70 to-emerald-300/82 shadow-[0_0_16px_rgba(45,212,191,0.22)]",
    strong: "text-cyan-300",
  },
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

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
            className={isAccent ? "text-cyan-300" : undefined}
          >
            {token}
          </span>
        );
      })}
    </span>
  ));
}

function ComparisonRow({
  label,
  tone,
  barFill,
  calloutStrong,
  calloutSoft,
}: BlogCaptionCoverComparisonRow) {
  const styles = rowToneStyles[tone];
  const normalizedBarFill = Math.min(100, Math.max(0, barFill));
  const returnBlockWidth = 4.5;
  const offsetMarkerLeft = Math.min(
    100 - returnBlockWidth,
    normalizedBarFill + 1.25
  );
  const cursorMarkerWidth = Math.max(4, normalizedBarFill);
  const offsetArrowStart = 1.5;
  const offsetArrowEnd = Math.max(
    offsetArrowStart + 8,
    normalizedBarFill - 1.4
  );
  const cursorTargetX = 100 - cursorMarkerWidth - 0.25;

  return (
    <div className="space-y-3">
      <p
        className={cn(
          "font-mono text-[clamp(0.72rem,1vw,0.9rem)] uppercase tracking-[0.22em]",
          styles.label
        )}
      >
        {label}
      </p>
      <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] sm:gap-8">
        <div className={cn("relative", tone === "offset" ? "pt-3" : "pt-5")}>
          {tone === "offset" ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 top-0 h-3 w-full"
            >
              <line
                x1={offsetArrowStart}
                y1="6"
                x2={offsetArrowEnd}
                y2="6"
                stroke="rgba(251, 113, 133, 0.95)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d={`M ${offsetArrowEnd - 2.8} 2.6 L ${offsetArrowEnd} 6 L ${offsetArrowEnd - 2.8} 9.4`}
                fill="none"
                stroke="rgba(251, 113, 133, 0.95)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 top-0 h-5 w-full"
            >
              <line
                x1={cursorTargetX}
                y1="1.5"
                x2={cursorTargetX}
                y2="18.5"
                stroke="rgba(45, 212, 191, 0.92)"
                strokeWidth="1.05"
                strokeLinecap="round"
              />
              <path
                d={`M ${cursorTargetX - 1.7} 15.9 L ${cursorTargetX} 18.5 L ${cursorTargetX + 1.7} 15.9`}
                fill="none"
                stroke="rgba(45, 212, 191, 0.92)"
                strokeWidth="1.05"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <div
            className={cn(
              "relative h-[clamp(1.3rem,2vw,1.55rem)] overflow-hidden rounded-[0.3rem] border",
              styles.track
            )}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))]" />
            {tone === "offset" ? (
              <>
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-[0.24rem] border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
                    styles.scan
                  )}
                  style={{ width: `${normalizedBarFill}%` }}
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-[-1px] rounded-[0.22rem] border",
                    styles.marker
                  )}
                  style={{
                    left: `${offsetMarkerLeft}%`,
                    width: `${returnBlockWidth}%`,
                  }}
                />
              </>
            ) : (
              <>
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 right-0 rounded-[0.24rem] border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                    styles.scan
                  )}
                />
                <div className="absolute inset-y-[30%] left-[5%] right-[16%] rounded-full bg-cyan-300/8" />
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-[-1px] right-[0.25%] rounded-[0.22rem] border",
                    styles.marker
                  )}
                  style={{ width: `${cursorMarkerWidth}%` }}
                />
              </>
            )}
          </div>
        </div>
        <p
          className={cn(
            "flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[clamp(0.94rem,1.5vw,1.22rem)] leading-tight",
            tone === "cursor" ? "self-end pb-0.5 sm:pb-1" : undefined
          )}
        >
          <span className={cn("font-semibold", styles.strong)}>
            {calloutStrong}
          </span>
          {calloutSoft ? (
            <span className="text-slate-400">{calloutSoft}</span>
          ) : null}
        </p>
      </div>
    </div>
  );
}

function ChecklistItem({
  label,
  detail,
}: BlogCaptionCoverChecklistItem) {
  return (
    <div className="rounded-[0.8rem] border border-border/70 bg-white/[0.025] px-[clamp(0.95rem,1.5vw,1.2rem)] py-[clamp(0.85rem,1.45vw,1.1rem)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-300/35 bg-emerald-500/12">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
        </div>
        <div className="space-y-1">
          <p className="text-[clamp(0.98rem,1.3vw,1.12rem)] font-semibold leading-snug text-slate-100">
            {label}
          </p>
          <p className="text-[clamp(0.82rem,1.02vw,0.92rem)] leading-[1.45] text-slate-400">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BlogCaptionCover({
  title,
  summary,
  preset,
  className,
}: BlogCaptionCoverProps) {
  const displayTitle = preset.displayTitle ?? title;
  const displaySummary = preset.displaySummary ?? summary;
  const initials = getInitials(siteConfig.authorName);
  const accentWords = preset.accentWords ?? [];
  const hasChips = preset.chips.length > 0;
  const hideFooter = preset.footerNote === null;
  const hasFooterNote = typeof preset.footerNote === "string";

  return (
    <div
      className={cn(
        "relative aspect-[724/633] w-[1080px] max-w-full overflow-hidden border border-border/80 bg-[#090d14] text-foreground shadow-[0_30px_80px_rgba(0,0,0,0.45)]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_16%_-10%,rgba(45,212,191,0.09),transparent_34%),radial-gradient(circle_at_84%_112%,rgba(56,189,248,0.08),transparent_28%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02)_0%,rgba(15,23,42,0.08)_58%,rgba(15,23,42,0.2)_100%)]"
      />

      <div className="relative flex h-full flex-col px-[clamp(1.5rem,4vw,4.4rem)] py-[clamp(1.5rem,4vw,3.5rem)]">
        <div className="flex-1">
          <div className="pt-[clamp(2rem,5vw,3rem)]">
            <Badge
              variant="secondary"
              className="inline-flex rounded-[0.32rem] border border-emerald-400/30 bg-emerald-500/10 px-[clamp(0.7rem,1vw,0.9rem)] py-[clamp(0.35rem,0.65vw,0.5rem)] font-mono text-[clamp(0.72rem,0.95vw,0.88rem)] uppercase tracking-[0.22em] text-emerald-300 hover:bg-emerald-500/10"
            >
              {preset.eyebrow}
            </Badge>
          </div>

          <div className="mt-[clamp(1.4rem,3vw,2.1rem)] max-w-[min(100%,29rem)] space-y-[clamp(1rem,1.9vw,1.35rem)]">
            <h1
              className={cn(
                "text-balance whitespace-pre-line text-[clamp(2.8rem,6.1vw,5.25rem)] leading-[0.94] font-semibold tracking-[-0.025em] text-slate-50",
                preset.visual === "checklist" ? "max-w-[16ch]" : "max-w-[10ch]"
              )}
            >
              {accentWords.length > 0
                ? renderAccentedTitle(displayTitle, accentWords)
                : displayTitle}
            </h1>
            <p
              className={cn(
                "text-[clamp(1rem,1.85vw,1.7rem)] leading-[1.45] whitespace-pre-line text-slate-400",
                preset.visual === "checklist" ? "max-w-[34ch]" : "max-w-[30ch]"
              )}
            >
              {displaySummary}
            </p>
          </div>

          <div className="mt-[clamp(2rem,4vw,3.15rem)] max-w-[min(100%,54rem)] space-y-[clamp(1.35rem,2.6vw,2rem)]">
            {preset.visual === "comparison" ? (
              preset.comparisonRows.map((row) => (
                <ComparisonRow key={row.label} {...row} />
              ))
            ) : (
              <div className="space-y-4">
                <p className="font-mono text-[clamp(0.72rem,1vw,0.88rem)] uppercase tracking-[0.24em] text-cyan-300">
                  {preset.checklistLabel}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {preset.checklistItems.map((item) => (
                    <ChecklistItem key={item.label} {...item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {hasChips ? (
          <div className="mt-[clamp(1.4rem,3.2vw,2rem)] pt-[clamp(1rem,2vw,1.55rem)]">
            <div className="flex flex-wrap gap-2.5">
              {preset.chips.map((chip) => (
                <Tag
                  key={chip}
                  className="rounded-full border-border/70 bg-white/[0.03] px-[clamp(0.8rem,1.2vw,1rem)] py-[clamp(0.45rem,0.8vw,0.65rem)] text-[clamp(0.8rem,1vw,0.92rem)] font-medium text-slate-300 hover:border-border/70 hover:text-slate-300"
                >
                  {chip}
                </Tag>
              ))}
            </div>
          </div>
        ) : null}

        {hideFooter ? null : (
          <div className="mt-[clamp(1.25rem,2.8vw,1.85rem)] pt-[clamp(1rem,2vw,1.45rem)]">
            {hasFooterNote ? (
              <p className="max-w-[36ch] text-[clamp(0.95rem,1.2vw,1.04rem)] leading-[1.55] text-slate-400">
                {preset.footerNote}
              </p>
            ) : (
              <div className="flex items-center gap-[clamp(0.8rem,1.5vw,1rem)]">
                <div className="flex h-[clamp(2.35rem,4vw,2.85rem)] w-[clamp(2.35rem,4vw,2.85rem)] items-center justify-center rounded-full border border-emerald-300/35 bg-emerald-500/14 font-semibold text-[clamp(0.88rem,1.25vw,1.08rem)] text-emerald-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  {initials}
                </div>
                <div className="space-y-1.5 leading-none">
                  <p className="text-[clamp(0.98rem,1.4vw,1.18rem)] font-semibold text-slate-100">
                    {siteConfig.authorName}
                  </p>
                  <p className="text-[clamp(0.84rem,1.1vw,0.96rem)] text-slate-400">
                    {preset.footerHost}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
