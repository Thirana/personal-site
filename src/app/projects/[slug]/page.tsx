import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import CapabilityMatrix from "@/components/CapabilityMatrix";
import EvidenceLinks from "@/components/EvidenceLinks";
import StatusBadge from "@/components/StatusBadge";
import ContentHero from "@/components/ContentHero";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result) {
    notFound();
  }

  const { meta, Content } = result;
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
          Backend Capability Matrix
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
