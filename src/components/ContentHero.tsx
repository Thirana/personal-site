import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Tag from "@/components/Tag";

type ContentHeroProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  meta?: ReactNode;
  chips?: string[];
  badge?: ReactNode;
  className?: string;
};

export default function ContentHero({
  eyebrow,
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
        "not-prose space-y-4 rounded-2xl border border-border/80 bg-panel/40 p-6",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold text-neutral-100 sm:text-3xl">
          {title}
        </h1>
        {badge}
      </div>
      {summary ? (
        <p className="text-sm leading-7 text-neutral-200">{summary}</p>
      ) : null}
      {meta ? (
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300">
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
