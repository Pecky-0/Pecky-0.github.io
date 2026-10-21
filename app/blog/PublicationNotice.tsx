"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { PostMeta } from "@/lib/posts";
import styles from "./PublicationNotice.module.css";

const englishTypes: Record<string, string> = {
  "技术笔记": "technical notes",
  "随笔": "personal essay",
};

function displayDate(date: string, lang: "zh" | "en") {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return date;
  const [, year, month, day] = match;
  if (lang === "zh") return `${year}年${Number(month)}月${Number(day)}日`;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function PublicationNotice({ posts }: { posts: PostMeta[] }) {
  const { t, lang } = useLanguage();
  if (posts.length === 0) return null;

  // Sort a copy so the announcement never changes the category list's data.
  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className={styles.notice} aria-labelledby="publication-notice-title">
      <div className={styles.heading}>
        <h2 id="publication-notice-title">{t.blog.announcements}</h2>
        <p>{t.blog.newestFirst}</p>
      </div>
      <div className={styles.scrollArea} tabIndex={0} role="region" aria-label={t.blog.announcements}>
        <ol className={styles.list}>
          {orderedPosts.map((post) => {
            const tag = post.tags[0];
            const type = tag ? (lang === "en" ? englishTypes[tag] ?? tag : tag) : t.blog.uncategorized;
            return (
              <li key={post.slug} className={styles.item}>
                <time dateTime={post.date}>{displayDate(post.date, lang)}</time>
                <span>{t.blog.publicationNotice.replace("{type}", type)}</span>
                <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
