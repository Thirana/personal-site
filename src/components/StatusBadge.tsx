import type { ProjectStatus } from "@/lib/content";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: ProjectStatus;
};

const statusClass: Record<ProjectStatus, string> = {
  Live: "bg-[#0d2e1e] text-[#69b598]",
  Ongoing: "bg-[#2a1e08] text-[#c4a05e]",
  WIP: "bg-[#2a1e08] text-[#c4a05e]",
  Paused: "bg-[#2f3530] text-gl-text-muted",
  Completed: "bg-[#0d2030] text-[#62aebf]",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.06em] uppercase",
        statusClass[status]
      )}
    >
      {status}
    </span>
  );
}
