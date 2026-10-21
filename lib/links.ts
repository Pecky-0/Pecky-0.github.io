import data from "@/public/content/links.json";
import { dictionaries } from "@/lib/i18n/dictionaries";

export interface LinkItem {
  /** Stable dictionary key; display text follows the selected language. */
  id: string;
  url: string;
  category: "research" | "hobby" | "social";
  icon?: string;
  color?: string;
}

export const links: LinkItem[] = data.map((item, index) => {
  const { category } = item;
  if (category !== "research" && category !== "hobby" && category !== "social") {
    throw new Error(`public/content/links.json: invalid category for ${item.id}`);
  }
  if (data.findIndex((link) => link.id === item.id) !== index) {
    throw new Error(`public/content/links.json: duplicate id ${item.id}`);
  }
  for (const [lang, dictionary] of Object.entries(dictionaries)) {
    if (!Object.hasOwn(dictionary.linkItems, item.id)) {
      throw new Error(`public/content/${lang}.json: missing linkItems.${item.id}`);
    }
  }
  return { ...item, category };
});
