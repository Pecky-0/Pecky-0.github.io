import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "posts");

/** 把 frontmatter 的 date（可能是 Date 对象或字符串）格式化为 YYYY-MM-DD */
function formatDate(value: unknown): string {
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return String(value ?? "");
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

export interface Post extends PostMeta {
  contentHtml: string;
}

/** 段落里只有一张图且 alt 非空时，转成 figure 并把 alt 作为图片下方的居中图注（论文样式） */
function withFigureCaptions(html: string): string {
  return html.replace(
    /<p><img([^>]*)><\/p>/g,
    (paragraph, attrs: string) => {
      const alt = /alt="([^"]*)"/.exec(attrs)?.[1];
      if (!alt?.trim()) return paragraph;
      return `<figure><img${attrs}><figcaption>${alt}</figcaption></figure>`;
    }
  );
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    notFound();
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);
  return {
    slug,
    title: String(data.title ?? slug),
    date: formatDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    contentHtml: withFigureCaptions(String(processedContent)),
  };
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const fileContents = fs.readFileSync(path.join(postsDirectory, `${slug}.md`), "utf8");
      const { data } = matter(fileContents);
      return {
        slug,
        title: String(data.title ?? slug),
        date: formatDate(data.date),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** 上一篇 / 下一篇（按日期排序后的相邻文章） */
export function getAdjacentPosts(slug: string): { newer: PostMeta | null; older: PostMeta | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
