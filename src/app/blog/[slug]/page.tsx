import Link from "next/link";
import { posts, getPostBySlug } from "@/data/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Rocking The Nest`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end">
        {post.heroImage.includes("placeholder") ? (
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-hero)" }}
          />
        ) : (
          <img
            src={post.heroImage}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto w-full px-4 pb-12">
          <h1 className="font-heading font-bold text-[2rem] md:text-[2.5rem] leading-[1.2] tracking-[-0.01em] text-text-light mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-text-light/70 text-[0.875rem] font-body font-semibold tracking-[0.02em]">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-text-light/50">•</span>
            <span className="text-text-light/70 text-[0.875rem] font-body font-semibold tracking-[0.02em]">
              Maggie &amp; Brad
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="bg-accent-secondary/80 text-text-light rounded-full px-3 py-0.5 text-xs font-body font-semibold"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-surface-primary py-12 px-4">
        <article className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg max-w-none font-body text-text-primary leading-[1.7]
              [&_h2]:font-heading [&_h2]:font-semibold [&_h2]:text-[2rem] [&_h2]:leading-[1.3] [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:font-heading [&_h3]:font-semibold [&_h3]:text-[1.5rem] [&_h3]:leading-[1.4] [&_h3]:mt-8 [&_h3]:mb-3
              [&_h4]:font-heading [&_h4]:font-semibold [&_h4]:text-[1.25rem] [&_h4]:leading-[1.4] [&_h4]:mt-6 [&_h4]:mb-2
              [&_p]:mb-4
              [&_strong]:font-bold
              [&_a]:text-accent-primary [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </section>

      {/* Navigation */}
      <section className="bg-surface-secondary py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="text-accent-primary font-body font-semibold hover:underline"
              >
                &larr; {prevPost.title}
              </Link>
            ) : (
              <span />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="text-accent-primary font-body font-semibold hover:underline text-right"
              >
                {nextPost.title} &rarr;
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/blog"
              className="text-text-muted font-body font-semibold hover:text-accent-primary transition-colors"
            >
              &larr; Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
