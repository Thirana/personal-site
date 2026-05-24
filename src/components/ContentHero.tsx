import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Tag from "@/components/Tag";

type ContentHeroProps = {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: string;
  summary?: string;
  meta?: ReactNode;
  chips?: string[];
  badge?: ReactNode;
  className?: string;
};

export default function ContentHero({
  eyebrow,
  eyebrowClassName,
  title,
  summary,
  meta,
  chips,
  badge,
  className,
}: ContentHeroProps) {
  return (
    <div className={cn("not-prose space-y-5", className)}>
      {/* Eyebrow label + rule + badge */}
      <div className="flex items-center gap-4">
        {eyebrow ? (
          <p
            className={cn(
              "shrink-0 font-mono text-[14px] font-bold uppercase tracking-[0.2em] text-gl-primary",
              eyebrowClassName,
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <div className="flex-1 border-t border-gl-border" />
        {badge ? <div className="shrink-0">{badge}</div> : null}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-[-0.024em] text-gl-text sm:text-4xl">
        {title}
      </h1>

      {/* Summary */}
      {summary ? (
        <p className="text-[16px] leading-[1.7] text-gl-text">{summary}</p>
      ) : null}

      {/* Chips */}
      {chips && chips.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Tag key={chip} className="px-3 py-1.5 text-[13px]">
              {chip}
            </Tag>
          ))}
        </div>
      ) : null}

      {/* Meta (date, links) */}
      {meta ? (
        <div className="flex flex-wrap items-center gap-2">{meta}</div>
      ) : null}
    </div>
  );
}
