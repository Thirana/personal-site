import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import StatusBadge from "@/components/StatusBadge";

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
    <article className="prose prose-invert max-w-none text-neutral-100 font-medium">
      <div className="not-prose mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-200">
        <span>{meta.date}</span>
        <span className="text-neutral-400">•</span>
        <StatusBadge status={meta.status} />
        <span className="text-neutral-400">•</span>
        <span className="text-neutral-200">{meta.tech.join(", ")}</span>
      </div>
      <Content />
    </article>
  );
}
