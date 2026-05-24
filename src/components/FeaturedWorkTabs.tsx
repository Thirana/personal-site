"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import type { ProjectMeta, ContentMeta } from "@/lib/content";

type FeaturedWorkTabsProps = {
  projects: ProjectMeta[];
  posts: ContentMeta[];
};

const ACCENT = "var(--gl-primary)";

export default function FeaturedWorkTabs({
  projects,
  posts,
}: FeaturedWorkTabsProps) {
  return (
    <Tabs defaultValue="projects">
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <TabsList className="h-auto w-full min-w-max justify-start gap-0 rounded-none border-b border-gl-border bg-transparent p-0">
          {[
            { value: "projects", label: "Projects" },
            { value: "writing", label: "Writing" },
          ].map((tab) => (
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

      <TabsContent value="projects">
        <div className="divide-y divide-gl-border">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="writing">
        <div className="divide-y divide-gl-border">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
