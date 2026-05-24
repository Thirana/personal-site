import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export type EvidenceItem = {
  label: string;
  href: string;
};

type EvidenceLinksProps = {
  items: EvidenceItem[];
  className?: string;
};

export default function EvidenceLinks({
  items,
  className,
}: EvidenceLinksProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <a
          key={`${item.label}-${item.href}`}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gl-border-strong/50 bg-gl-surface px-2.5 py-1.5 font-mono text-[11px] font-semibold text-gl-text transition-colors hover:border-gl-border-strong hover:bg-gl-surface-2 focus-visible:outline-none"
        >
          {item.label}
          <ExternalLink className="h-3 w-3" />
        </a>
      ))}
    </div>
  );
}
