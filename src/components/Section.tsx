import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <p className="shrink-0 font-mono text-[14px] font-bold uppercase tracking-[0.2em] text-gl-primary">
          {title}
        </p>
        <div className="flex-1 border-t border-gl-border" />
      </div>
      {children}
    </section>
  );
}
