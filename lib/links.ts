import type { Dictionary } from "@/lib/i18n/dictionaries";

export interface LinkItem {
  /** Stable dictionary key; display text follows the selected language. */
  id: keyof Dictionary["linkItems"];
  url: string;
  category: "research" | "hobby" | "social";
  icon?: string;
  color?: string;
}

export const links: LinkItem[] = [
  // ── 研究 ──
  { id: "academic", url: "/academic/", category: "research", icon: "graduationcap", color: "6b7280" },
  { id: "github", url: "https://github.com/Pecky-0", category: "research", icon: "github", color: "181717" },
  { id: "scholar", url: "https://scholar.google.com/", category: "research", icon: "googlescholar", color: "4285F4" },

  // ── 爱好 ──
  { id: "blog", url: "/blog/", category: "hobby", icon: "pen", color: "10b981" },

  // ── 社交 ──
  // 邮箱不做跳转，url 留空；desc 显示地址
  { id: "email", url: "", category: "social", icon: "mail", color: "6b7280" },
];
