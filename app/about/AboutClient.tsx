"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function AboutClient() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{t.about.title}</h1>
      <p className="mt-4 text-neutral-700 dark:text-neutral-300">{t.about.intro}</p>
      <div className="mt-4 space-y-3 text-neutral-600 dark:text-neutral-400">
        {t.about.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <h2 className="mt-8 text-lg font-semibold text-neutral-900 dark:text-white">
        {t.about.contact}
      </h2>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{t.about.contactBody}</p>
    </div>
  );
}
