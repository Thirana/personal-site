import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaptionCoverDownload from "@/components/ProjectCaptionCoverDownload";
import { getProjectMetaBySlug } from "@/lib/content";
import {
  getProjectCaptionCoverPreset,
  getProjectCaptionCoverSlugs,
} from "@/lib/project-cover-presets";

type ProjectCoverPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Internal Project Cover Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export function generateStaticParams() {
  return getProjectCaptionCoverSlugs().map((slug) => ({ slug }));
}

export default async function ProjectCoverPage({
  params,
}: ProjectCoverPageProps) {
  const { slug } = await params;
  const preset = getProjectCaptionCoverPreset(slug);

  if (!preset) {
    notFound();
  }

  const meta = await getProjectMetaBySlug(slug);

  if (!meta) {
    notFound();
  }

  return (
    <ProjectCaptionCoverDownload
      slug={slug}
      title={meta.title}
      summary={meta.summary}
      preset={preset}
    />
  );
}
