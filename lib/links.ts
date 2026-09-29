export interface LinkItem {
  name: string;
  url: string;
  /** 右侧副文本（如邮箱地址、说明文字） */
  desc?: string;
  category: "research" | "hobby" | "social";
  icon?: string;
  color?: string;
}

export const links: LinkItem[] = [
  // ── 研究 ──
  { name: "学术主页", url: "#", desc: "占位", category: "research", icon: "graduationcap", color: "6b7280" },
  { name: "GitHub", url: "https://github.com/Pecky-0", desc: "代码与项目", category: "research", icon: "github", color: "181717" },
  { name: "Google Scholar", url: "https://scholar.google.com/", desc: "学术检索", category: "research", icon: "googlescholar", color: "4285F4" },

  // ── 爱好 ──
  { name: "博客", url: "/blog/", desc: "记录与分享", category: "hobby", icon: "pen", color: "10b981" },

  // ── 社交 ──
  // 邮箱不做跳转，url 留空；desc 显示地址
  { name: "邮箱", url: "", desc: "example@example.com", category: "social", icon: "mail", color: "6b7280" },
];
