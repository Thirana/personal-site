import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/content";
import MetaStrip from "@/components/MetaStrip";
import BlogCard from "@/components/BlogCard";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on backend decisions, system trade-offs, and implementation patterns.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title: `Blog | ${siteConfig.name}`,
    description:
      "Technical writing on backend decisions, system trade-offs, and implementation patterns.",
  },
  twitter: {
    card: "summary",
    title: `Blog | ${siteConfig.name}`,
    description:
      "Technical writing on backend decisions, system trade-offs, and implementation patterns.",
    creator: siteConfig.authorHandle,
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const trackCount = new Set(posts.map((post) => post.track).filter(Boolean)).size;

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="space-y-4 rounded-2xl border border-gl-border bg-gl-surface p-6 shadow-gl">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-gl-text-faint">
            Engineering Notes
          </p>
          <h1 className="text-3xl font-bold tracking-[-0.022em] text-gl-text">Blog</h1>
          <p className="max-w-2xl text-[16px] leading-[1.65] text-gl-text-muted">
            Technical writing focused on backend decisions, system trade-offs, and
            implementation patterns.
          </p>
          <MetaStrip
            items={[
              { label: "Posts", value: `${posts.length}` },
              { label: "Tracks", value: `${trackCount || 1}` },
              { label: "Latest", value: posts[0]?.date ?? "n/a" },
              { label: "Style", value: "Backend-first notes" },
            ]}
          />
        </div>
      </FadeIn>

      <FadeIn delay={120}>
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
