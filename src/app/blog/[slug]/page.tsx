import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllBlogPosts,
  getBlogMetaBySlug,
  getBlogPostBySlug,
} from "@/lib/content";
import ContentHero from "@/components/ContentHero";
import MetaStrip from "@/components/MetaStrip";
import Tag from "@/components/Tag";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getBlogMetaBySlug(slug);

  if (!meta) {
    return {};
  }

  const canonicalPath = `/blog/${slug}`;

  return {
    title: meta.title,
    description: meta.summary,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: meta.title,
      description: meta.summary,
      publishedTime: meta.date || undefined,
      tags: meta.tags,
      images: [
        {
          url: `${canonicalPath}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.summary,
      creator: siteConfig.authorHandle,
      images: [`${canonicalPath}/twitter-image`],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getBlogPostBySlug(slug);

  if (!result) {
    notFound();
  }

  const { meta, Content } = result;
  const canonicalPath = `/blog/${meta.slug}`;
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date || undefined,
    dateModified: meta.date || undefined,
    keywords: meta.tags,
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: absoluteUrl("/about"),
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.authorName,
    },
    mainEntityOfPage: absoluteUrl(canonicalPath),
    url: absoluteUrl(canonicalPath),
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <ContentHero
        eyebrow="Blog"
        title={meta.title}
        summary={meta.summary}
        chips={meta.tags}
      />

      <MetaStrip
        items={[
          { label: "Published", value: meta.date || "n/a" },
          { label: "Track", value: meta.track ?? "Engineering" },
          { label: "Complexity", value: meta.level ?? "Intermediate" },
          {
            label: "Applies To",
            value: meta.appliesTo.length > 0 ? meta.appliesTo.join(", ") : "Backend workflows",
          },
        ]}
      />

      {meta.appliesTo.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {meta.appliesTo.map((item) => (
            <Tag key={item} className="px-2.5 py-1 text-[10px] font-mono">
              {item}
            </Tag>
          ))}
        </div>
      ) : null}

      {meta.takeaway ? (
        <div className="space-y-2 rounded-xl border border-border/70 bg-panel/25 p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
            Production Takeaway
          </p>
          <p className="text-sm leading-7 text-neutral-200">{meta.takeaway}</p>
        </div>
      ) : null}

      <article className="prose prose-invert max-w-none content-with-hero">
        <Content />
      </article>
    </div>
  );
}
