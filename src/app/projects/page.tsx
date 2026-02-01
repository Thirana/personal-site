import { getAllProjects } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-8">
      <article className="prose prose-invert max-w-none">
        <h1>Projects</h1>
        <p>Selected work with notes on outcomes, trade-offs, and lessons learned.</p>
      </article>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
