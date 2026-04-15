"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
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
  const isWide = layout === "wide";
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false);
  const projectPath = `/projects/${project.slug}`;
  const secondaryMetrics = project.metrics.slice(0, 2);
  const visibleConstraints = project.constraints.slice(0, 3);
  const hasMobileDetails =
    secondaryMetrics.length > 0 || visibleConstraints.length > 0;

  const renderDomainTags = (className?: string) => {
    if (project.domains.length === 0) {
      return null;
    }

    return (
      <div className={cn("space-y-2", className)}>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          Focus Areas
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.domains.map((domain) => (
            <Tag
              key={domain}
              className="border-border/60 bg-transparent px-2 py-0.5 font-mono text-[10px] text-neutral-300 hover:border-neutral-400/70 hover:text-neutral-200"
            >
              {domain}
            </Tag>
          ))}
        </div>
      </div>
    );
  };

  const renderTechTags = (className?: string) => {
    if (project.tech.length === 0) {
      return null;
    }

    return (
      <div className={cn("space-y-2", className)}>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Tag
              key={tech}
              className="border-cyan-300/25 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] text-cyan-100 hover:border-cyan-300/45 hover:text-cyan-50"
            >
              {tech}
            </Tag>
          ))}
        </div>
      </div>
    );
  };

  const renderConstraintChips = (constraints: string[]) => {
    if (constraints.length === 0) {
      return null;
    }

    return (
      <div className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          Operating Constraints
        </p>
        <div className="flex flex-wrap gap-1.5">
          {constraints.map((constraint) => (
            <span
              key={constraint}
              className="rounded-md border border-border/70 bg-transparent px-2 py-1 font-mono text-[10px] text-neutral-300"
            >
              {constraint}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderSecondaryMetrics = () => {
    if (secondaryMetrics.length === 0) {
      return null;
    }

    return (
      <div className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          System Signals
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {secondaryMetrics.map((metric) => (
            <div
              key={`${metric.label}-${metric.value}`}
              className="rounded-xl border border-border/70 bg-panel/35 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                {metric.label}
              </p>
              <p className="mt-2 whitespace-pre-line font-mono text-xs leading-6 text-neutral-100">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border/80 bg-[linear-gradient(180deg,rgba(17,24,37,0.96)_0%,rgba(11,15,20,0.98)_100%)] shadow-[0_16px_40px_-32px_rgba(15,23,42,0.95)] transition-[border-color,transform,box-shadow] duration-200 before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/14 before:to-transparent hover:border-neutral-500/80 hover:shadow-[0_28px_70px_-40px_rgba(14,165,233,0.35)] focus-within:border-neutral-400/90 focus-within:shadow-[0_28px_70px_-40px_rgba(14,165,233,0.4)]",
        isWide && "md:grid md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
      )}
    >
      <CardHeader className={cn("space-y-3 p-5 sm:p-6", isWide && "md:row-span-2 md:pr-7")}>
        <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
          <CardTitle className="min-w-0 flex-1 leading-tight">
            <Link
              href={projectPath}
              className="inline-block text-lg text-neutral-100 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-xl"
            >
              {project.title}
            </Link>
          </CardTitle>
          <StatusBadge status={project.status} />
        </div>

        <div className="space-y-3">
          <p className="text-sm leading-7 text-neutral-300">{project.summary}</p>
        </div>

        {renderDomainTags()}
        {renderTechTags()}
      </CardHeader>

      {isWide ? (
        <>
          <CardContent className="hidden p-5 pt-5 md:block md:border-l md:border-border/60 md:p-6 md:pl-6 md:pt-6">
            <div className="space-y-5">
              {renderSecondaryMetrics()}
              {renderConstraintChips(visibleConstraints)}
            </div>
          </CardContent>

          {hasMobileDetails ? (
            <CardContent className="border-t border-border/60 p-5 pt-4 md:hidden">
              <Collapsible
                open={mobileDetailsOpen}
                onOpenChange={setMobileDetailsOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full justify-between border-border/70 bg-panel/25 text-neutral-200 hover:bg-panel/45 hover:text-neutral-100"
                  >
                    <span>
                      {mobileDetailsOpen
                        ? "Hide project details"
                        : "Reveal project details"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        mobileDetailsOpen && "rotate-180"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-4 overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  {renderSecondaryMetrics()}
                  {renderConstraintChips(visibleConstraints)}
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          ) : null}
        </>
      ) : (
        <CardContent className="border-t border-border/60 p-5 pt-4">
          <div className="space-y-4">
            {renderSecondaryMetrics()}
            {renderConstraintChips(visibleConstraints)}
          </div>
        </CardContent>
      )}

      <CardFooter
        className={cn(
          "mt-auto flex flex-wrap items-center gap-2 border-t border-border/60 p-5 pt-4 sm:p-6 sm:pt-4",
          isWide && "md:col-start-2 md:pl-6"
        )}
      >
        <Button
          variant="outline"
          size="default"
          asChild
          className="min-h-11 border-emerald-400/30 bg-emerald-500/10 px-4 text-sm text-emerald-50 hover:border-emerald-300/50 hover:bg-emerald-500/15 hover:text-white"
        >
          <Link href={projectPath}>
            Project overview
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        {project.links.live ? (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="min-h-10 border-border/70 bg-panel/20 text-neutral-200 hover:border-neutral-500/70 hover:bg-panel/45 hover:text-white"
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
            className="min-h-10 border-[1.5px] border-white/40 bg-panel/20 text-neutral-100 hover:border-white/70 hover:bg-panel/45 hover:text-white"
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
