import { getAllPosts } from "@/lib/posts";
import HomePageClient from "./HomePageClient";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <HomePageClient latestPosts={latestPosts} />
  );
}
