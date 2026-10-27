// @ts-check
/** @typedef {"API" | "Blocks" | "Blog" | "Component" | "Guide"} SearchCategoryId */

/** @type {{ category?: SearchCategoryId, href: string, label: string, section: string }[]} */
export const navItems = [
  {
    category: "Guide",
    href: "/guide/getting-started",
    label: "Guide",
    section: "/guide",
  },
  {
    category: "Component",
    href: "/components",
    label: "Components",
    section: "/components",
  },
  { category: "Blocks", href: "/blocks", label: "Blocks", section: "/blocks" },
  { href: "/theme-builder", label: "Themes", section: "/theme-builder" },
  { category: "Blog", href: "/blog", label: "Blog", section: "/blog" },
  { category: "API", href: "/api", label: "API", section: "/api" },
]
