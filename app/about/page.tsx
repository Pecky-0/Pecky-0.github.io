import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "关于",
};

export default function AboutPage() {
  return <AboutClient />;
}
