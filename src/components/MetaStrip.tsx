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
        "glass-panel grid grid-cols-2 gap-2 rounded-xl border border-transparent bg-gl-surface-2 p-3 lg:grid-cols-4",
        className
      )}
    >
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="min-w-0 space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gl-text-faint">
            {item.label}
          </p>
          <p className="font-mono text-xs leading-5 text-gl-text">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
