"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import ThemeToggle from "./ThemeToggle";
import MusicPlayer from "./MusicPlayer";

/** 学术页的区块锚点（只在 /academic/ 时显示）。清空数据区块时需同步维护 */
const ACADEMIC_ANCHORS: [string, string][] = [
  ["#about", "About"],
  ["#publications", "Publications"],
  ["#education", "Education"],
];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname() ?? "/";
  // trailingSlash: true 下路径可能带尾斜杠，用前缀匹配
  const onAcademic = pathname.startsWith("/academic");

  const links = [
    { href: "/", label: t.nav.home },
  ];

  const toggleLang = () => setLang(lang === "zh" ? "en" : "zh");

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav
        className={`mx-auto flex h-14 items-center justify-between px-4 ${
          onAcademic ? "max-w-6xl" : "max-w-3xl"
        }`}
      >
        <Link href="/" className="font-semibold tracking-tight">
          Pecky
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {onAcademic && (
            <div className="hidden items-center gap-0.5 lg:flex">
              {ACADEMIC_ANCHORS.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-md px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          )}
          {!onAcademic && (
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.langToggle.ariaLabel}
              className="ml-1 rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:text-white"
            >
              {t.langToggle.label}
            </button>
          )}
          <MusicPlayer />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
