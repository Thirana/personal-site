"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { ProjectMeta } from "@/lib/content";
import StatusBadge from "./StatusBadge";
import Tag from "./Tag";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  layout?: "default" | "wide";
};

export default function ProjectCard({
  project,
  layout = "default",
}: ProjectCardProps) {
  const router = useRouter();
  const isWide = layout === "wide";
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false);
  const hasMobileDetails = project.metrics.length > 0 || project.constraints.length > 0;

  const renderDomainTags = (className?: string) => {
    if (project.domains.length === 0) {
      return null;
    }

    return (
      <div className={cn("flex flex-wrap gap-1.5", className)}>
        {project.domains.map((domain) => (
          <Tag
            key={domain}
            className="border-border/60 bg-transparent px-2 py-0.5 font-mono text-[10px] text-neutral-300 hover:border-neutral-400/70 hover:text-neutral-200"
          >
            {domain}
          </Tag>
        ))}
      </div>
    );
  };

  const renderTechTags = (className?: string) => {
    if (project.tech.length === 0) {
      return null;
    }

    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {project.tech.map((tech) => (
          <Tag
            key={tech}
            className="border-cyan-300/25 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] text-cyan-100 hover:border-cyan-300/45 hover:text-cyan-50"
          >
            {tech}
          </Tag>
        ))}
      </div>
    );
  };

  const handleNavigate = () => {
    router.push(`/projects/${project.slug}`);
  };

  return (
    <Card
      className={cn(
        "group flex h-full cursor-pointer flex-col border-border/80 bg-panel/40 transition-all duration-200 hover:-translate-y-1 hover:border-neutral-500/70 hover:shadow-[0_24px_50px_-32px_rgba(15,23,42,0.85)]",
        isWide && "md:grid md:grid-cols-[1fr_1fr] md:items-start"
      )}
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
      <CardHeader className={cn("space-y-2", isWide && "md:row-span-2")}>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg text-neutral-100 transition-colors group-hover:text-white">
            {project.title}
          </CardTitle>
          <StatusBadge status={project.status} />
        </div>
        <p className={cn("min-h-[3rem] text-sm text-neutral-300", isWide && "md:min-h-0")}>
          {project.summary}
        </p>
        {renderDomainTags("pt-1")}
        {isWide ? renderTechTags("pt-1") : null}
      </CardHeader>

      {isWide ? (
        <>
          <CardContent className="hidden flex-1 space-y-3 md:block md:pt-6 md:pb-4">
            {project.metrics.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {project.metrics.slice(0, 2).map((metric) => (
                  <div
                    key={`${metric.label}-${metric.value}`}
                    className="rounded-md border border-border/70 bg-panel/35 px-2.5 py-2"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      {metric.label}
                    </p>
                    <p className="whitespace-pre-line font-mono text-xs text-neutral-100">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            {project.constraints.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {project.constraints.slice(0, 3).map((constraint) => (
                  <span
                    key={constraint}
                    className="rounded-md border border-border/70 bg-transparent px-2 py-1 font-mono text-[10px] text-neutral-300"
                  >
                    {constraint}
                  </span>
                ))}
              </div>
            ) : null}
          </CardContent>

          {hasMobileDetails ? (
            <CardContent className="pt-0 md:hidden">
              <Collapsible
                open={mobileDetailsOpen}
                onOpenChange={setMobileDetailsOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full justify-between"
                    onClick={(event) => event.stopPropagation()}
                    onKeyDown={(event) => event.stopPropagation()}
                  >
                    <span>{mobileDetailsOpen ? "Hide details" : "Show details"}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        mobileDetailsOpen && "rotate-180"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-3 overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  {project.metrics.length > 0 ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {project.metrics.slice(0, 2).map((metric) => (
                        <div
                          key={`${metric.label}-${metric.value}`}
                          className="rounded-md border border-border/70 bg-panel/35 px-2.5 py-2"
                        >
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                            {metric.label}
                          </p>
                          <p className="whitespace-pre-line font-mono text-xs text-neutral-100">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {project.constraints.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {project.constraints.slice(0, 3).map((constraint) => (
                        <span
                          key={constraint}
                          className="rounded-md border border-border/70 bg-transparent px-2 py-1 font-mono text-[10px] text-neutral-300"
                        >
                          {constraint}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          ) : null}
        </>
      ) : (
        <CardContent className="flex-1 space-y-3">
          {project.metrics.length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {project.metrics.slice(0, 2).map((metric) => (
                <div
                  key={`${metric.label}-${metric.value}`}
                  className="rounded-md border border-border/70 bg-panel/35 px-2.5 py-2"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    {metric.label}
                  </p>
                  <p className="whitespace-pre-line font-mono text-xs text-neutral-100">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {renderTechTags()}

          {project.constraints.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {project.constraints.slice(0, 3).map((constraint) => (
                <span
                  key={constraint}
                  className="rounded-md border border-border/70 bg-transparent px-2 py-1 font-mono text-[10px] text-neutral-300"
                >
                  {constraint}
                </span>
              ))}
            </div>
          ) : null}
        </CardContent>
      )}

      <CardFooter
        className={cn(
          "mt-auto flex flex-wrap gap-3",
          isWide && "md:col-start-2 md:pt-0"
        )}
      >
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
