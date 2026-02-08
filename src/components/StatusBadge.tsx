import type { ProjectStatus } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: ProjectStatus;
};

const statusStyles: Record<ProjectStatus, string> = {
  Live: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
  WIP: "border-amber-400/40 bg-amber-500/10 text-amber-300",
  Paused: "border-slate-400/40 bg-slate-500/10 text-slate-300",
  Completed: "border-sky-400/40 bg-sky-500/10 text-sky-300",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn("border", statusStyles[status])}
    >
      {status}
    </Badge>
  );
}
