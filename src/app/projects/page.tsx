import { getAllProjects } from "@/lib/content";
import MetaStrip from "@/components/MetaStrip";
import ProjectCard from "@/components/ProjectCard";

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
      <div className="space-y-4 rounded-2xl border border-border/80 bg-panel/35 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-neutral-400">
          Systems Portfolio
        </p>
        <h1 className="text-3xl font-semibold text-neutral-100">Projects</h1>
        <p className="max-w-2xl text-sm leading-7 text-neutral-300">
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
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
