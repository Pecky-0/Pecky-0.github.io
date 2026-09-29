"use client";

import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group block rounded-lg border border-neutral-200 p-4 transition-all hover:-translate-y-0.5 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-medium text-neutral-900 group-hover:underline decoration-neutral-300 underline-offset-4 dark:text-white dark:decoration-neutral-600">
          {post.title}
        </h3>
        <time className="shrink-0 text-xs text-neutral-500">{post.date}</time>
      </div>
      {post.tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
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
    </Link>
  );
}
