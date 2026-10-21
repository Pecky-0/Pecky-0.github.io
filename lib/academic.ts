import data from "@/public/academic/data.json";

/** About 段落和 News 正文里的内联链接，用 markdown 语法写在字符串里：[text](url) */
export interface ProfileLink {
  label: string;
  href?: string;
  icon?: string;
  /** 无链接时的副文本（如地点、学校名） */
  note?: string;
}

export interface Profile {
  name: string;
  avatar: string;
  tagline: string;
  links: ProfileLink[];
}

export interface Publication {
  title: string;
  /** 标题链接（通常是项目页），缺省时标题不可点 */
  titleHref?: string;
  authors: string[];
  /** 需要加粗的作者名（通常是自己） */
  self?: string[];
  /** 合作者主页：作者名 → 主页地址，命中的作者名渲染成可点链接 */
  authorLinks?: Record<string, string>;
  /** 斜体显示，如 "SIGGRAPH Asia 2026" */
  venue: string;
  date: string;
  /** 预览图路径（public 下的根绝对路径），缺省渲染中性渐变占位块 */
  image?: string;
  /** 五种按钮，缺哪个渲染灰色禁用态 */
  links?: Partial<Record<"project" | "paper" | "doi" | "video" | "code", string>>;
}

export interface EducationItem {
  school: string;
  schoolHref?: string;
  details: string[];
}

export interface AcademicData {
  profile: Profile;
  about: string[];
  publications: Publication[];
  education: EducationItem[];
}

export const academic: AcademicData = data;

export const academicAnchors: [string, string][] = [
  ["#about", "About"],
  ...(academic.publications.length ? [["#publications", "Publications"] as [string, string]] : []),
  ...(academic.education.length ? [["#education", "Education"] as [string, string]] : []),
];
