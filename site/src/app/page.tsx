import Link from "next/link";
import { posts } from "@/data/posts";
import PostCard from "@/components/PostCard";

const categories = [
  { label: "Travel", slug: "travel" },
  { label: "Disney", slug: "disney" },
  { label: "Beach", slug: "beach" },
  { label: "Running", slug: "running" },
  { label: "Family", slug: "family" },
];

export default function Home() {
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <img
          src="/images/brad-maggie-st-kitts-.jpg"
          alt="Maggie and Brad"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-accent-secondary uppercase tracking-[0.1em] text-[0.875rem] font-body font-semibold mb-4">
            ADVENTURES IN EMPTY NESTING
          </p>
          <h1 className="font-heading font-bold text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.02em] text-text-light mb-4">
            Getting older is inevitable — being old is not!
          </h1>
          <p className="text-text-light/80 text-lg font-body leading-[1.7] mb-8">
            Travel, Disney, Concerts &amp; Life After the Kids
          </p>
          <Link
            href="/blog"
            className="inline-block bg-accent-primary text-text-light font-heading font-semibold text-[0.9375rem] uppercase tracking-[0.05em] rounded-md px-7 py-3 hover:brightness-90 hover:scale-[1.02] transition-all"
          >
            Read the Blog
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="bg-surface-primary py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-semibold text-[2rem] leading-[1.3] text-text-primary text-center mb-10">
            Latest Adventures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="text-accent-primary font-body font-semibold hover:underline"
            >
              View All Posts &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="bg-surface-secondary py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading font-semibold text-[2rem] leading-[1.3] text-text-primary mb-4">
              Meet Maggie &amp; Brad
            </h2>
            <p className="text-text-primary/80 font-body leading-[1.7] mb-4">
              The story of Rocking The Nest started in 2014 when we realized we
              would be free in two years. Our youngest was going to graduate from
              high school and we would be childless for the first time in 30 plus
              years! A plan was made to sell the big house on 6 acres and start
              planning the next phase of our lives!
            </p>
            <p className="text-text-primary/80 font-body leading-[1.7] mb-6">
              We decided these are not the days to take it easy – these are the
              days to let go, have fun, and fulfill dreams!
            </p>
            <Link
              href="/about"
              className="inline-block border-2 border-accent-primary text-accent-primary font-heading font-semibold text-[0.9375rem] uppercase tracking-[0.05em] rounded-md px-7 py-3 hover:bg-accent-primary hover:text-text-light transition-all"
            >
              Our Story
            </Link>
          </div>
          <div>
            <img
              src="/images/brad-maggie-st-kitts-.jpg"
              alt="Maggie and Brad in St. Kitts"
              className="rounded-lg w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface-primary py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-heading font-semibold text-[2rem] leading-[1.3] text-text-primary mb-8">
            Explore By Topic
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className="bg-accent-secondary text-text-light rounded-full px-5 py-2 font-body font-semibold text-sm hover:brightness-90 transition-all"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
