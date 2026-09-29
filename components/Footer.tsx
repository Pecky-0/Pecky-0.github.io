"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-neutral-200 py-6 dark:border-neutral-800">
      <div className="mx-auto max-w-3xl px-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {t.footer.copyright.replace("{year}", String(new Date().getFullYear()))}
      </div>
    </footer>
  );
}
