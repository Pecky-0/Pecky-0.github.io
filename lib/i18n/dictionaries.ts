export type Language = "zh" | "en";

/** 界面文案结构。新增语言只需新增一个满足此类型的对象。 */
export interface Dictionary {
  nav: { home: string; blog: string; about: string };
  hero: {
    note: string;
    description: string;
  };
  linkhub: { research: string; entertainment: string; social: string };
  skills: { title: string; items: string[] };
  projects: {
    title: string;
    viewAll: string;
    items: { title: string; description: string; link: string }[];
  };
  blog: {
    title: string;
    subtitle: string;
    empty: string;
    readMore: string;
    backToList: string;
    latestTitle: string;
    viewAll: string;
  };
  about: {
    title: string;
    intro: string;
    body: string[];
    contact: string;
    contactBody: string;
  };
  footer: { copyright: string };
  notFound: { title: string; description: string; backHome: string };
  langToggle: { label: string; ariaLabel: string };
}

export const zh: Dictionary = {
  nav: { home: "首页", blog: "博客", about: "关于" },
  hero: {
    note: "今天喝冰红茶了吗！",
    description:
      "希望有一天，我能讲出一些带给别人爱与感动的故事。如果等到垂垂老矣，当我意识到我没有，同时再也无法做到我希望的这些，或许我会大哭一场。",
  },
  linkhub: {
    research: "研究",
    entertainment: "娱乐",
    social: "社交",
  },
  skills: {
    title: "技能",
    items: ["JavaScript / TypeScript", "React / Next.js", "Python", "Git", "SQL", "Linux"],
  },
  projects: {
    title: "精选项目",
    viewAll: "查看全部",
    items: [
      {
        title: "个人网站",
        description: "使用 Next.js 构建的个人网站，部署在 GitHub Pages 上。",
        link: "https://github.com/Pecky-0",
      },
      {
        title: "项目占位二",
        description: "在这里介绍你的第二个项目：做了什么、用了什么技术、解决了什么问题。",
        link: "",
      },
      {
        title: "项目占位三",
        description: "在这里介绍你的第三个项目，之后替换成你自己的真实项目。",
        link: "https://github.com/Pecky-0",
      },
      {
        title: "项目占位四",
        description: "在这里介绍你的第四个项目，之后替换成你自己的真实项目。",
        link: "https://github.com/Pecky-0",
      },
    ],
  },
  blog: {
    title: "博客",
    subtitle: "记录学习与思考",
    empty: "还没有文章，敬请期待。",
    readMore: "阅读全文",
    backToList: "← 返回列表",
    latestTitle: "最新文章",
    viewAll: "查看全部 →",
  },
  about: {
    title: "关于我",
    intro: "你好！我是 Pecky，一名热爱技术与创造的开发者。",
    body: [
      "这一页用来介绍你自己：你的背景、正在学习或专注的方向、经历与兴趣。",
      "你可以直接编辑 app/about/page.tsx 来修改这里的内容，或告诉我你想展示什么，我来帮你改。",
    ],
    contact: "联系方式",
    contactBody: "GitHub: [Pecky-0](https://github.com/Pecky-0) · 邮箱：待补充",
  },
  footer: { copyright: "© {year} Pecky · 用 Next.js 构建，托管于 GitHub Pages" },
  notFound: {
    title: "404 - 页面不存在",
    description: "你访问的页面不存在或已被移动。",
    backHome: "← 返回首页",
  },
  langToggle: { label: "EN", ariaLabel: "切换到 English" },
};

export const en: Dictionary = {
  nav: { home: "Home", blog: "Blog", about: "About" },
  hero: {
    note: "Sleepy, but doing what I love.",
    description:
      "A developer who loves building things. I write about what I learn and the projects I build.",
  },
  linkhub: {
    research: "Research",
    entertainment: "Entertainment",
    social: "Social",
  },
  skills: {
    title: "Skills",
    items: ["JavaScript / TypeScript", "React / Next.js", "Python", "Git", "SQL", "Linux"],
  },
  projects: {
    title: "Featured Projects",
    viewAll: "View All",
    items: [
      {
        title: "Personal Website",
        description: "A personal site built with Next.js and deployed on GitHub Pages.",
        link: "https://github.com/Pecky-0",
      },
      {
        title: "Project Placeholder 2",
        description: "Describe your second project here: what it does, the tech it uses, the problem it solves.",
        link: "",
      },
      {
        title: "Project Placeholder 3",
        description: "Replace this with your third real project.",
        link: "https://github.com/Pecky-0",
      },
      {
        title: "Project Placeholder 4",
        description: "Replace this with your fourth real project.",
        link: "https://github.com/Pecky-0",
      },
    ],
  },
  blog: {
    title: "Blog",
    subtitle: "Notes and thoughts",
    empty: "No posts yet. Stay tuned.",
    readMore: "Read More",
    backToList: "← Back to List",
    latestTitle: "Latest Posts",
    viewAll: "View All →",
  },
  about: {
    title: "About Me",
    intro: "Hi! I'm Pecky, a developer who loves building things.",
    body: [
      "This page is where you introduce yourself: your background, what you're learning or focusing on, your experience and interests.",
      "You can edit app/about/page.tsx directly, or tell me what you want to show and I'll update it for you.",
    ],
    contact: "Contact",
    contactBody: "GitHub: [Pecky-0](https://github.com/Pecky-0) · Email: TBU",
  },
  footer: {
    copyright: "© {year} Pecky · Built with Next.js, hosted on GitHub Pages"
  },
  notFound: {
    title: "404 - Page Not Found",
    description: "The page you are looking for doesn't exist or has been moved.",
    backHome: "← Back to Home",
  },
  langToggle: { label: "中", ariaLabel: "Switch to Chinese" },
};

export const dictionaries: Record<Language, Dictionary> = { zh, en };
