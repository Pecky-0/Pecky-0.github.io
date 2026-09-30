import Image from "next/image";
import type { Publication } from "@/lib/academic";
import { Icon } from "@/components/Icon";

const BUTTON_ORDER = ["project", "paper", "doi", "video", "code"] as const;

const BUTTON_ICONS: Record<(typeof BUTTON_ORDER)[number], string> = {
  project: "link",
  paper: "filetext",
  doi: "link",
  video: "video",
  code: "code",
};

/** 按钮标签，首字母大写 */
const BUTTON_LABELS: Record<(typeof BUTTON_ORDER)[number], string> = {
  project: "Project",
  paper: "Paper",
  doi: "DOI",
  video: "Video",
  code: "Code",
};

/** 作者列表，self 中的加粗，authorLinks 命中的渲染成主页链接 */
function AuthorList({ pub }: { pub: Publication }) {
  const parts: React.ReactNode[] = [];
  pub.authors.forEach((author, i) => {
    if (i > 0) parts.push(<span key={`sep-${i}`}>, </span>);
    const href = pub.authorLinks?.[author];
    const external = href?.startsWith("http");
    if (pub.self?.includes(author)) {
      parts.push(
        <strong key={author} className="font-semibold text-neutral-900 dark:text-white">
          {author}
        </strong>
      );
    } else if (href) {
      parts.push(
        <a
          key={author}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="hover:underline decoration-neutral-300 underline-offset-4 dark:decoration-neutral-600"
        >
          {author}
        </a>
      );
    } else {
      parts.push(<span key={author}>{author}</span>);
    }
  });
  return <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{parts}</p>;
}

export default function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <div
        className={`${
          pub.image ? "relative" : ""
        } aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 sm:w-60`}
      >
        {pub.image ? (
          <Image src={pub.image} alt={pub.title} fill sizes="240px" className="object-cover" />
        ) : (
          <div className="size-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold leading-snug text-neutral-900 dark:text-white">
          {pub.titleHref ? (
            <a
              href={pub.titleHref}
              target={pub.titleHref.startsWith("http") ? "_blank" : undefined}
              rel={pub.titleHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hover:underline decoration-neutral-300 underline-offset-4 dark:decoration-neutral-600"
            >
              {pub.title}
            </a>
          ) : (
            pub.title
          )}
        </h3>
        <div className="mt-2">
          <AuthorList pub={pub} />
        </div>
        <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          <em>{pub.venue}</em>
          <span className="mx-1.5">·</span>
          <time>{pub.date}</time>
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {BUTTON_ORDER.map((key) => {
            const href = pub.links?.[key];
            const content = (
              <>
                <Icon name={BUTTON_ICONS[key]} size={13} />
                <span>{BUTTON_LABELS[key]}</span>
              </>
            );
            if (!href) {
              return (
                <span
                  key={key}
                  aria-disabled
                  className="inline-flex cursor-not-allowed select-none items-center gap-1.5 rounded-md border border-neutral-200 px-2 py-0.5 text-xs text-neutral-400 opacity-60 dark:border-neutral-800 dark:text-neutral-600"
                >
                  {content}
                </span>
              );
            }
            const external = href.startsWith("http");
            return (
              <a
                key={key}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-700 transition-all hover:-translate-y-0.5 hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}
