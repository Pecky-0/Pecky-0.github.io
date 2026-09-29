"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function AboutClient() {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {t.about.title}
      </h1>
      <p className="mt-5 text-lg text-neutral-800 dark:text-neutral-200">{t.about.intro}</p>
      <div className="mt-4 space-y-3 text-neutral-600 dark:text-neutral-400">
        {t.about.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <h2 className="mt-10 text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        {t.about.contact}
      </h2>
      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">{t.about.contactBody}</p>
    </div>
  );
}
