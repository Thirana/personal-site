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
        "inline-flex min-w-[8.5rem] flex-col gap-1 rounded-xl border border-gl-border bg-gl-surface-2 px-3 py-3 text-center",
        className
      )}
    >
      <span className="font-mono text-[22px] font-bold leading-none tabular-nums text-gl-primary">
        {value}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-gl-text-faint">
        {label}
      </span>
    </div>
  );
}
