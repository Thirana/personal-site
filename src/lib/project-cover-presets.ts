export type ProjectCaptionCoverPillarTone = "cyan" | "amber" | "slate";

export type ProjectCaptionCoverPillar = {
  title: string;
  detail: string;
  tone: ProjectCaptionCoverPillarTone;
};

export type ProjectCaptionCoverPreset = {
  eyebrow: string;
  displayTitle?: string;
  displaySummary?: string;
  accentWords?: string[];
  panelLabel: string;
  pillars: ProjectCaptionCoverPillar[];
  repoLabel: string;
  repoDetail: string;
  footerNote?: string;
};

export const projectCaptionCoverPresets = {
  "personal-site": {
    eyebrow: "",
    displayTitle: "Portfolio +\nEngineering Blog",
    displaySummary:
      "One place for projects, personal blogs,\nand the engineering concepts behind them.",
    accentWords: ["Engineering"],
    panelLabel: "What This Brings Together",
    pillars: [
      {
        title: "Work Experience",
        detail: "Real project context, delivery constraints, and outcomes.",
        tone: "cyan",
      },
      {
        title: "Personal Blogs",
        detail: "Engineering concepts explained through practical blog posts.",
        tone: "amber",
      },
      {
        title: "Personal Projects",
        detail: "Projects with code, tradeoffs, and the engineering concepts behind them.",
        tone: "cyan",
      },
    ],
    repoLabel: "Open source included",
    repoDetail: "Source code is available for the site itself.",
    footerNote:
      "Built to show both the work itself and the engineering thinking behind it.",
  },
} satisfies Record<string, ProjectCaptionCoverPreset>;

export type ProjectCaptionCoverSlug = keyof typeof projectCaptionCoverPresets;

export function getProjectCaptionCoverPreset(slug: string) {
  return projectCaptionCoverPresets[slug as ProjectCaptionCoverSlug] ?? null;
}

export function getProjectCaptionCoverSlugs() {
  return Object.keys(projectCaptionCoverPresets);
}
