import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unstable_cache } from "next/cache";

export type ContentMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  level?: string;
  track?: string;
  appliesTo: string[];
  takeaway?: string;
};

export type ProjectStatus = "Live" | "Ongoing" | "WIP" | "Paused" | "Completed";

export type ProjectLinks = {
  live?: string;
  code?: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  status: ProjectStatus;
  tech: string[];
  links: ProjectLinks;
  featured: boolean;
  priority: number;
  domains: string[];
  constraints: string[];
  metrics: ProjectMetric[];
  evidence: ProjectEvidence[];
  outcomes: string[];
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectEvidence = {
  label: string;
  href: string;
};

const blogDir = path.join(process.cwd(), "content", "blog");
const projectsDir = path.join(process.cwd(), "content", "projects");
const isProduction = process.env.NODE_ENV === "production";
const isProductionBuild = process.env.NEXT_PHASE === "phase-production-build";

export const CONTENT_CACHE_TAGS = {
  blog: "content:blog",
  projects: "content:projects",
} as const;

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function toProjectMetrics(value: unknown): ProjectMetric[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is Record<string, unknown> => {
      return !!item && typeof item === "object" && !Array.isArray(item);
    })
    .map((item) => ({
      label: typeof item.label === "string" ? item.label : "",
      value: typeof item.value === "string" ? item.value : "",
    }))
    .filter((item) => item.label.length > 0 && item.value.length > 0);
}

function toProjectEvidence(value: unknown): ProjectEvidence[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is Record<string, unknown> => {
      return !!item && typeof item === "object" && !Array.isArray(item);
    })
    .map((item) => ({
      label: typeof item.label === "string" ? item.label : "",
      href: typeof item.href === "string" ? item.href : "",
    }))
    .filter((item) => item.label.length > 0 && item.href.length > 0);
}

function normalizeMeta(slug: string, data: Record<string, unknown>): ContentMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : "",
    summary: typeof data.summary === "string" ? data.summary : "",
    tags: toStringArray(data.tags),
    level: typeof data.level === "string" ? data.level : undefined,
    track: typeof data.track === "string" ? data.track : undefined,
    appliesTo: toStringArray(data.appliesTo),
    takeaway: typeof data.takeaway === "string" ? data.takeaway : undefined,
  };
}

function assertProjectField(
  condition: boolean,
  fileName: string,
  message: string
) {
  if (!condition) {
    throw new Error(`[content/projects/${fileName}] ${message}`);
  }
}

function normalizeProjectMeta(
  slug: string,
  data: Record<string, unknown>,
  fileName: string
): ProjectMeta {
  const title = data.title;
  const date = data.date;
  const summary = data.summary;
  const status = data.status;
  const tech = data.tech;
  const links = data.links;
  const featured = data.featured;
  const priority = data.priority;
  const domains = data.domains;
  const constraints = data.constraints;
  const metrics = data.metrics;
  const evidence = data.evidence;
  const outcomes = data.outcomes;
  const techArray = Array.isArray(tech) ? tech : [];
  const normalizedTech = techArray.filter(
    (item): item is string => typeof item === "string"
  );
  const normalizedTitle = typeof title === "string" ? title : slug;
  const normalizedDate = typeof date === "string" ? date : "";
  const normalizedSummary = typeof summary === "string" ? summary : "";
  const normalizedStatus = status as ProjectStatus;
  const normalizedPriority =
    typeof priority === "number" && Number.isFinite(priority)
      ? priority
      : 100;

  assertProjectField(typeof title === "string", fileName, "Missing title");
  assertProjectField(typeof date === "string", fileName, "Missing date");
  assertProjectField(
    typeof summary === "string",
    fileName,
    "Missing summary"
  );
  assertProjectField(
    status === "Live" ||
      status === "Ongoing" ||
      status === "WIP" ||
      status === "Paused" ||
      status === "Completed",
    fileName,
    "Status must be Live, Ongoing, WIP, Paused, or Completed"
  );
  assertProjectField(Array.isArray(tech), fileName, "Missing tech array");
  assertProjectField(
    normalizedTech.length === techArray.length,
    fileName,
    "Tech must be an array of strings"
  );

  const normalizedLinks: ProjectLinks = {};
  if (links && typeof links === "object" && !Array.isArray(links)) {
    const live = (links as { live?: unknown }).live;
    const code = (links as { code?: unknown }).code;
    if (typeof live === "string") {
      normalizedLinks.live = live;
    }
    if (typeof code === "string") {
      normalizedLinks.code = code;
    }
  }

  return {
    slug,
    title: normalizedTitle,
    date: normalizedDate,
    summary: normalizedSummary,
    status: normalizedStatus,
    tech: normalizedTech,
    links: normalizedLinks,
    featured: typeof featured === "boolean" ? featured : false,
    priority: normalizedPriority,
    domains: toStringArray(domains),
    constraints: toStringArray(constraints),
    metrics: toProjectMetrics(metrics),
    evidence: toProjectEvidence(evidence),
    outcomes: toStringArray(outcomes),
  };
}

async function readMdxMeta(dir: string) {
  const files = await fs.readdir(dir);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        const { data } = matter(raw);
        return normalizeMeta(slug, data);
      })
  );

  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

async function readProjectMetaList() {
  const files = await fs.readdir(projectsDir);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = await fs.readFile(path.join(projectsDir, file), "utf8");
        const { data } = matter(raw);
        return normalizeProjectMeta(slug, data, file);
      })
  );

  return entries.sort(
    (a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }

      const byDate = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (byDate !== 0) {
        return byDate;
      }

      return a.title.localeCompare(b.title);
    }
  );
}

async function readBlogMetaBySlug(slug: string) {
  try {
    const filePath = path.join(blogDir, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    return normalizeMeta(slug, data as Record<string, unknown>);
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const maybeCode = (error as Error & { code?: string }).code;
      if (maybeCode === "ENOENT") {
        return null;
      }
    }

    throw error;
  }
}

async function readProjectMetaBySlug(slug: string) {
  try {
    const filePath = path.join(projectsDir, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    return normalizeProjectMeta(slug, data as Record<string, unknown>, `${slug}.mdx`);
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const maybeCode = (error as Error & { code?: string }).code;
      if (maybeCode === "ENOENT") {
        return null;
      }
    }

    throw error;
  }
}

const getAllBlogPostsCached = unstable_cache(
  async () => readMdxMeta(blogDir),
  ["content-blog-list"],
  { tags: [CONTENT_CACHE_TAGS.blog] }
);

const getAllProjectsCached = unstable_cache(
  async () => readProjectMetaList(),
  ["content-project-list"],
  { tags: [CONTENT_CACHE_TAGS.projects] }
);

const getBlogMetaBySlugCached = unstable_cache(
  async (slug: string) => readBlogMetaBySlug(slug),
  ["content-blog-by-slug"],
  { tags: [CONTENT_CACHE_TAGS.blog] }
);

const getProjectMetaBySlugCached = unstable_cache(
  async (slug: string) => readProjectMetaBySlug(slug),
  ["content-project-by-slug"],
  { tags: [CONTENT_CACHE_TAGS.projects] }
);

export async function getAllBlogPosts() {
  if (!isProduction || isProductionBuild) {
    return readMdxMeta(blogDir);
  }

  return getAllBlogPostsCached();
}

export async function getAllProjects() {
  if (!isProduction || isProductionBuild) {
    return readProjectMetaList();
  }

  return getAllProjectsCached();
}

export async function getFeaturedProjects(limit = 4) {
  const projects = isProduction && !isProductionBuild
    ? await getAllProjectsCached()
    : await readProjectMetaList();

  return projects.filter((project) => project.featured).slice(0, limit);
}

export async function getBlogMetaBySlug(slug: string) {
  if (!isProduction || isProductionBuild) {
    return readBlogMetaBySlug(slug);
  }

  return getBlogMetaBySlugCached(slug);
}

export async function getProjectMetaBySlug(slug: string) {
  if (!isProduction || isProductionBuild) {
    return readProjectMetaBySlug(slug);
  }

  return getProjectMetaBySlugCached(slug);
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const meta = await getBlogMetaBySlug(slug);
    if (!meta) {
      return null;
    }

    const { default: Content } = await import(
      `../../content/blog/${slug}.mdx`
    );

    return {
      meta,
      Content,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const maybeCode = (error as Error & { code?: string }).code;
      if (maybeCode === "ENOENT") {
        return null;
      }
    }

    return null;
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const meta = await getProjectMetaBySlug(slug);
    if (!meta) {
      return null;
    }

    const { default: Content } = await import(
      `../../content/projects/${slug}.mdx`
    );

    return {
      meta,
      Content,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const maybeCode = (error as Error & { code?: string }).code;
      if (maybeCode === "ENOENT") {
        return null;
      }
    }
    throw error;
  }
}
