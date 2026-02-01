import Link from "next/link";
import { getAllProjects } from "@/lib/content";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <article className="prose prose-invert max-w-none">
      <h1>Projects</h1>
      <p>Selected work with notes on outcomes, trade-offs, and lessons learned.</p>
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            <p className="muted">{project.summary}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
