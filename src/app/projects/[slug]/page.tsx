import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import {
  getAllProjects,
  getBlogsByProject,
  getProjectBySlug,
  getProjectMetaBySlug,
} from "@/lib/content";
import CapabilityMatrix from "@/components/CapabilityMatrix";
import EvidenceLinks from "@/components/EvidenceLinks";
import RelatedBlogs from "@/components/RelatedBlogs";
import StatusBadge from "@/components/StatusBadge";
import ContentHero from "@/components/ContentHero";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getProjectMetaBySlug(slug);

  if (!meta) {
    return {};
  }

  const canonicalPath = `/projects/${slug}`;

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
      tags: [...meta.tech, ...meta.domains],
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

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result) {
    notFound();
  }

  const { meta, Content } = result;
  const relatedPosts = await getBlogsByProject(meta.slug);
  const canonicalPath = `/projects/${meta.slug}`;
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: meta.title,
    description: meta.summary,
    datePublished: meta.date || undefined,
    codeRepository: meta.links.code || undefined,
    programmingLanguage: meta.tech,
    keywords: [...meta.tech, ...meta.domains],
    url: absoluteUrl(canonicalPath),
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: absoluteUrl("/about"),
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.authorName,
    },
    sameAs: [meta.links.live, meta.links.code].filter(Boolean),
  };

  const projectCapabilityRows = (meta.domains.length > 0
    ? meta.domains
    : ["System Design"]).map((domain, index) => {
    const mappedConstraint =
      meta.constraints[index] ??
      meta.constraints[meta.constraints.length - 1] ??
      "Core system behavior documented in project notes.";
    const mappedMetric = meta.metrics[index] ?? meta.metrics[meta.metrics.length - 1];

    return {
      domain,
      focus: mappedConstraint,
      signal: mappedMetric
        ? `${mappedMetric.label}: ${mappedMetric.value}`
        : `Status: ${meta.status}`,
    };
  });

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <ContentHero
        eyebrow="Project"
        title={meta.title}
        summary={meta.summary}
        meta={
          meta.links.code ? (
            <Link
              href={meta.links.code}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-gl-primary px-3 py-2 text-[13px] font-semibold text-gl-primary transition-colors hover:bg-gl-primary hover:text-white"
            >
              Repository
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          ) : null
        }
        badge={<StatusBadge status={meta.status} />}
        chips={meta.tech}
      />

      {meta.outcomes.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <p className="shrink-0 font-mono text-[14px] font-bold uppercase tracking-[0.2em] text-gl-primary">
              Outcomes
            </p>
            <div className="flex-1 border-t border-gl-border" />
          </div>
          <ul className="space-y-2 text-[15px] text-gl-text">
            {meta.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gl-primary" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <p className="shrink-0 font-mono text-[14px] font-bold uppercase tracking-[0.2em] text-gl-primary">
            Concepts and Strategies
          </p>
          <div className="flex-1 border-t border-gl-border" />
        </div>
        <CapabilityMatrix rows={projectCapabilityRows} />
      </div>

      <EvidenceLinks items={meta.evidence.filter((e) => e.label !== "Repository")} />

      <article className="prose prose-invert max-w-none content-with-hero">
        <Content />
      </article>

      <RelatedBlogs posts={relatedPosts} />
    </div>
  );
}
