import type { Metadata } from "next";
import { getAllPosts, getAdjacentPosts, getPostBySlug } from "@/lib/posts";
import PostDetailClient from "./PostDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const adjacent = getAdjacentPosts(slug);

  return <PostDetailClient post={post} newer={adjacent.newer} older={adjacent.older} />;
}
