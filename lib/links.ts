/**
 * 首页右侧链接导航数据。
 * 增删链接直接改这个文件；category 对应 linkhub 模块：research | entertainment | social
 */
export interface LinkItem {
  /** 显示名称 */
  name: string;
  /** 链接地址 */
  url: string;
  /** 可选：一句话说明（悬停提示或副文本） */
  desc?: string;
  category: "research" | "entertainment" | "social";
}

export const links: LinkItem[] = [
  // ── 研究 ──
  { name: "GitHub", url: "https://github.com/Pecky-0", desc: "代码与项目", category: "research" },
  { name: "技术博客", url: "/blog/", desc: "本站博客文章", category: "research" },
  { name: "Google Scholar", url: "https://scholar.google.com/", desc: "学术检索（占位）", category: "research" },

  // ── 娱乐 ──
  { name: "Bilibili", url: "https://www.bilibili.com/", desc: "视频收藏（占位）", category: "entertainment" },
  { name: "网易云音乐", url: "https://music.163.com/", desc: "歌单（占位）", category: "entertainment" },
  { name: "Steam", url: "https://store.steampowered.com/", desc: "游戏库（占位）", category: "entertainment" },

  // ── 社交 ──
  { name: "邮箱", url: "mailto:example@example.com", desc: "邮件联系（占位）", category: "social" },
  { name: "X / Twitter", url: "https://x.com/", desc: "动态（占位）", category: "social" },
  { name: "小红书", url: "https://www.xiaohongshu.com/", desc: "生活分享（占位）", category: "social" },
];
