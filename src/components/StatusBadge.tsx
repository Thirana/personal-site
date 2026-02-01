import type { ProjectStatus } from "@/lib/content";

type StatusBadgeProps = {
  status: ProjectStatus;
};

const statusStyles: Record<ProjectStatus, string> = {
  Live: "border-emerald-400/40 bg-emerald-500/10 text-emerald-300",
  WIP: "border-amber-400/40 bg-amber-500/10 text-amber-300",
  Paused: "border-slate-400/40 bg-slate-500/10 text-slate-300",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${
        statusStyles[status]
      }`}
    >
      {status}
    </span>
  );
}
