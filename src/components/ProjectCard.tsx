"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <Card
      className="group flex h-full cursor-pointer flex-col border-border/80 bg-panel/40"
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNavigate();
        }
      }}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-2">
          <CardTitle className="text-lg text-neutral-100">
            {project.title}
          </CardTitle>
          <p className="min-h-[3rem] text-sm text-neutral-300">
            {project.summary}
          </p>
        </div>
        <StatusBadge status={project.status} />
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          asChild
          onClick={(event) => event.stopPropagation()}
        >
          <Link href={`/projects/${project.slug}`}>Details</Link>
        </Button>
        {project.links.live ? (
          <Button
            variant="outline"
            size="sm"
            asChild
            onClick={(event) => event.stopPropagation()}
          >
            <a href={project.links.live} target="_blank" rel="noreferrer">
              Live
            </a>
          </Button>
        ) : null}
        {project.links.code ? (
          <Button
            variant="outline"
            size="sm"
            asChild
            onClick={(event) => event.stopPropagation()}
          >
            <a href={project.links.code} target="_blank" rel="noreferrer">
              Code
            </a>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
