"use client";

import { use } from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Activity } from "@/components/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph";

export function GitHubContributions({
  contributions,
  githubProfileUrl,
  className,
  hideFooter = false,
  hideMonthLabels = false,
  blockSize = 11,
  blockMargin = 3,
}: {
  contributions: Promise<Activity[]>;
  githubProfileUrl: string;
  className?: string;
  hideFooter?: boolean;
  hideMonthLabels?: boolean;
  blockSize?: number;
  blockMargin?: number;
}) {
  const data = use(contributions);
  // When month labels are hidden the label-height row is dead space;
  // setting fontSize=0 collapses it (labelHeight = 0 + LABEL_MARGIN = 8px).
  const fontSize = hideMonthLabels ? 0 : 14;

  return (
    <TooltipProvider delayDuration={300}>
      <ContributionGraph
        className={cn("mx-auto py-2", className)}
        data={data}
        blockSize={blockSize}
        blockMargin={blockMargin}
        blockRadius={2}
        fontSize={fontSize}
      >
        <ContributionGraphCalendar
          className="no-scrollbar px-2"
          title="GitHub Contributions"
          hideMonthLabels={hideMonthLabels}
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </g>
              </TooltipTrigger>
              <TooltipContent className="font-sans text-[12px]">
                <p>
                  {activity.count} contribution
                  {activity.count !== 1 ? "s" : ""} on{" "}
                  {format(new Date(activity.date), "dd MMM yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        {!hideFooter && (
          <ContributionGraphFooter className="px-2">
            <ContributionGraphTotalCount>
              {({ totalCount, year }) => (
                <div className="text-[12px] text-[#8c9690]">
                  {totalCount.toLocaleString("en")} contributions in {year} on{" "}
                  <a
                    className="text-gl-text underline underline-offset-2 hover:text-gl-primary transition-colors"
                    href={githubProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              )}
            </ContributionGraphTotalCount>

            <ContributionGraphLegend />
          </ContributionGraphFooter>
        )}
      </ContributionGraph>
    </TooltipProvider>
  );
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-[124px] w-full items-center justify-center">
      <Spinner className="text-[#8c9690]" />
    </div>
  );
}
