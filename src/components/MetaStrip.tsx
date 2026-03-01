import { cn } from "@/lib/utils";

export type MetaStripItem = {
  label: string;
  value: string;
};

type MetaStripProps = {
  items: MetaStripItem[];
  className?: string;
};

export default function MetaStrip({ items, className }: MetaStripProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid gap-2 rounded-lg border border-border/70 bg-panel/30 p-3 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">
            {item.label}
          </p>
          <p className="font-mono text-xs text-neutral-100">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
