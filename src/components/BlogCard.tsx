import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentMeta } from "@/lib/content";
import Tag from "@/components/Tag";

const SWATCH_COLORS = [
  "#69b598",
  "#8285ba",
  "#b87da2",
  "#c4a05e",
  "#b87060",
  "#62aebf",
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
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-gl-border bg-gl-surface p-6 shadow-gl transition-shadow duration-200 hover:shadow-gl-lg focus-visible:outline-none"
    >
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.07] pb-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gl-text-faint">
            {post.date}
          </p>
          {post.level ? (
            <Tag dot={getSwatchColor(post.level)} className="px-2 py-0.5 font-mono text-[10px]">
              {post.level}
            </Tag>
          ) : null}
          {post.track ? (
            <Tag dot={getSwatchColor(post.track)} className="px-2 py-0.5 font-mono text-[10px]">
              {post.track}
            </Tag>
          ) : null}
        </div>

        <div className="space-y-2">
          <h2 className="text-[19px] font-bold tracking-[-0.015em] text-gl-text transition-colors group-hover:text-gl-primary">
            {post.title}
          </h2>
          <p className="text-[15px] leading-[1.65] text-gl-text-muted">{post.summary}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Tag key={tag} dot={getSwatchColor(tag)} className="px-2 py-0.5 text-[10px] font-mono">
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center border-t border-white/[0.07] pt-4">
        <span className="inline-flex items-center gap-2 rounded-[10px] bg-gl-primary px-4 py-2.5 text-[13px] font-semibold text-gl-primary-ink transition-colors group-hover:bg-gl-primary-hover">
          Read article
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
