import { componentHasFramework, hrefFor, type FrameworkId } from "./framework"
import { componentName } from "./names"

const docSources = import.meta.glob<string>("../docs/components/*.astro", {
  eager: true,
  import: "default",
  query: "?raw",
})

const slugs = new Set<string>()

for (const path of Object.keys(docSources)) {
  const slug = path.split("/").pop()?.replace(".astro", "") || ""
  if (slug) slugs.add(slug)
}

export const components = Array.from(slugs)
  .map((slug) => ({
    name: componentName(slug),
    slug,
    href: `/components/${slug}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

const dependenciesOf = (slug: string) =>
  [
    ...docSources[`../docs/components/${slug}.astro`].matchAll(
      /\{[^{}]*\bisDependency: true[^{}]*\}/g,
    ),
  ].flatMap(([tab]) => tab.match(/title: "([\w-]+)\.css"/)?.[1] ?? [])

export const dependentsOf = (slug: string) =>
  components.filter((component) =>
    dependenciesOf(component.slug).includes(slug),
  )

export function componentsFor(framework: FrameworkId) {
  return components.filter((component) =>
    componentHasFramework(framework, component.slug),
  )
}

/**
 * Returns the URL for a component on a specific framework. Used by sidebar
 * and pagination links so the active framework is preserved during navigation.
 */
export function componentHrefFor(framework: FrameworkId, slug: string): string {
  return hrefFor(framework, `/components/${slug}`)
}
