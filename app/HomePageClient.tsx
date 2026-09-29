"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { links, type LinkItem } from "@/lib/links";
import { Icon } from "@/components/Icon";

function ProfilePanel() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <Image
        src="/head.jpg"
        alt="Pecky"
        width={112}
        height={112}
        priority
        className="size-28 shrink-0 rounded-full border border-neutral-200 object-cover dark:border-neutral-700"
      />
      <h1 className="mt-5 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Pecky
      </h1>
      <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
        {t.hero.note}
      </p>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {t.hero.description}
      </p>
    </div>
  );
}

function LinkRow({ link }: { link: LinkItem }) {
  const external = link.url.startsWith("http");

  return (
    <a
      href={link.url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      title={link.desc}
      className="group flex items-center gap-3 rounded-lg border border-neutral-200 px-4 py-2.5 transition-all hover:-translate-y-0.5 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <Icon name={link.icon} color={link.color} />
      <span className="flex-1 text-sm font-medium text-neutral-800 group-hover:underline decoration-neutral-300 underline-offset-4 dark:text-neutral-200 dark:decoration-neutral-600">
        {link.name}
      </span>
      <span className="text-xs text-neutral-400 dark:text-neutral-500" aria-hidden>→</span>
    </a>
  );
}

function LinkHubPanel() {
  const { t } = useLanguage();

  const categories = [
    { key: "research" as const, title: t.linkhub.research },
    { key: "hobby" as const, title: t.linkhub.hobby },
    { key: "social" as const, title: t.linkhub.social },
  ];

  return (
    <div className="stagger space-y-8">
      {categories.map((cat) => {
        const items = links.filter((l) => l.category === cat.key);
        if (items.length === 0) return null;
        return (
          <section key={cat.key}>
            <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              {cat.title}
            </h2>
            <div className="mt-3 space-y-2.5">
              {items.map((link) => (
                <LinkRow key={link.name} link={link} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function HomePageClient() {
  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 lg:py-8">
      <div className="lg:w-2/5">
        <ProfilePanel />
      </div>
      <div className="flex-1">
        <LinkHubPanel />
      </div>
    </div>
  );
}
