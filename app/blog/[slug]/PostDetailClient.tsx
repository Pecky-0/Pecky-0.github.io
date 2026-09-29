"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Post } from "@/lib/posts";

export default function PostDetailClient({ post }: { post: Post }) {
  const { t } = useLanguage();

  return (
    <article>
      <Link
        href="/blog/"
        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
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
        className="prose dark:prose-invert max-w-none prose-headings:tracking-tight"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
