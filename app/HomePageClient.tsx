"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

export default function HomePageClient({ latestPosts }: { latestPosts: PostMeta[] }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="fade-up">
        <div className="flex items-center gap-5">
          <div
            className="size-16 shrink-0 rounded-full border border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
            role="img"
            aria-label="头像占位"
          />
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.hero.greeting}</p>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Pecky-0
            </h1>
          </div>
        </div>
        <p className="mt-6 text-lg text-neutral-800 dark:text-neutral-200">{t.hero.intro}</p>
        <p className="mt-2 max-w-xl text-neutral-600 dark:text-neutral-400">
          {t.hero.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
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
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {t.skills.title}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {t.skills.items.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {t.projects.title}
        </h2>
        <div className="stagger mt-4 grid gap-4 sm:grid-cols-2">
          {t.projects.items.map((project) => (
            <div
              key={project.title}
              className="group rounded-lg border border-neutral-200 p-5 transition-all hover:-translate-y-0.5 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
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
                  className="mt-3 inline-block text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-600 dark:text-neutral-400 dark:decoration-neutral-600 dark:hover:text-white"
                >
                  {project.title} →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Latest posts */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {t.blog.latestTitle}
          </h2>
          <Link
            href="/blog/"
            className="text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-600 dark:text-neutral-400 dark:hover:text-white"
          >
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
