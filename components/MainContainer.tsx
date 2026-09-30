"use client";

import { usePathname } from "next/navigation";

/** 需要宽布局（双栏）的页面前缀。注意 trailingSlash: true 下路径可能带尾斜杠，用前缀匹配 */
const WIDE_PREFIXES = ["/academic"];

export default function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const wide = WIDE_PREFIXES.some((p) => pathname.startsWith(p));
  return (
    <div className={`mx-auto px-4 py-10 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>{children}</div>
  );
}
