import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllBlogPosts,
  getBlogMetaBySlug,
  getBlogPostBySlug,
} from "@/lib/content";
import ContentHero from "@/components/ContentHero";
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
        eyebrowClassName="font-semibold text-emerald-300"
        title={meta.title}
        summary={meta.summary}
        meta={
          <span className="inline-flex items-center rounded-full border border-border/70 bg-panel/35 px-2.5 py-1 font-mono text-[11px] text-neutral-300">
            Published: {meta.date || "n/a"}
          </span>
        }
        chips={meta.tags}
      />

      <article className="prose prose-invert max-w-none content-with-hero">
        <Content />
      </article>
    </div>
  );
}
