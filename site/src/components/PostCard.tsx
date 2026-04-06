import Link from "next/link";
import type { Post } from "@/data/posts";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-surface-primary rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5 overflow-hidden">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="bg-accent-secondary/15 text-accent-secondary rounded-full px-2 py-0.5 text-xs font-body font-semibold"
              >
                {cat}
              </span>
            ))}
          </div>
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-1 leading-snug">
            {post.title}
          </h3>
          <p className="text-text-muted text-[0.875rem] font-body font-semibold tracking-[0.02em] mb-2">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-text-primary/80 text-sm line-clamp-3 mb-3">
            {post.excerpt}
          </p>
          <span className="text-accent-primary font-body font-semibold text-sm">
            Read More &rarr;
          </span>
        </div>
      </article>
    </Link>
  );
}
