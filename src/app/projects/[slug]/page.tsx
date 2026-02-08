import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import StatusBadge from "@/components/StatusBadge";
import ContentHero from "@/components/ContentHero";

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
    <div className="space-y-8">
      <ContentHero
        eyebrow="Project"
        title={meta.title}
        summary={meta.summary}
        badge={<StatusBadge status={meta.status} />}
        chips={meta.tech}
      />
      <article className="prose prose-invert max-w-none content-with-hero">
        <Content />
      </article>
    </div>
  );
}
