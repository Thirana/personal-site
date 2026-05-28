"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="space-y-6">
      <div className="flex items-center gap-4">
        <p
          className={cn(
            "shrink-0 font-mono text-[14px] font-bold uppercase tracking-[0.2em] text-gl-primary",
            "transition-[opacity,transform] duration-[520ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
            "motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0",
            drawn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3",
          )}
        >
          {title}
        </p>
        <div
          className={cn(
            "flex-1 origin-left border-t border-gl-border",
            "transition-transform duration-[620ms] ease-[cubic-bezier(0.25,1,0.5,1)]",
            "motion-reduce:transition-none motion-reduce:scale-x-100",
            drawn ? "scale-x-100" : "scale-x-0",
          )}
          style={{ transitionDelay: "60ms" }}
        />
      </div>
      {children}
    </section>
  );
}
