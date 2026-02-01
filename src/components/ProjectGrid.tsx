"use client";

import { useState } from "react";
import type { ProjectMeta } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";

type ProjectGridProps = {
  featured: ProjectMeta[];
  all: ProjectMeta[];
};

export default function ProjectGrid({ featured, all }: ProjectGridProps) {
  const [showAll, setShowAll] = useState(false);
  const projects = showAll ? all : featured;
  const canExpand = all.length > projects.length;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {canExpand ? (
        <Button type="button" variant="outline" onClick={() => setShowAll(true)}>
          Load more
        </Button>
      ) : null}
    </div>
  );
}
