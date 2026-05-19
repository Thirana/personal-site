"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";
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
    <div>
      <div className="divide-y divide-gl-border">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      {canExpand ? (
        <div className="border-t border-gl-border pt-6 mt-2">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-gl-text-faint transition-colors hover:text-gl-text"
          >
            <ArrowDown className="h-3.5 w-3.5" />
            Show {all.length - projects.length} more projects
          </button>
        </div>
      ) : null}
    </div>
  );
}
