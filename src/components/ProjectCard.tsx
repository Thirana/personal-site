import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";
import StatusBadge from "./StatusBadge";
import Tag from "./Tag";

type ProjectCardProps = {
  project: ProjectMeta;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-border/80 bg-panel/40 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Link
            href={`/projects/${project.slug}`}
            className="text-lg font-semibold text-neutral-100 hover:underline"
          >
            {project.title}
          </Link>
          <p className="text-sm text-neutral-300">{project.summary}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-3 text-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="rounded-full border border-border/80 px-3 py-1 text-neutral-200 hover:border-neutral-500 hover:text-neutral-100"
        >
          Details
        </Link>
        {project.links.live ? (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border/80 px-3 py-1 text-neutral-200 hover:border-neutral-500 hover:text-neutral-100"
          >
            Live
          </a>
        ) : null}
        {project.links.code ? (
          <a
            href={project.links.code}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border/80 px-3 py-1 text-neutral-200 hover:border-neutral-500 hover:text-neutral-100"
          >
            Code
          </a>
        ) : null}
      </div>
    </div>
  );
}
