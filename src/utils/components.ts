import { catalog } from "../component-api/catalog.glob"
import { hrefFor, type FrameworkId } from "./framework"

const docSources = import.meta.glob<string>("../docs/components/*.astro", {
  eager: true,
  import: "default",
  query: "?raw",
})

export const componentName = catalog.nameOf

export const components = catalog.pages
  .map((slug) => ({
    name: componentName(slug),
    slug,
    href: `/components/${slug}`,
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

export const componentsWithSlot = (slot: string) =>
  components.filter(({ slug }) =>
    docSources[`../docs/components/${slug}.astro`]?.includes(`slot="${slot}"`),
  )

const FOUNDATIONS = ["layout", "typography"]

const isFoundation = (slug: string) => FOUNDATIONS.includes(slug)

export function componentGroupsFor() {
  const all = components
  return [
    {
      label: "Components",
      components: all.filter(
        (component) =>
          !isFoundation(component.slug) && !catalog.familyOf(component.slug),
      ),
    },
    ...catalog.families.map((base) => ({
      label: `${componentName(base)}s`,
      components: all
        .filter((component) => catalog.familyOf(component.slug) === base)
        .toSorted((a, b) => Number(b.slug === base) - Number(a.slug === base)),
    })),
    {
      label: "Foundations",
      components: all.filter((component) => isFoundation(component.slug)),
    },
  ].filter((group) => group.components.length > 0)
}

/**
 * Returns the URL for a component on a specific framework. Used by sidebar
 * and pagination links so the active framework is preserved during navigation.
 */
export function componentHrefFor(framework: FrameworkId, slug: string): string {
  return hrefFor(framework, `/components/${slug}`)
}
