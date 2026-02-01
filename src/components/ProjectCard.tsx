import Link from "next/link";
import type { ProjectMeta } from "@/lib/content";
import StatusBadge from "./StatusBadge";
import Tag from "./Tag";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ProjectCardProps = {
  project: ProjectMeta;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col border-border/80 bg-panel/40">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-2">
          <CardTitle className="text-lg text-neutral-100">
            <Link href={`/projects/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          </CardTitle>
          <p className="text-sm text-neutral-300">{project.summary}</p>
        </div>
        <StatusBadge status={project.status} />
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap gap-3">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/projects/${project.slug}`}>Details</Link>
        </Button>
        {project.links.live ? (
          <Button variant="outline" size="sm" asChild>
            <a href={project.links.live} target="_blank" rel="noreferrer">
              Live
            </a>
          </Button>
        ) : null}
        {project.links.code ? (
          <Button variant="outline" size="sm" asChild>
            <a href={project.links.code} target="_blank" rel="noreferrer">
              Code
            </a>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
