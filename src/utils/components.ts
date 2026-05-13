import { hrefFor, type FrameworkId } from "./framework-routing"

const pageModules = import.meta.glob("../pages/components/*.astro")
const docModules = import.meta.glob("../docs/components/*.astro")

const slugs = new Set<string>()

for (const path of Object.keys(pageModules)) {
  if (path.endsWith("index.astro")) continue
  // Skip dynamic route shells like [component].astro.
  if (path.includes("[")) continue
  const slug = path.split("/").pop()?.replace(".astro", "") || ""
  if (slug) slugs.add(slug)
}

for (const path of Object.keys(docModules)) {
  const slug = path.split("/").pop()?.replace(".astro", "") || ""
  if (slug) slugs.add(slug)
}

export const components = Array.from(slugs)
  .map((slug) => {
    const name = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return { name, slug, href: `/components/${slug}` }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

/**
 * Returns the URL for a component on a specific framework. Used by sidebar
 * and pagination links so the active framework is preserved during navigation.
 */
export function componentHrefFor(framework: FrameworkId, slug: string): string {
  return hrefFor(framework, `/components/${slug}`)
}
