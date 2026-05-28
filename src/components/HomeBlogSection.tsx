"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { Route } from "next";
import type { ContentMeta } from "@/lib/content";
import Tag from "@/components/Tag";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";

const SWATCH_COLORS = [
  "#8eceb4",
  "#a8abd8",
  "#ccaabc",
  "#d4b878",
  "#cc9888",
  "#80c8d8",
];

function getSwatchColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffff;
  }
  return SWATCH_COLORS[hash % SWATCH_COLORS.length];
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

type Props = {
  featured: ContentMeta | null;
  compact: ContentMeta[];
};

export function HomeBlogSection({ featured, compact }: Props) {
  return (
    <div>
      {featured && (
        <FadeIn delay={0}>
          <div className="pb-6">
            <div className="space-y-3">
              <p className="font-mono text-[11px] tabular-nums text-gl-text-faint">
                {formatDate(featured.date)}
              </p>
              <Link
                href={`/blog/${featured.slug}` as Route<string>}
                className="block text-[22px] font-bold leading-tight tracking-[-0.02em] text-gl-text transition-colors hover:text-gl-primary focus-visible:outline-none"
              >
                {featured.title}
              </Link>
              <p className="text-[16px] leading-[1.7] text-gl-text-muted">
                {featured.summary}
              </p>
              {featured.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {featured.tags.map((tag) => (
                    <Tag
                      key={tag}
                      dot={getSwatchColor(tag)}
                      className="px-2.5 py-1 text-[12px]"
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
              <div className="pt-1">
                <Link
                  href={`/blog/${featured.slug}` as Route<string>}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gl-primary transition-colors hover:text-gl-primary-hover focus-visible:outline-none"
                >
                  Read article
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {compact.length > 0 && (
        <div className="divide-y divide-gl-border border-t border-gl-border">
          {compact.map((post, index) => (
            <FadeIn key={post.slug} delay={(index + 1) * 90}>
              <CompactBlogRow post={post} />
            </FadeIn>
          ))}
        </div>
      )}

      <FadeIn delay={(compact.length + 1) * 90}>
        <div
          className={cn(
            "flex items-center pt-5",
            compact.length > 0 ? "border-t border-gl-border" : "",
          )}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gl-primary transition-colors hover:text-gl-primary-hover focus-visible:outline-none"
          >
            All writing
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}

function CompactBlogRow({ post }: { post: ContentMeta }) {
  return (
    <Collapsible asChild>
      <div className="group">
        <CollapsibleTrigger className="block w-full select-none text-left">
          <div className="relative py-5 pr-7">
            <div className="space-y-1.5">
              <span className="block font-mono text-[11px] tabular-nums text-gl-text-faint">
                {formatDate(post.date)}
              </span>
              <span className="block text-[15px] font-semibold leading-snug text-gl-text transition-colors group-hover:text-gl-primary">
                {post.title}
              </span>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Tag
                      key={tag}
                      dot={getSwatchColor(tag)}
                      className="px-2 py-0.5 text-[11px]"
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gl-primary">
              <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="space-y-3 pb-5">
            <p className="text-[15px] leading-[1.65] text-gl-text-muted">
              {post.summary}
            </p>
            <Link
              href={`/blog/${post.slug}` as Route<string>}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gl-primary transition-colors hover:text-gl-primary-hover focus-visible:outline-none"
            >
              Read article
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
