import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectMetaBySlug,
} from "@/lib/content";
import CapabilityMatrix from "@/components/CapabilityMatrix";
import EvidenceLinks from "@/components/EvidenceLinks";
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
        badge={<StatusBadge status={meta.status} />}
        chips={meta.tech}
      />

      {meta.outcomes.length > 0 ? (
        <div className="space-y-2 rounded-xl border border-border/70 bg-panel/25 p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
            Outcomes
          </p>
          <ul className="space-y-2 text-sm text-neutral-200">
            {meta.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="space-y-3 rounded-xl border border-border/70 bg-panel/25 p-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
          Concepts and Strategies
        </p>
        <CapabilityMatrix rows={projectCapabilityRows} />
      </div>

      <EvidenceLinks items={meta.evidence} />

      <article className="prose prose-invert max-w-none content-with-hero">
        <Content />
      </article>
    </div>
  );
}
