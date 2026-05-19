import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

type RelatedBlogsProps = {
  posts: ContentMeta[];
};

export default function RelatedBlogs({ posts }: RelatedBlogsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Section label */}
      <div className="flex items-center gap-4">
        <p className="shrink-0 font-mono text-[14px] font-bold uppercase tracking-[0.2em] text-gl-primary">
          Related Reading
        </p>
        <div className="flex-1 border-t border-gl-border" />
      </div>

      {/* Blog rows */}
      <div className="divide-y divide-gl-border">
        {posts.map((post) => (
          <div key={post.slug} className="py-6 first:pt-2">
            <div className="space-y-3">
              <Link
                href={`/blog/${post.slug}`}
                className="block text-[18px] font-bold tracking-[-0.015em] text-gl-text transition-colors hover:text-gl-primary focus-visible:outline-none"
              >
                {post.title}
              </Link>

              <p className="text-[14px] leading-[1.65] text-gl-text">
                {post.summary}
              </p>

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

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gl-primary transition-colors hover:text-gl-primary-hover focus-visible:outline-none"
              >
                Read article
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
