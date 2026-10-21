"use client";

import { useEffect, useRef, useState } from "react";
import type { WalineInstance } from "@waline/client";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import config from "@/public/content/comments.json";
import "@waline/client/style";
import styles from "./Comments.module.css";

export default function Comments({ slug }: { slug: string }) {
  if (!config.enabled || !config.serverURL.trim()) return null;
  // Separate article instances so navigating never carries comments to another post.
  return <CommentThread key={slug} slug={slug} />;
}

function CommentThread({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const labels = config.labels[lang];
  const container = useRef<HTMLDivElement>(null);
  const instance = useRef<WalineInstance | null>(null);
  const language = useRef(lang);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const path = `/blog/${slug}/`;

  useEffect(() => {
    language.current = lang;
    instance.current?.update({ lang: lang === "zh" ? "zh-CN" : "en", path });
  }, [lang, path]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let disposed = false;
    let started = false;
    async function load() {
      if (started) return;
      started = true;
      try {
        const { init } = await import("@waline/client");
        if (disposed) return;
        instance.current = init({
          el: element,
          serverURL: config.serverURL,
          path,
          lang: language.current === "zh" ? "zh-CN" : "en",
          dark: "html.dark",
          pageSize: config.pageSize,
          login: config.requireLogin ? "force" : "enable",
          meta: ["nick"],
          requiredMeta: ["nick"],
          imageUploader: false,
          search: false,
          emoji: false,
          reaction: false,
          noCopyright: false,
          noRss: !config.showRss,
          commentSorting: "latest",
        });
        if (!instance.current) throw new Error("Waline initialization failed");
        setStatus("ready");
      } catch {
        if (!disposed) setStatus("error");
      }
    }
    // Defer the client bundle and API requests until the reader approaches the footer.
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect();
          void load();
        }
      },
      { rootMargin: "300px" },
    );
    if (observer) observer.observe(element);
    else void load();
    return () => {
      disposed = true;
      observer?.disconnect();
      instance.current?.destroy();
      instance.current = null;
    };
  }, [path, attempt]);

  return (
    <section className={styles.comments} aria-labelledby="comments-heading">
      <h2 id="comments-heading">{labels.title}</h2>
      {labels.description && <p className={styles.description}>{labels.description}</p>}
      {status === "loading" && <p role="status">{labels.loading}</p>}
      {status === "error" && (
        <div role="alert">
          <p>{labels.error}</p>
          <button type="button" className={styles.retry} onClick={() => {
            setStatus("loading");
            setAttempt((value) => value + 1);
          }}>{labels.retry}</button>
        </div>
      )}
      <div ref={container} className={styles.thread} data-hide-sorting={!config.showSorting} />
    </section>
  );
}
