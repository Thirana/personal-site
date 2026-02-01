import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ContentMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

const blogDir = path.join(process.cwd(), "content", "blog");
const projectsDir = path.join(process.cwd(), "content", "projects");

function normalizeMeta(slug: string, data: Record<string, unknown>): ContentMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: typeof data.date === "string" ? data.date : "",
    summary: typeof data.summary === "string" ? data.summary : "",
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag) => typeof tag === "string")
      : [],
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

export async function getAllBlogPosts() {
  return readMdxMeta(blogDir);
}

export async function getAllProjects() {
  return readMdxMeta(projectsDir);
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
  } catch (error) {
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
      meta: normalizeMeta(slug, data),
      Content,
    };
  } catch (error) {
    return null;
  }
}
