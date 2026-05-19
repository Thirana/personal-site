export type BlogCaptionCoverTone = "offset" | "cursor";

export type BlogCaptionCoverComparisonRow = {
  label: string;
  tone: BlogCaptionCoverTone;
  barFill: number;
  calloutStrong: string;
  calloutSoft?: string;
};

export type BlogCaptionCoverChecklistItem = {
  label: string;
  detail: string;
};

type BlogCaptionCoverBasePreset = {
  eyebrow: string;
  displayTitle?: string;
  displaySummary?: string;
  accentWords?: string[];
  chips: string[];
  footerHost: string;
  footerNote?: string | null;
};

export type BlogCaptionCoverPreset =
  | (BlogCaptionCoverBasePreset & {
      visual: "comparison";
      comparisonRows: BlogCaptionCoverComparisonRow[];
    })
  | (BlogCaptionCoverBasePreset & {
      visual: "checklist";
      checklistLabel: string;
      checklistItems: BlogCaptionCoverChecklistItem[];
    });

export const blogCaptionCoverPresets = {
  "cursor-pagination-product-listing-api": {
    visual: "comparison",
    eyebrow: "Production Engineering",
    displayTitle: "Cursor Pagination at Scale",
    displaySummary:
      "How production systems page through millions of records without wasted database work",
    accentWords: ["Pagination"],
    comparisonRows: [
      {
        label: "OFFSET APPROACH",
        tone: "offset",
        barFill: 86,
        calloutStrong: "950 rows scanned",
        calloutSoft: "to return 50",
      },
      {
        label: "CURSOR APPROACH",
        tone: "cursor",
        barFill: 6,
        calloutStrong: "Jumps directly",
        calloutSoft: "to position",
      },
    ],
    chips: [
      "Stable continuation",
      "Index-aware queries",
      "Opaque cursors",
      "PostgreSQL",
    ],
    footerHost: "portfolio-thirana.vercel.app",
  },
  "production-style-nestjs-backend": {
    visual: "checklist",
    eyebrow: "Production Engineering",
    displayTitle: "Production\nBackends",
    displaySummary:
      "How backend services validate config,\nexpose clear runtime signals,\nand stay predictable under real traffic",
    accentWords: ["Production"],
    checklistLabel: "Production Readiness",
    checklistItems: [
      {
        label: "Validate config before startup",
        detail: "Fail fast when runtime state is incomplete.",
      },
      {
        label: "Check critical services early",
        detail: "Confirm databases and key integrations are reachable.",
      },
      {
        label: "Attach request IDs early",
        detail: "Trace one request cleanly across logs and errors.",
      },
      {
        label: "Standardize validation and failures",
        detail: "Keep one predictable request pipeline.",
      },
      {
        label: "Separate liveness and readiness",
        detail: "Know when the service is truly ready for traffic.",
      },
      {
        label: "Keep logs useful in dev and prod",
        detail: "Stay readable locally and structured in deployment.",
      },
    ],
    chips: [],
    footerHost: "portfolio-thirana.vercel.app",
    footerNote: null,
  },
} satisfies Record<string, BlogCaptionCoverPreset>;

export type BlogCaptionCoverSlug = keyof typeof blogCaptionCoverPresets;

export function getBlogCaptionCoverPreset(slug: string) {
  return blogCaptionCoverPresets[slug as BlogCaptionCoverSlug] ?? null;
}

export function getBlogCaptionCoverSlugs() {
  return Object.keys(blogCaptionCoverPresets);
}
