"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

export default function BlogListClient({ posts }: { posts: PostMeta[] }) {
  const { t } = useLanguage();

  // 按 tags 分组：一篇文章多个 tag 时归入每个 tag 的组（保留首次出现的顺序）
  const grouped: [string, PostMeta[]][] = [];
  for (const post of posts) {
    const tags = post.tags.length > 0 ? post.tags : ["未分类"];
    for (const tag of tags) {
      const existing = grouped.find(([t]) => t === tag);
      if (existing) {
        existing[1].push(post);
      } else {
        grouped.push([tag, [post]]);
      }
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        古灵精怪
      </h1>
      <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">{t.blog.subtitle}</p>
      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-600 dark:text-neutral-400">{t.blog.empty}</p>
      ) : (
        <div className="mt-8 space-y-10">
          {grouped.map(([tag, tagPosts]) => (
            <section key={tag}>
              <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                {tag}
              </h2>
              <div className="stagger mt-3 space-y-3">
                {tagPosts.map((post) => (
                  <PostCard key={`${tag}-${post.slug}`} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
