"use client";

import { differenceInMonths, parse } from "date-fns";
import {
  BriefcaseBusinessIcon,
  ChevronDownIcon,
  CodeXmlIcon,
  DraftingCompassIcon,
  GraduationCapIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";

const iconMap = {
  code: CodeXmlIcon,
  design: DraftingCompassIcon,
  business: BriefcaseBusinessIcon,
  education: GraduationCapIcon,
} as const;

export type ExperiencePositionIconType = keyof typeof iconMap;

export type ExperiencePositionItemType = {
  id: string;
  title: string;
  /** Omit for project-style rows that don't represent a separate employment period */
  employmentPeriod?: {
    /** MM.YYYY or YYYY format */
    start: string;
    /** MM.YYYY or YYYY; omit for ongoing roles */
    end?: string;
  };
  employmentType?: string;
  description?: string;
  icon?: ExperiencePositionIconType;
  skills?: string[];
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  /**
   * Optional role context displayed as a meta line directly under the company
   * name. Use this when positions[] contains project-style rows (no period).
   */
  role?: {
    title: string;
    employmentPeriod: { start: string; end?: string };
    employmentType?: string;
  };
  positions: ExperiencePositionItemType[];
  isCurrentEmployer?: boolean;
};

export function WorkExperience({
  className,
  experiences,
}: {
  className?: string;
  experiences: ExperienceItemType[];
}) {
  return (
    <div className={cn("bg-transparent", className)}>
      {experiences.map((experience, index) => (
        <FadeIn key={experience.id} delay={index * 160}>
          <ExperienceItem experience={experience} />
        </FadeIn>
      ))}
    </div>
  );
}

export function ExperienceItem({
  experience,
}: {
  experience: ExperienceItemType;
}) {
  const role = experience.role;
  const roleDuration = role
    ? formatDuration(role.employmentPeriod.start, role.employmentPeriod.end)
    : null;

  return (
    <div className="space-y-4 py-4">
      {/* Company header */}
      <div className="not-prose flex items-start gap-3">
        <div
          className="mt-0.5 flex size-6 shrink-0 items-center justify-center"
          aria-hidden
        >
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.companyName}
              width={24}
              height={24}
              quality={100}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <span className="relative flex size-3 items-center justify-center">
              {experience.isCurrentEmployer && (
                <span className="absolute inline-flex size-3 animate-ping rounded-full bg-gl-primary/40" />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-gl-primary" />
              {experience.isCurrentEmployer && (
                <span className="sr-only">Current Employer</span>
              )}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="text-[16px] font-bold leading-snug text-gl-text">
            {experience.companyWebsite ? (
              <a
                href={experience.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gl-primary"
              >
                {experience.companyName}
              </a>
            ) : (
              experience.companyName
            )}
          </h3>

          {role && (
            <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12px] text-gl-text-faint">
              <span>{role.title}</span>
              {role.employmentType && (
                <>
                  <span className="text-gl-border">·</span>
                  <span>{role.employmentType}</span>
                </>
              )}
              <span className="text-gl-border">·</span>
              <span className="flex items-center gap-0.5 tabular-nums">
                <span>{role.employmentPeriod.start}</span>
                <span className="mx-0.5">—</span>
                {role.employmentPeriod.end ? (
                  <span>{role.employmentPeriod.end}</span>
                ) : (
                  <span
                    aria-label="Present"
                    className="font-mono text-[13px] leading-none"
                  >
                    ∞
                  </span>
                )}
              </span>
              {roleDuration && (
                <>
                  <span className="text-gl-border">·</span>
                  <span className="tabular-nums">{roleDuration}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Positions / project rows */}
      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-gl-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePositionItemType;
}) {
  const ExperienceIcon = iconMap[position.icon || "business"];
  const hasPeriod = !!position.employmentPeriod;
  const isCollapsible = !!position.description;

  const start = position.employmentPeriod?.start;
  const end = position.employmentPeriod?.end;
  const isOngoing = hasPeriod && !end;
  const duration = hasPeriod && start ? formatDuration(start, end) : null;

  return (
    <Collapsible
      defaultOpen={position.isExpanded}
      disabled={!isCollapsible}
      asChild
    >
      <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-gl-bg">
        <CollapsibleTrigger
          className={cn(
            "group not-prose block w-full select-none text-left",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:rounded-lg",
            isCollapsible && "hover:before:bg-gl-surface",
          )}
        >
          <div className="relative z-10 mb-1 flex items-center gap-3">
            <div
              className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-gl-surface-2 text-gl-text-muted"
              aria-hidden
            >
              <ExperienceIcon className="size-4" />
            </div>

            <h4 className="flex-1 text-balance text-[15px] font-semibold text-gl-text">
              {position.title}
            </h4>

            {isCollapsible && (
              <div className="shrink-0 text-gl-primary" aria-hidden>
                <ChevronDownIcon className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </div>
            )}
          </div>

          {/* Metadata row — only when the position has its own employment period */}
          {hasPeriod && (
            <dl className="relative z-10 flex items-center gap-2 pl-9 text-[12px] text-gl-text-faint">
              {position.employmentType && (
                <>
                  <div>
                    <dt className="sr-only">Employment Type</dt>
                    <dd>{position.employmentType}</dd>
                  </div>
                  <Separator
                    className="bg-gl-border data-[orientation=vertical]:h-4"
                    orientation="vertical"
                  />
                </>
              )}
              <div>
                <dt className="sr-only">Employment Period</dt>
                <dd className="flex items-center gap-0.5 tabular-nums">
                  <span>{start}</span>
                  <span className="mx-0.5">—</span>
                  {isOngoing ? (
                    <span
                      aria-label="Present"
                      className="font-mono text-[13px] leading-none"
                    >
                      ∞
                    </span>
                  ) : (
                    <span>{end}</span>
                  )}
                </dd>
              </div>
              {duration && (
                <>
                  <Separator
                    className="bg-gl-border data-[orientation=vertical]:h-4"
                    orientation="vertical"
                  />
                  <div>
                    <dt className="sr-only">Duration</dt>
                    <dd className="tabular-nums">{duration}</dd>
                  </div>
                </>
              )}
            </dl>
          )}
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {position.description && (
            <Prose className="pt-2 pl-9">
              <ReactMarkdown>{position.description}</ReactMarkdown>
            </Prose>
          )}
        </CollapsibleContent>

        {Array.isArray(position.skills) && position.skills.length > 0 && (
          <ul className="not-prose flex flex-wrap gap-1.5 pt-3 pl-9">
            {position.skills.map((skill, index) => (
              <li key={index} className="flex">
                <Skill>{skill}</Skill>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Collapsible>
  );
}

function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose max-w-none text-gl-text-muted [&_ul>li::marker]:text-gl-primary",
        "prose-h4:text-gl-text prose-h4:font-semibold prose-h4:tracking-tight prose-h4:mt-4 prose-h4:mb-2",
        "prose-a:font-medium prose-a:break-words prose-a:text-gl-primary prose-a:underline prose-a:underline-offset-4",
        "prose-code:rounded-md prose-code:border prose-code:border-gl-border prose-code:bg-gl-surface-2 prose-code:text-gl-primary prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        className,
      )}
      {...props}
    />
  );
}

function Skill({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-gl-border bg-gl-surface-2 px-2 py-0.5 font-mono text-[10px] text-gl-text-muted",
        className,
      )}
      {...props}
    />
  );
}

function formatDuration(start: string, end?: string): string {
  const startHasMonth = start.includes(".");
  const endHasMonth = end ? end.includes(".") : true;

  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10);
    if (years <= 0) return "";
    return `${years}y`;
  }

  const startDate = parsePeriodDate(start, "first");
  const endDate = end ? parsePeriodDate(end, "last") : new Date();

  const totalMonths = differenceInMonths(endDate, startDate) + 1;
  if (totalMonths <= 0) return "";
  if (totalMonths < 12) return `${totalMonths}m`;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (months === 0) return `${years}y`;
  return `${years}y ${months}m`;
}

function parsePeriodDate(str: string, fallbackMonth: "first" | "last"): Date {
  if (str.includes(".")) {
    return parse(str, "MM.yyyy", new Date());
  }
  return parse(
    `${fallbackMonth === "last" ? "12" : "01"}.${str}`,
    "MM.yyyy",
    new Date(),
  );
}
