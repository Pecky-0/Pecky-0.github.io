/**
 * 学术主页数据中枢：所有内容集中在这里，之后改内容只需编辑本文件。
 * 注意：如果清空了某个区块的数组（如 news），页面会自动隐藏该区块，
 * 但 Navbar 里的锚点导航是硬编码的，需要同步删掉对应锚点。
 */

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

export const academic: AcademicData = {
  profile: {
    name: "Peiqi Wang（王佩琦）",
    avatar: "/head.jpg",
    tagline: "I explore Computer Graphics. Love art & technology.",
    links: [
      { label: "Hefei, Anhui, China", icon: "mappin" },
      { label: "University of Science and Technology of China", icon: "graduationcap" },
      { label: "Email", href: "mailto:pecky@mail.ustc.edu.cn", icon: "mail" },
      { label: "GitHub", href: "https://github.com/Pecky-0", icon: "github" },
      { label: "Google Scholar", href: "https://scholar.google.com/", icon: "googlescholar" },
      { label: "Blog", href: "/blog/", icon: "pen" },
    ],
  },
  about: [
    "I am currently a senior undergraduate majoring in Computer Science and Technology at the University of Science and Technology of China (USTC). I will start my graduate studies at University of Science and Technology, under the supervision of [Prof. Ligang Liu](http://staff.ustc.edu.cn/~lgliu/). My research interest lies in Computer Graphics.",
    "Outside of research, I am passionate about game development, drawing, and literature and arts. You can visit my [blog](/blog/), where I share my quirky thoughts and technology-related notes.",
  ],
  publications: [
    {
      title: "Differentiable Rendering for Specular Materials via Projected Specular Manifolds.",
      titleHref: "https://rhythm25.github.io/PSMpage/",
      authors: ["Ruizeng Li", "Peiqi Wang", "Beibei Wang", "Ligang Liu"],
      self: ["Peiqi Wang"],
      authorLinks: {
        // 作者主页，格式：作者名: "主页地址"
        "Ligang Liu": "http://staff.ustc.edu.cn/~lgliu/",
        "Beibei Wang": "https://bbwang.github.io/",
      },
      venue: "SIGGRAPH Asia 2026",
      date: "December, 2026",
      // 缩略图放 public/ 下（如 public/academic/paper/PSM.png），这里写根绝对路径（不带 public 前缀）
      image: "/academic/paper/PSM.png",
      links: {
        project: "https://rhythm25.github.io/PSMpage/",
        paper: "",
        doi: "",
        video: "",
        code: "https://github.com/Rhythm25/PSM",
      },
    }
  ],
  education: [
    {
      school: "University of Science and Technology of China",
      schoolHref: "http://en.ustc.edu.cn/",
      details: ["B.S. in Computer Science", "Sep, 2023 - Present"],
    },
  ]
};
