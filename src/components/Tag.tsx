import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TagProps = {
  children: ReactNode;
  icon?: ReactNode;
  dot?: string;
  className?: string;
};

export default function Tag({ children, icon, dot, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-[#2f3530] px-3 py-1.5 text-[13px] font-medium text-gl-text transition-colors",
        className,
      )}
    >
      {dot ? (
        <span
          className="size-[7px] shrink-0 rounded-full"
          style={{ background: dot }}
        />
      ) : null}
      {icon ? <span className="text-gl-text-muted">{icon}</span> : null}
      {children}
    </span>
  );
}
