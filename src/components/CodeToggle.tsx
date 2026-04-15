"use client";

import { useState } from "react";
import { ChevronDown, Code2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type CodeToggleProps = {
  title: string;
  code: string;
  language?: string;
  defaultOpen?: boolean;
};

export default function CodeToggle({
  title,
  code,
  language = "go",
  defaultOpen = false,
}: CodeToggleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="not-prose my-3 rounded-xl border border-white/15 bg-panel/30 p-3">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full justify-between border-white/15 bg-panel/25 font-mono text-xs text-neutral-200 hover:text-neutral-100"
          >
            <span className="inline-flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5" />
              {title}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="mt-3 overflow-x-scroll rounded-lg border border-border/70 [scrollbar-gutter:stable] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-500/70 [&::-webkit-scrollbar-track]:bg-panel/40">
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: "0.5rem",
                background: "#0b1320",
                fontSize: "0.8rem",
                lineHeight: "1.55",
                whiteSpace: "pre",
              }}
              codeTagProps={{
                style: {
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  whiteSpace: "pre",
                  background: "transparent",
                  border: "0",
                  padding: "0",
                  display: "block",
                },
              }}
              showLineNumbers={false}
              wrapLongLines={false}
            >
              {code.trim()}
            </SyntaxHighlighter>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
