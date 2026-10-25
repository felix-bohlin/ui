import { MIGRATING_LABEL } from "./migrating.ts"

export const guidePages = [
  { label: "Why Open Props UI?", slug: "why-opui" },
  { label: "Getting started", slug: "getting-started" },
  { label: "Concepts", slug: "concepts" },
  { label: "Theming", slug: "theming" },
  { label: "Customizing", slug: "customizing" },
  { label: "Theme tokens", slug: "theme-tokens" },
  { label: "Accessibility", slug: "accessibility" },
  { label: "Browser support", slug: "browser-support" },
  { label: MIGRATING_LABEL, slug: "migrating" },
  { label: "Acknowledgments", slug: "acknowledgments" },
]

export const guideSlugs = guidePages.map((page) => page.slug)

export const guideIndex = (slug: string) => {
  const index = guideSlugs.indexOf(slug)
  return index === -1 ? guideSlugs.length : index
}
