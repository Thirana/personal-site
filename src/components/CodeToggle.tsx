"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { ChevronDown, Code2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((m) => ({ default: m.Prism })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[60px] animate-pulse rounded-lg bg-gl-surface-2" />
    ),
  },
);

const githubDarkDimmed: Record<string, CSSProperties> = {
  'code[class*="language-"]': {
    color: "#adbac7",
    background: "none",
    fontStyle: "normal",
  },
  'pre[class*="language-"]': {
    color: "#adbac7",
    background: "none",
    fontStyle: "normal",
  },
  comment: { color: "#768390", fontStyle: "normal" },
  prolog: { color: "#768390", fontStyle: "normal" },
  doctype: { color: "#768390", fontStyle: "normal" },
  cdata: { color: "#768390", fontStyle: "normal" },
  punctuation: { color: "#adbac7" },
  property: { color: "#6cb6ff" },
  tag: { color: "#8ddb8c" },
  boolean: { color: "#6cb6ff" },
  number: { color: "#6cb6ff" },
  constant: { color: "#6cb6ff" },
  symbol: { color: "#dcbdfb" },
  deleted: { color: "#f47067" },
  selector: { color: "#8ddb8c" },
  "attr-name": { color: "#6cb6ff" },
  string: { color: "#96d0ff" },
  char: { color: "#96d0ff" },
  builtin: { color: "#8ddb8c" },
  inserted: { color: "#b4f1b4" },
  operator: { color: "#adbac7" },
  entity: { color: "#adbac7" },
  url: { color: "#96d0ff" },
  variable: { color: "#adbac7" },
  atrule: { color: "#f47067" },
  "attr-value": { color: "#96d0ff" },
  function: { color: "#dcbdfb" },
  "class-name": { color: "#dcbdfb" },
  keyword: { color: "#f47067" },
  regex: { color: "#96d0ff" },
  important: { color: "#f47067", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "normal" },
  namespace: { opacity: "0.7" } as CSSProperties,
};

type CodeToggleProps = {
  title: string;
  code: string;
  language?: string;
  defaultOpen?: boolean;
};

export default function CodeToggle({
  title,
  code,
  language = "typescript",
  defaultOpen = false,
}: CodeToggleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="not-prose my-3 rounded-xl border border-gl-primary/30 bg-gl-surface p-3">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-auto w-full items-start justify-between whitespace-normal text-left border-gl-border bg-gl-surface-2 py-2 font-mono text-xs text-gl-text-muted hover:text-gl-text"
          >
            <span className="flex min-w-0 flex-1 items-start gap-2">
              <Code2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{title}</span>
            </span>
            <ChevronDown
              className={cn(
                "ml-2 mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="mt-3 overflow-x-auto rounded-lg border border-gl-primary/30 bg-gl-surface-2 [scrollbar-gutter:stable] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gl-border [&::-webkit-scrollbar-track]:bg-gl-bg-subtle">
            <SyntaxHighlighter
              language={language}
              style={githubDarkDimmed}
              customStyle={{
                margin: 0,
                padding: "1rem 1.25rem",
                borderRadius: "0.5rem",
                background: "transparent",
                fontSize: "0.8rem",
                lineHeight: "1.65",
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
                  fontStyle: "normal",
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
