import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "next";
import type { ContentMeta } from "@/lib/content";
import Tag from "@/components/Tag";

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

type BlogCardProps = {
  post: ContentMeta;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group py-8 first:pt-2">
      <div className="space-y-4">
        {/* Title */}
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.02em]">
          <Link
            href={`/blog/${post.slug}` as Route<string>}
            className="text-gl-text transition-colors hover:text-gl-primary"
          >
            {post.title}
          </Link>
        </h2>

        {/* Summary */}
        <p className="text-[16px] leading-[1.7] text-gl-text">{post.summary}</p>

        {/* Tags */}
        {post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Tag
                key={tag}
                dot={getSwatchColor(tag)}
                className="px-2.5 py-1 text-[12px]"
              >
                {tag}
              </Tag>
            ))}
          </div>
        ) : null}

        {/* Read link */}
        <div className="flex items-center gap-4 pt-1">
          <Link
            href={`/blog/${post.slug}` as Route<string>}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gl-primary transition-colors hover:text-gl-primary-hover"
          >
            Read article
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
