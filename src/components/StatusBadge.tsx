import type { ProjectStatus } from "@/lib/content";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: ProjectStatus;
};

const statusClass: Record<ProjectStatus, string> = {
  Live: "bg-[#1a3a28] text-[#a0dcb8]",
  Ongoing: "bg-[#362a08] text-[#dfc070]",
  WIP: "bg-[#362a08] text-[#dfc070]",
  Paused: "bg-[#28213a] text-[#c0b4e0]",
  Completed: "bg-[#102840] text-[#88d0e8]",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.06em] uppercase",
        statusClass[status],
      )}
    >
      {status}
    </span>
  );
}
