import { getAllPosts } from "@/lib/posts";
import BlogListClient from "./BlogListClient";

export const metadata = {
  title: "博客",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogListClient posts={posts} />;
}
