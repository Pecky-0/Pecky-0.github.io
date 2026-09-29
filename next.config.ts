import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** 静态导出：构建产物输出到 out/，直接部署到 GitHub Pages */
  output: "export",
  /** 关键：GitHub Pages 不做 .html 重写，trailingSlash 让每页输出为 目录/index.html，子页面直接刷新不 404 */
  trailingSlash: true,
  /** 默认图片优化需要 Node 服务器，静态导出必须关闭 */
  images: { unoptimized: true },
};

export default nextConfig;
