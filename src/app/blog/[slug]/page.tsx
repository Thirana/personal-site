import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import ContentHero from "@/components/ContentHero";

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
      <article className="prose prose-invert max-w-none content-with-hero">
        <Content />
      </article>
    </div>
  );
}
