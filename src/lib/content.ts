import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

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

export type ProjectStatus = "Live" | "WIP" | "Paused" | "Completed";

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
  const domains = data.domains;
  const constraints = data.constraints;
  const metrics = data.metrics;
  const evidence = data.evidence;
  const outcomes = data.outcomes;

  assertProjectField(typeof title === "string", fileName, "Missing title");
  assertProjectField(typeof date === "string", fileName, "Missing date");
  assertProjectField(
    typeof summary === "string",
    fileName,
    "Missing summary"
  );
  assertProjectField(
    status === "Live" || status === "WIP" || status === "Paused" || status === "Completed",
    fileName,
    "Status must be Live, WIP, Paused, or Completed"
  );
  assertProjectField(Array.isArray(tech), fileName, "Missing tech array");
  assertProjectField(
    tech.every((item) => typeof item === "string"),
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
    title,
    date,
    summary,
    status,
    tech,
    links: normalizedLinks,
    featured: typeof featured === "boolean" ? featured : false,
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
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getAllBlogPosts() {
  return readMdxMeta(blogDir);
}

export async function getAllProjects() {
  return readProjectMetaList();
}

export async function getFeaturedProjects(limit = 4) {
  const projects = await readProjectMetaList();
  return projects.filter((project) => project.featured).slice(0, limit);
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const filePath = path.join(blogDir, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    const { default: Content } = await import(
      `../../content/blog/${slug}.mdx`
    );

    return {
      meta: normalizeMeta(slug, data),
      Content,
    };
  } catch {
    return null;
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const filePath = path.join(projectsDir, `${slug}.mdx`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    const { default: Content } = await import(
      `../../content/projects/${slug}.mdx`
    );

    return {
      meta: normalizeProjectMeta(slug, data, `${slug}.mdx`),
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
