"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Dictionary, type Language } from "./dictionaries";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * 语言 Context Provider。
 * - 首次打开：按浏览器语言判断（zh* → 中文，否则英文）
 * - localStorage("lang") 持久化用户偏好
 * - 切换即时生效，全站界面文案同步更新
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("zh");

  // 首次挂载：读 localStorage 偏好，否则按浏览器语言
  useEffect(() => {
    const saved = window.localStorage.getItem("lang");
    if (saved === "zh" || saved === "en") {
      setLangState(saved);
    } else if (!navigator.language.toLowerCase().startsWith("zh")) {
      setLangState("en");
    }
  }, []);

  // 语言变化时持久化 + 同步 <html lang>
  useEffect(() => document.documentElement.setAttribute("lang", lang), [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
    window.localStorage.setItem("lang", next);
  };

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: dictionaries[lang],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** 组件内一行取语言与文案：const { t, lang, setLang } = useLanguage(); */
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage 必须在 <LanguageProvider> 内使用");
  }
  return ctx;
}
