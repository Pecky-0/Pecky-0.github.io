"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { links, type LinkItem } from "@/lib/links";
import { Icon } from "@/components/Icon";

function ProfilePanel() {
  const { t } = useLanguage();

  return (
    <div className="profile-panel">
      <Image
        src="/head.jpg"
        alt="Pecky"
        width={112}
        height={112}
        preload
        className="profile-avatar"
      />
      <h1 className="profile-name">
        Pecky
      </h1>
      <p className="profile-note">
        {t.hero.note}
      </p>
      <p className="profile-description">
        {t.hero.description}
      </p>
    </div>
  );
}

/** 右侧单个链接条目。url 为空时是纯展示条目（如邮箱，右侧直接显示地址） */
function LinkRow({ link }: { link: LinkItem }) {
  const { t } = useLanguage();
  const { name, desc } = t.linkItems[link.id];
  const external = link.url.startsWith("http");
  const interactive = link.url !== "";

  const content = (
    <>
      <span className="link-icon"><Icon name={link.icon} size={18} /></span>
      <span className="link-copy">
        <span className="link-title">{name}</span>
        {desc && <span className="link-description">{desc}</span>}
      </span>
      {interactive && <span className="link-arrow" aria-hidden>{external ? "↗" : "→"}</span>}
    </>
  );

  if (!interactive) {
    return (
      <div className="group hub-link">
        {content}
      </div>
    );
  }

  // 站内链接用 Link 客户端导航，避免整页刷新打断背景音乐；外链仍是 <a>
  return (
    <Link
      href={link.url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      title={desc}
      className="group hub-link interactive-link"
    >
      {content}
    </Link>
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
    <div className="link-groups stagger">
      {categories.map((cat) => {
        const items = links.filter((l) => l.category === cat.key);
        if (items.length === 0) return null;
        return (
          <section key={cat.key} className={`link-category category-${cat.key}`}>
            <h2 className="category-title">
              {cat.title}
            </h2>
            <div className="mt-3 space-y-2.5">
              {items.map((link) => (
                <LinkRow key={link.id} link={link} />
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
    <div className="home-layout">
      <div>
        <ProfilePanel />
      </div>
      <div className="min-w-0">
        <LinkHubPanel />
      </div>
    </div>
  );
}
