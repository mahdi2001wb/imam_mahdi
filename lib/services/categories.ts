import type { CategoryId } from "./types";

/** Display order of categories. Names/descriptions: messages → services.categories.<id> */
export const categories: { id: CategoryId; gradient: string }[] = [
  { id: "website", gradient: "from-darkBlue to-[#2a2f9e]" },
  { id: "ecommerce", gradient: "from-darkOrange to-[#b8300c]" },
  { id: "wordpress", gradient: "from-[#21759b] to-[#0e3a4f]" },
  { id: "marketing", gradient: "from-[#e0457b] to-[#7a1d42]" },
  { id: "graphics", gradient: "from-[#8a4df0] to-[#41208f]" },
  { id: "maintenance", gradient: "from-[#0f9d7a] to-[#065a46]" },
];

export const categoryIds = categories.map((c) => c.id);
export const isCategoryId = (v: string | null | undefined): v is CategoryId =>
  !!v && categoryIds.includes(v as CategoryId);
