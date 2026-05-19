import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="h-[18px] w-[3px] rounded-full bg-gl-primary" />
          <h2 className="text-[17px] font-bold tracking-[-0.015em] text-gl-text">
            {title}
          </h2>
        </div>
        <div className="min-w-0 flex-1 border-t border-gl-border" />
      </div>
      {children}
    </section>
  );
}
