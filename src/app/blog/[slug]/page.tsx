import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import ContentHero from "@/components/ContentHero";
import MetaStrip from "@/components/MetaStrip";
import Tag from "@/components/Tag";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getBlogPostBySlug(slug);

  if (!result) {
    notFound();
  }

  const { meta, Content } = result;

  return (
    <div className="space-y-8">
      <ContentHero
        eyebrow="Blog"
        title={meta.title}
        summary={meta.summary}
        chips={meta.tags}
      />

      <MetaStrip
        items={[
          { label: "Published", value: meta.date || "n/a" },
          { label: "Track", value: meta.track ?? "Engineering" },
          { label: "Complexity", value: meta.level ?? "Intermediate" },
          {
            label: "Applies To",
            value: meta.appliesTo.length > 0 ? meta.appliesTo.join(", ") : "Backend workflows",
          },
        ]}
      />

      {meta.appliesTo.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {meta.appliesTo.map((item) => (
            <Tag key={item} className="px-2.5 py-1 text-[10px] font-mono">
              {item}
            </Tag>
          ))}
        </div>
      ) : null}

      {meta.takeaway ? (
        <div className="space-y-2 rounded-xl border border-border/70 bg-panel/25 p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-400">
            Production Takeaway
          </p>
          <p className="text-sm leading-7 text-neutral-200">{meta.takeaway}</p>
        </div>
      ) : null}

      <article className="prose prose-invert max-w-none content-with-hero">
        <Content />
      </article>
    </div>
  );
}
