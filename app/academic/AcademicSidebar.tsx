import Image from "next/image";
import Link from "next/link";
import type { Profile, ProfileLink } from "@/lib/academic";
import { Icon } from "@/components/Icon";

/** 侧栏单个链接条目：有 href 是链接，无 href 是纯文本行（如地点、学校） */
function SidebarLink({ link }: { link: ProfileLink }) {
  const content = (
    <>
      <Icon name={link.icon} size={16} />
      <span className="text-xs leading-relaxed">{link.label}</span>
      {link.note && <span className="text-xs opacity-60">{link.note}</span>}
    </>
  );

  const className =
    "group flex items-center gap-2 text-neutral-700 hover:text-neutral-950 hover:underline decoration-neutral-300 underline-offset-4 dark:text-neutral-300 dark:hover:text-white dark:decoration-neutral-600";

  if (!link.href) {
    return <div className={className}>{content}</div>;
  }
  const external = link.href.startsWith("http") || link.href.startsWith("mailto:");
  // 站内链接用 Link 客户端导航，避免整页刷新打断背景音乐；外链/mailto 仍是 <a>
  return (
    <Link
      href={link.href}
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
    >
      {content}
    </Link>
  );
}

export default function AcademicSidebar({ profile }: { profile: Profile }) {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
      <Image
        src={profile.avatar}
        alt={profile.name}
        width={112}
        height={112}
        priority
        className="size-28 shrink-0 rounded-full border border-neutral-200 object-cover dark:border-neutral-700"
      />
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
        {profile.name}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {profile.tagline}
      </p>
      <div className="mt-5 flex flex-col gap-2.5">
        {profile.links.map((link) => (
          <SidebarLink key={link.label} link={link} />
        ))}
      </div>
    </div>
  );
}
