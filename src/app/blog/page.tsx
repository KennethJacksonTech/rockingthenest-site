"use client";

import { useState } from "react";
import { posts, allCategories } from "@/data/posts";
import PostCard from "@/components/PostCard";
import CategoryPill from "@/components/CategoryPill";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) =>
          p.categories.some(
            (c) => c.toLowerCase() === activeCategory.toLowerCase()
          )
        );

  return (
    <>
      {/* Page Header */}
      <section className="bg-surface-inverse py-16 px-4 text-center">
        <h1 className="font-heading font-bold text-[2.5rem] leading-[1.2] tracking-[-0.01em] text-text-light mb-3">
          The Blog
        </h1>
        <p className="text-text-light/80 font-body text-lg">
          Stories from the road, the beach, and everywhere in between
        </p>
      </section>

      {/* Category Filter */}
      <section className="bg-surface-primary py-6 px-4 border-b border-border-light">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2">
          {allCategories.map((cat) => (
            <CategoryPill
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </section>

      {/* Post Grid */}
      <section className="bg-surface-primary py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <p className="text-center text-text-muted font-body py-12">
              No posts found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
