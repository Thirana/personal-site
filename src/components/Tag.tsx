import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TagProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export default function Tag({ children, icon, className }: TagProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "inline-flex items-center gap-2 border border-border/80 bg-panel/60 px-3 py-1 text-xs text-foreground",
        className
      )}
    >
      {icon ? <span className="text-foreground/80">{icon}</span> : null}
      {children}
    </Badge>
  );
}
