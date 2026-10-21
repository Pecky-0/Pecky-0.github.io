import zhContent from "@/public/content/zh.json";
import enContent from "@/public/content/en.json";

export type Language = "zh" | "en";

/** 界面文案结构。新增语言只需新增一个满足此类型的对象。 */
export interface Dictionary {
  nav: { home: string; blog: string; about: string; academic: string };
  hero: {
    note: string;
    description: string;
  };
  linkhub: { research: string; hobby: string; social: string };
  linkItems: Record<string, { name: string; desc: string }>;
  skills: { title: string; items: string[] };
  projects: {
    title: string;
    viewAll: string;
    items: { title: string; description: string; link: string }[];
  };
  blog: {
    displayTitle: string;
    typeLabels: Record<string, string>;
    title: string;
    empty: string;
    readMore: string;
    backToList: string;
    latestTitle: string;
    viewAll: string;
    announcements: string;
    announcementPagination: string;
    previousPage: string;
    nextPage: string;
    pageIndicator: string;
    newestFirst: string;
    publicationNotice: string;
    uncategorized: string;
  };
  about: {
    title: string;
    intro: string;
    body: string[];
    contact: string;
    contactBody: string;
  };
  footer: { copyright: string };
  music: {
    buffering: string;
    credit: string;
    toggleAria: string;
    playAria: string;
    pauseAria: string;
    selectAria: string;
    volumeAria: string;
  };
  notFound: { title: string; description: string; backHome: string };
  langToggle: { label: string; ariaLabel: string };
}

export const zh: Dictionary = zhContent;
export const en: Dictionary = enContent;
export const dictionaries: Record<Language, Dictionary> = { zh, en };
