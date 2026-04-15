import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentMeta } from "@/lib/content";
import Tag from "@/components/Tag";

type BlogCardProps = {
  post: ContentMeta;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border/80 bg-panel/40 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-500/70 hover:shadow-[0_24px_50px_-32px_rgba(15,23,42,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
    >
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            {post.date}
          </p>
          {post.level ? (
            <Tag className="px-2 py-0.5 font-mono text-[10px]">{post.level}</Tag>
          ) : null}
          {post.track ? (
            <Tag className="px-2 py-0.5 font-mono text-[10px]">{post.track}</Tag>
          ) : null}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-neutral-100 transition-colors group-hover:text-white">
            {post.title}
          </h2>
          <p className="text-sm leading-7 text-neutral-300">{post.summary}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Tag key={tag} className="px-2 py-0.5 text-[10px] font-mono">
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-start border-t border-border/60 pt-4">
        <span className="inline-flex min-h-10 items-center gap-2 rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 text-xs font-medium text-emerald-50 transition-colors group-hover:border-emerald-300/50 group-hover:bg-emerald-500/15 group-hover:text-white">
          Read article
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
