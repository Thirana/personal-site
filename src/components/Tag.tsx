import type { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
};

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-border/80 bg-panel/60 px-3 py-1 text-xs text-neutral-200">
      {children}
    </span>
  );
}
