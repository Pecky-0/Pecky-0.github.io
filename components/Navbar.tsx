"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const pathname = usePathname();

  const links = [
    { href: "/", label: t.nav.home },
  ];

  const toggleLang = () => setLang(lang === "zh" ? "en" : "zh");

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Pecky
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname === link.href
                  ? "text-neutral-900 dark:text-white"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t.langToggle.ariaLabel}
            className="ml-1 rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:text-white"
          >
            {t.langToggle.label}
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
