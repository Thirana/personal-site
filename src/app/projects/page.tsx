import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import MetaStrip from "@/components/MetaStrip";
import ProjectCard from "@/components/ProjectCard";
import { FadeIn } from "@/components/FadeIn";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "System-focused project writeups covering architecture decisions, reliability controls, and measurable outcomes.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: "/projects",
    title: `Projects | ${siteConfig.name}`,
    description:
      "System-focused project writeups covering architecture decisions, reliability controls, and measurable outcomes.",
  },
  twitter: {
    card: "summary",
    title: `Projects | ${siteConfig.name}`,
    description:
      "System-focused project writeups covering architecture decisions, reliability controls, and measurable outcomes.",
    creator: siteConfig.authorHandle,
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const activeProjects = projects.filter(
    (project) => project.status === "Live" || project.status === "WIP"
  ).length;
  const backendOrInfra = projects.filter((project) =>
    project.domains.some((domain) =>
      ["api", "data", "platform", "infra", "observability"].includes(
        domain.toLowerCase()
      )
    )
  ).length;
  const evidenceCount = projects.reduce(
    (sum, project) => sum + project.evidence.length,
    0
  );

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="glass-panel space-y-4 rounded-2xl border border-transparent bg-gl-surface p-6 shadow-gl">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-gl-text-faint">
            Systems Portfolio
          </p>
          <h1 className="text-3xl font-bold tracking-[-0.022em] text-gl-text">Projects</h1>
          <p className="max-w-2xl text-[16px] leading-[1.65] text-gl-text-muted">
            System-focused work that highlights architecture decisions, reliability
            controls, and measurable outcomes.
          </p>
          <MetaStrip
            items={[
              { label: "Total Systems", value: `${projects.length}` },
              { label: "Active", value: `${activeProjects}` },
              { label: "Backend/Infra", value: `${backendOrInfra}` },
              { label: "Evidence Links", value: `${evidenceCount}` },
            ]}
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gl-text-faint">
            Open any project below for the overview, implementation notes, and
            evidence trail.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={120}>
        <div className="divide-y divide-gl-border">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
