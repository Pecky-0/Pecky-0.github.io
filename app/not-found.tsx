"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center py-20 text-center">
      <h1 className="text-5xl font-bold text-neutral-900 dark:text-white">404</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">{t.notFound.description}</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-300"
      >
        {t.notFound.backHome}
      </Link>
    </div>
  );
}
