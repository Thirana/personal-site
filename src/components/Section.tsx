import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          {title}
        </h2>
        <div className="h-px flex-1 bg-border/70 ml-4" />
      </div>
      {children}
    </section>
  );
}
