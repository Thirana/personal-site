import { cn } from "@/lib/utils";

type MetricPillProps = {
  label: string;
  value: string;
  className?: string;
};

export default function MetricPill({ label, value, className }: MetricPillProps) {
  return (
    <div
      className={cn(
        "inline-flex min-w-[8.5rem] flex-col gap-1 rounded-lg border border-border/70 bg-panel/45 px-3 py-2",
        className
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
        {label}
      </span>
      <span className="font-mono text-xs text-neutral-100">{value}</span>
    </div>
  );
}
