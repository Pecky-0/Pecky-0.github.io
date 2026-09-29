export interface LinkItem {
  name: string;
  url: string;
  desc?: string;
  category: "research" | "hobby" | "social";
  icon?: string;
  color?: string;
}

export const links: LinkItem[] = [
  { name: "学术主页", url: "#", desc: "占位", category: "research", icon: "graduationcap", color: "6b7280" },
  { name: "GitHub", url: "https://github.com/Pecky-0", desc: "代码与项目", category: "research", icon: "github", color: "181717" },
  { name: "Google Scholar", url: "https://scholar.google.com/", desc: "学术检索", category: "research", icon: "googlescholar", color: "4285F4" },
  { name: "爱好占位一", url: "#", desc: "之后替换", category: "hobby", icon: "music", color: "10b981" },
  { name: "爱好占位二", url: "#", desc: "之后替换", category: "hobby", icon: "gamepad", color: "8b5cf6" },
  { name: "爱好占位三", url: "#", desc: "之后替换", category: "hobby", icon: "palette", color: "f59e0b" },
  { name: "邮箱", url: "mailto:example@example.com", desc: "占位", category: "social", icon: "mail", color: "6b7280" },
];
