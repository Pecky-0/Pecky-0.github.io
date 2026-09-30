import type { ReactNode } from "react";

/**
 * 把 "[text](url)" 语法渲染成内联链接（About 段落和 News 正文用）。
 * 避免为此引入 markdown 渲染器。
 */
export function renderInline(text: string): ReactNode[] {
  const parts = text.split(/\[([^\]]+)\]\(([^)\s]+)\)/g);
  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i]);
    if (parts[i + 1] && parts[i + 2]) {
      const [, label, href] = parts as unknown as [string, string, string];
      const external = href.startsWith("http");
      nodes.push(
        <a
          key={`${label}-${href}-${i}`}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500 dark:text-white dark:decoration-neutral-600 dark:hover:decoration-neutral-400"
        >
          {label}
        </a>
      );
    }
  }
  return nodes;
}
