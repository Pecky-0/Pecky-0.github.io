"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

/** 单个 tag 的下拉分组：点击方块展开该 tag 下的文章 */
function TagGroup({
  tag,
  posts,
  defaultOpen,
}: {
  tag: string;
  posts: PostMeta[];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
      >
        <span className="text-sm font-medium uppercase tracking-widest text-neutral-500 group-hover:underline decoration-neutral-300 underline-offset-4 dark:text-neutral-400 dark:decoration-neutral-600">
          {tag}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 dark:text-neutral-500">{posts.length}</span>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`shrink-0 text-neutral-400 transition-transform duration-200 dark:text-neutral-500 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="stagger mt-3 space-y-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function BlogListClient({ posts }: { posts: PostMeta[] }) {
  const { t } = useLanguage();

  // 每篇文章只有一个 tag，按该 tag 归组（保留首次出现的顺序）
  const grouped: [string, PostMeta[]][] = [];
  for (const post of posts) {
    const tag = post.tags[0] ?? "未分类";
    const existing = grouped.find(([key]) => key === tag);
    if (existing) {
      existing[1].push(post);
    } else {
      grouped.push([tag, [post]]);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        古灵精怪
      </h1>
      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-600 dark:text-neutral-400">{t.blog.empty}</p>
      ) : (
        <div className="mt-8 space-y-3">
          {grouped.map(([tag, tagPosts], index) => (
            <TagGroup key={tag} tag={tag} posts={tagPosts} defaultOpen={index === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
