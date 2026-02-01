import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

type TagProps = {
  children: ReactNode;
};

export default function Tag({ children }: TagProps) {
  return (
    <Badge variant="secondary" className="border border-border/80 bg-panel/60">
      {children}
    </Badge>
  );
}
