"use client";

import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, BookOpen, FolderOpen } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { techTabs } from "@/content/about";

const ACCENT = "var(--gl-primary)";

export default function TechTabs() {
  return (
    <Tabs defaultValue={techTabs[0].value}>
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <TabsList className="h-auto w-full min-w-max justify-start gap-0 rounded-none border-b border-gl-border bg-transparent p-0">
          {techTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              style={{ "--tab-color": ACCENT } as React.CSSProperties}
              className="rounded-none border-b-2 border-transparent px-5 pb-3 pt-1 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-gl-text-faint shadow-none transition-colors hover:text-gl-text data-[state=active]:border-[var(--tab-color)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--tab-color)] data-[state=active]:shadow-none"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {techTabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-5 space-y-5"
        >
          {/* Tool chips */}
          <div className="flex flex-wrap gap-2">
            {tab.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-2 rounded-full border border-gl-border bg-gl-surface-2 px-3 py-1.5 text-[13px] font-medium text-gl-text"
              >
                <span
                  className="size-[7px] shrink-0 rounded-full"
                  style={{ background: ACCENT }}
                />
                {tool}
              </span>
            ))}
          </div>

          {/* In practice */}
          {tab.highlights.length > 0 && (
            <div className="space-y-2.5">
              <ul className="space-y-2.5">
                {tab.highlights.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gl-primary" />
                    <span className="text-[13px] leading-[1.65] text-gl-text-muted">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related */}
          {tab.related.length > 0 && (
            <div className="space-y-2.5">
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: ACCENT }}
              >
                Related
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {tab.related.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as Route<string>}
                    className="group flex items-center justify-between rounded-lg border border-gl-border bg-gl-bg px-3 py-2.5 transition-colors hover:bg-gl-surface"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      {item.type === "blog" ? (
                        <BookOpen className="h-3.5 w-3.5 shrink-0 text-gl-text-faint" />
                      ) : (
                        <FolderOpen className="h-3.5 w-3.5 shrink-0 text-gl-text-faint" />
                      )}
                      <span className="truncate text-[13px] font-medium text-gl-text-muted transition-colors group-hover:text-gl-text">
                        {item.label}
                      </span>
                    </div>
                    <ArrowRight className="ml-2 h-3.5 w-3.5 shrink-0 text-gl-text-faint" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
