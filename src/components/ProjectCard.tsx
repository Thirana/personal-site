"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Route } from "next";
import type { ProjectMeta } from "@/lib/content";
import StatusBadge from "./StatusBadge";
import Tag from "./Tag";
import { FadeIn } from "@/components/FadeIn";

type ProjectCardProps = {
  project: ProjectMeta;
  layout?: "default" | "wide";
  index?: number;
};

const SWATCH_COLORS = [
  "#8eceb4",
  "#a8abd8",
  "#ccaabc",
  "#d4b878",
  "#cc9888",
  "#80c8d8",
];

function getSwatchColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffff;
  }
  return SWATCH_COLORS[hash % SWATCH_COLORS.length];
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const projectPath = `/projects/${project.slug}` as Route<string>;
  const visibleConstraints = project.constraints.slice(0, 2);
  const allTags = [...project.domains, ...project.tech];

  return (
    <div className="group py-8 first:pt-2 last:pb-2">
      <FadeIn delay={Math.min(index * 110, 360)}>
        <div className="space-y-4">
          {/* Number + title + status */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gl-border bg-gl-surface-2">
                <span className="font-mono text-[11px] font-semibold text-[#b8b0e0]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <Link
                href={projectPath}
                className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-gl-text transition-colors hover:text-gl-primary focus-visible:outline-none"
              >
                {project.title}
              </Link>
            </div>
            <StatusBadge status={project.status} />
          </div>

          {/* Summary */}
          <p className="pl-10 text-[16px] leading-[1.7] text-gl-text">
            {project.summary}
          </p>

          {/* Constraints */}
          {visibleConstraints.length > 0 ? (
            <ul className="space-y-1.5 pl-10">
              {visibleConstraints.map((constraint) => (
                <li
                  key={constraint}
                  className="flex gap-2.5 text-[15px] text-gl-text"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gl-primary" />
                  <span>{constraint}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Tags */}
          {allTags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pl-10">
              {allTags.map((tag) => (
                <Tag
                  key={tag}
                  dot={getSwatchColor(tag)}
                  className="px-2.5 py-1 text-[12px]"
                >
                  {tag}
                </Tag>
              ))}
            </div>
          ) : null}

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pl-10 pt-1">
            <Link
              href={projectPath}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gl-primary transition-colors hover:text-gl-primary-hover"
            >
              Project overview
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            {project.links.code ? (
              <a
                href={project.links.code}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-medium text-gl-text-faint transition-colors hover:text-gl-text"
              >
                Code ↗
              </a>
            ) : null}
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-medium text-gl-text-faint transition-colors hover:text-gl-text"
              >
                Live ↗
              </a>
            ) : null}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
