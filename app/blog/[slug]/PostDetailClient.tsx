"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Post, PostMeta } from "@/lib/posts";

function AdjacentLink({ post, label, dir }: { post: PostMeta | null; label: string; dir: "newer" | "older" }) {
  if (!post) {
    return <div className="flex-1" />;
  }
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className={`group flex-1 rounded-lg border border-neutral-200 p-3.5 transition-all hover:-translate-y-0.5 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 ${
        dir === "older" ? "text-right" : ""
      }`}
    >
      <span className="text-xs text-neutral-500 dark:text-neutral-400">{label}</span>
      <span className="mt-1 block truncate text-sm font-medium text-neutral-800 group-hover:underline decoration-neutral-300 underline-offset-4 dark:text-neutral-200 dark:decoration-neutral-600">
        {post.title}
      </span>
    </Link>
  );
}

export default function PostDetailClient({
  post,
  newer,
  older,
}: {
  post: Post;
  newer: PostMeta | null;
  older: PostMeta | null;
}) {
  const { t, lang } = useLanguage();
  const newerLabel = lang === "zh" ? "← 上一篇" : "← Newer";
  const olderLabel = lang === "zh" ? "下一篇 →" : "Older →";

  return (
    <article>
      <Link href="/blog/" className="text-sm text-neutral-600 hover:underline decoration-neutral-300 underline-offset-4 dark:text-neutral-400 dark:decoration-neutral-600">
        {t.blog.backToList}
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {post.title}
      </h1>
      <div className="mt-2 flex items-center gap-3 text-sm text-neutral-500">
        <time>{post.date}</time>
        {post.tags.length > 0 && (
          <div className="flex gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <hr className="my-6 border-neutral-200 dark:border-neutral-800" />
      <div
        className="prose dark:prose-invert max-w-none prose-headings:tracking-tight prose-img:rounded-lg prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <div className="mt-12 flex gap-4">
        <AdjacentLink post={newer} label={newerLabel} dir="newer" />
        <AdjacentLink post={older} label={olderLabel} dir="older" />
      </div>
    </article>
  );
}
