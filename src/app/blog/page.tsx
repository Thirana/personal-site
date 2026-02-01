import Link from "next/link";
import { getAllBlogPosts } from "@/lib/content";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <article className="prose prose-invert max-w-none">
      <h1>Blog</h1>
      <p>Writing about building calm interfaces and resilient systems.</p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            <p className="muted">{post.summary}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
