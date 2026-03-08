import Link from "next/link";
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

export default function EvidenceLinks({ items, className }: EvidenceLinksProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <Link
          key={`${item.label}-${item.href}`}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/70 bg-panel/45 px-2.5 py-1.5 font-mono text-[11px] font-semibold text-neutral-100 transition-colors hover:border-white hover:bg-panel/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
        >
          {item.label}
          <ExternalLink className="h-3 w-3" />
        </Link>
      ))}
    </div>
  );
}
