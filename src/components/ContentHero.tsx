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
    <div
      className={cn(
        "not-prose space-y-4 rounded-2xl border border-gl-border bg-gl-surface p-6 shadow-gl",
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "font-mono text-[11px] uppercase tracking-[0.26em] text-gl-text-faint",
            eyebrowClassName
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold tracking-[-0.022em] text-gl-text sm:text-3xl">
          {title}
        </h1>
        {badge}
      </div>
      {summary ? (
        <p className="text-[16px] leading-[1.65] text-gl-text-muted">{summary}</p>
      ) : null}
      {meta ? (
        <div className="flex flex-wrap items-center gap-2 text-xs text-gl-text-muted">
          {meta}
        </div>
      ) : null}
      {chips && chips.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Tag key={chip} className="px-2.5 py-1 text-xs">
              {chip}
            </Tag>
          ))}
        </div>
      ) : null}
    </div>
  );
}
