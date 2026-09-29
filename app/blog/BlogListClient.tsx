"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

export default function BlogListClient({ posts }: { posts: PostMeta[] }) {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {t.blog.title}
      </h1>
      <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">{t.blog.subtitle}</p>
      <div className="stagger mt-8 space-y-3">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.blog.empty}</p>
        )}
      </div>
    </div>
  );
}
