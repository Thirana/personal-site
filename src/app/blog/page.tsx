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
  const trackCount = new Set(posts.map((post) => post.track).filter(Boolean))
    .size;

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <p className="shrink-0 font-mono text-[14px] font-bold uppercase tracking-[0.2em] text-gl-primary">
              Engineering Notes
            </p>
            <div className="flex-1 border-t border-gl-border" />
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.024em] text-gl-text sm:text-4xl">
            Blog
          </h1>
          <p className="max-w-2xl text-[16px] leading-[1.7] text-gl-text">
            Technical writing focused on backend decisions, system trade-offs,
            and implementation patterns.
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
        <div className="divide-y divide-gl-border">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
