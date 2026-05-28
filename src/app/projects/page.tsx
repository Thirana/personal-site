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
    (project) => project.status === "Live" || project.status === "WIP",
  ).length;
  const backendOrInfra = projects.filter((project) =>
    project.domains.some((domain) =>
      ["api", "data", "platform", "infra", "observability"].includes(
        domain.toLowerCase(),
      ),
    ),
  ).length;
  const evidenceCount = projects.reduce(
    (sum, project) => sum + project.evidence.length,
    0,
  );

  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <p className="shrink-0 font-mono text-[14px] font-bold uppercase tracking-[0.2em] text-gl-primary">
              Systems Portfolio
            </p>
            <div className="flex-1 border-t border-gl-border" />
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.024em] text-gl-text sm:text-4xl">
            Projects
          </h1>
          <p className="max-w-2xl text-[16px] leading-[1.7] text-gl-text">
            System-focused work that highlights architecture decisions,
            reliability controls, and measurable outcomes.
          </p>
          <MetaStrip
            items={[
              { label: "Total Systems", value: `${projects.length}` },
              { label: "Active", value: `${activeProjects}` },
              { label: "Technical", value: `${backendOrInfra}` },
              { label: "Evidence Links", value: `${evidenceCount}` },
            ]}
          />
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
