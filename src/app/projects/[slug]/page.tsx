import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result) {
    notFound();
  }

  const { meta, Content } = result;

  return (
    <article className="prose prose-invert max-w-none">
      <p className="muted">
        {meta.date} · {meta.status} · {meta.tech.join(", ")}
      </p>
      <Content />
    </article>
  );
}
