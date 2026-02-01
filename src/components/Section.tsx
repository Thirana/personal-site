import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-4 w-1 rounded-full bg-emerald-400/80" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          {title}
        </h2>
        <Separator className="flex-1 bg-border/70" />
      </div>
      {children}
    </section>
  );
}
