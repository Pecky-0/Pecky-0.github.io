"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

export default function HomePageClient({ latestPosts }: { latestPosts: PostMeta[] }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-14">
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div
          className="size-24 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 ring-2 ring-offset-2 ring-blue-200 dark:ring-offset-neutral-950"
          role="img"
          aria-label="头像占位"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.hero.greeting} <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">Pecky-0</span>
          </h1>
          <p className="mt-2 text-lg text-neutral-700 dark:text-neutral-300">{t.hero.intro}</p>
          <p className="mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">{t.hero.description}</p>
          <div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-3">
            <Link
              href="/blog/"
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-300"
            >
              {t.hero.viewBlog}
            </Link>
            <a
              href="https://github.com/Pecky-0"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-500 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500"
            >
              GitHub →
            </a>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{t.skills.title}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {t.skills.items.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{t.projects.title}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {t.projects.items.map((project) => (
            <div
              key={project.title}
              className="rounded-lg border border-neutral-200 p-5 dark:border-neutral-800"
            >
              <h3 className="font-medium text-neutral-900 dark:text-white">{project.title}</h3>
              <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  {project.title} →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{t.blog.latestTitle}</h2>
          <Link href="/blog/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
            {t.blog.viewAll}
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{t.blog.empty}</p>
          )}
        </div>
      </section>
    </div>
  );
}
