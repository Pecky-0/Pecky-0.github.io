"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { PostMeta } from "@/lib/posts";
import styles from "./PublicationNotice.module.css";

const PAGE_SIZE = 5;


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
  const [page, setPage] = useState(0);
  if (posts.length === 0) return null;

  // Sort a copy so the announcement never changes the category list's data.
  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const pageCount = Math.ceil(orderedPosts.length / PAGE_SIZE);
  const currentPage = Math.min(page, pageCount - 1);
  const visiblePosts = orderedPosts.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  return (
    <section className={styles.notice} aria-labelledby="publication-notice-title">
      <div className={styles.heading}>
        <h2 id="publication-notice-title">{t.blog.announcements}</h2>
        <p>{t.blog.newestFirst}</p>
      </div>
      <div className={styles.content}>
        <ol id="publication-notice-list" className={styles.list}>
          {visiblePosts.map((post) => {
            const tag = post.tags[0];
            const type = tag ? (t.blog.typeLabels[tag] ?? tag) : t.blog.uncategorized;
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
      {pageCount > 1 && (
        <nav className={styles.pagination} aria-label={t.blog.announcementPagination}>
          <button type="button" disabled={currentPage === 0} aria-controls="publication-notice-list" onClick={() => setPage(currentPage - 1)}>
            {t.blog.previousPage}
          </button>
          <span role="status" aria-live="polite" aria-atomic="true">
            {t.blog.pageIndicator.replace("{current}", String(currentPage + 1)).replace("{total}", String(pageCount))}
          </span>
          <button type="button" disabled={currentPage === pageCount - 1} aria-controls="publication-notice-list" onClick={() => setPage(currentPage + 1)}>
            {t.blog.nextPage}
          </button>
        </nav>
      )}
    </section>
  );
}
