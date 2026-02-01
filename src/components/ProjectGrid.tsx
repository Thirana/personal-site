"use client";

import { useState } from "react";
import type { ProjectMeta } from "@/lib/content";
import ProjectCard from "./ProjectCard";

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
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="rounded-full border border-border/80 px-4 py-2 text-sm text-neutral-200 hover:border-neutral-500 hover:text-neutral-100"
        >
          Load more
        </button>
      ) : null}
    </div>
  );
}
