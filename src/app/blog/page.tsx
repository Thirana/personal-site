import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";
import MetaStrip from "@/components/MetaStrip";
import Tag from "@/components/Tag";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const trackCount = new Set(posts.map((post) => post.track).filter(Boolean)).size;

  return (
    <div className="space-y-8">
      <div className="space-y-4 rounded-2xl border border-border/80 bg-panel/35 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-neutral-400">
          Engineering Notes
        </p>
        <h1 className="text-3xl font-semibold text-neutral-100">Blog</h1>
        <p className="max-w-2xl text-sm leading-7 text-neutral-300">
          Technical writing focused on backend decisions, system trade-offs, and
          implementation patterns.
        </p>
        <MetaStrip
          items={[
            { label: "Posts", value: `${posts.length}` },
            { label: "Tracks", value: `${trackCount || 1}` },
            {
              label: "Latest",
              value: posts[0]?.date ?? "n/a",
            },
            { label: "Style", value: "Backend-first notes" },
          ]}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="space-y-3 rounded-xl border border-border/80 bg-panel/30 p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
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
            <h2 className="text-xl font-semibold text-neutral-100">
              <Link href={`/blog/${post.slug}`} className="hover:text-white">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm leading-7 text-neutral-300">{post.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Tag key={tag} className="px-2 py-0.5 text-[10px] font-mono">
                  {tag}
                </Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
