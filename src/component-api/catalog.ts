import { detectedFeatureIds, withExceptions } from "./browser-features.mjs"
import type { ComponentApi, DocsPage } from "./types"

const COMPONENT_PAGES: Record<string, string> = {
  ButtonGroup: "control-group",
  FieldSet: "form",
  Link: "typography",
}

export const kebab = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

export const stylesheetsOf = (api: Pick<ComponentApi, "css" | "source">) =>
  api.css ?? (api.source ? [kebab(api.source)] : [])

const unique = (items: string[]) => [...new Set(items)].toSorted()

const sentence = (slug: string) => {
  const words = slug.replaceAll("-", " ")
  return words.charAt(0).toUpperCase() + words.slice(1)
}

const scriptOf = (tag: string) => tag.replace(/^opui-/, "")

export const catalogOf = ({
  apis: entries,
  exports,
  pages,
  sources,
}: {
  apis: (readonly [folder: string, api: ComponentApi])[]
  exports: Record<string, string[]>
  pages: Record<string, DocsPage>
  sources: {
    examples: (page: string) => string[]
    stylesheet: (name: string) => string | undefined
  }
}) => {
  const slugs = Object.keys(pages).toSorted()

  const apis = entries
    .map(([folder, api]) => ({ api, folder, page: api.page ?? folder }))
    .toSorted((a, b) => (a.folder < b.folder ? -1 : 1))

  const apisOf = (page: string) => apis.filter((entry) => entry.page === page)

  const sourcesOf = (page: string) =>
    unique(apisOf(page).flatMap(({ api }) => api.source ?? []))

  const pageStylesheets = (page: string) =>
    unique(apisOf(page).flatMap(({ api }) => stylesheetsOf(api)))

  const nameOf = (slug: string) => pages[slug]?.title ?? sentence(slug)

  const byName = (a: string, b: string) => nameOf(a).localeCompare(nameOf(b))

  const pageOfComponent = (component: string) => {
    const entry = apis.find(({ api }) => api.component === component)
    if (entry) return entry.page
    if (COMPONENT_PAGES[component]) return COMPONENT_PAGES[component]
    const words = kebab(component).split("-")
    return words
      .map((_, index) => words.slice(0, words.length - index).join("-"))
      .find((slug) => slugs.includes(slug))
  }

  const ownersOf = (page: string) => [page, ...sourcesOf(page).map(kebab)]

  const ownerOf = (stylesheet: string) =>
    slugs.find((page) => page === stylesheet) ??
    slugs.find((page) => ownersOf(page).includes(stylesheet))

  const shownApisOf = (page: string) => {
    const listed = (pages[page]?.apis ?? []).flatMap(
      (folder) => apis.find((entry) => entry.folder === folder) ?? [],
    )
    return [
      ...listed,
      ...apisOf(page).filter((entry) => !listed.includes(entry)),
    ].map((entry) => ({
      ...entry,
      title: `${nameOf(kebab(entry.api.component))} API`,
    }))
  }

  const usedApisOf = (page: string) =>
    (pages[page]?.uses ?? []).flatMap(
      (folder) => apis.find((entry) => entry.folder === folder) ?? [],
    )

  const isDependency = (page: string, stylesheet: string) => {
    const owner = ownerOf(stylesheet)
    return owner !== undefined && owner !== page
  }

  const installed = new Map<string, ReturnType<typeof installFilesOf>>()

  const installOf = (page: string) => {
    if (!installed.has(page)) installed.set(page, installFilesOf(page))
    return installed.get(page) ?? []
  }

  const installFilesOf = (page: string) => {
    if (!pages[page]) return []
    const shown = shownApisOf(page)
    const stylesheets = unique(shown.flatMap(({ api }) => stylesheetsOf(api)))
    const main = kebab(shown[0]?.api.component ?? "")
    const own = stylesheets
      .filter((stylesheet) => !isDependency(page, stylesheet))
      .toSorted((a, b) => Number(b === main) - Number(a === main))
    const scripts = unique(
      [...apisOf(page), ...usedApisOf(page)].flatMap(({ api }) =>
        (api.elements ?? []).map(({ tag }) => scriptOf(tag)),
      ),
    )
    const css = (name: string) => ({
      dependency: isDependency(page, name),
      file: `${name}.css`,
      name,
      type: "css" as const,
    })
    const js = (name: string) => ({
      dependency: false,
      file: `${name}.js`,
      name,
      type: "js" as const,
    })
    return [
      ...own.flatMap((name) => [
        css(name),
        ...scripts.filter((script) => script === name).map(js),
      ]),
      ...scripts.filter((script) => !own.includes(script)).map(js),
      ...stylesheets
        .filter((stylesheet) => isDependency(page, stylesheet))
        .map(css),
    ]
  }

  const dependenciesOf = (page: string) =>
    [
      ...new Set(
        installOf(page)
          .filter(({ dependency }) => dependency)
          .flatMap(({ name }) => ownerOf(name) ?? []),
      ),
    ].toSorted(byName)

  const dependentsOf = (page: string) =>
    slugs.filter((slug) => dependenciesOf(slug).includes(page)).toSorted(byName)

  const families = unique(slugs.flatMap((slug) => pages[slug].base ?? []))

  const familyOf = (slug: string) =>
    pages[slug]?.base ?? (families.includes(slug) ? slug : undefined)

  const importsOf = (page: string, framework: string) => {
    const exported = new Set(
      exports[framework === "nunjucks" ? "astro" : framework] ?? [],
    )
    const base = pages[page]?.base
    return unique([
      ...(base
        ? apisOf(base)
            .filter(({ folder }) => folder === base)
            .map(({ api }) => api.component)
        : []),
      ...usedApisOf(page).map(({ api }) => api.component),
      ...apisOf(page).flatMap(({ api }) => [
        api.component,
        ...api.parts.flatMap((part) =>
          part.component && pageOfComponent(part.component) === page
            ? [part.component]
            : [],
        ),
      ]),
    ]).filter((name) => exported.has(name))
  }

  const detected = new Map<string, string[]>()

  const detectedFeaturesOf = (page: string) => {
    if (!detected.has(page)) {
      detected.set(
        page,
        detectedFeatureIds({
          classes: [
            ...new Set(
              apisOf(page).flatMap(({ api }) =>
                [...JSON.stringify(api).matchAll(/\.ui-[a-z0-9-]+/g)].map(
                  ([name]) => name,
                ),
              ),
            ),
          ],
          examples: sources.examples(page),
          stylesheets: pageStylesheets(page).flatMap((name) => {
            const source = sources.stylesheet(name)
            return source === undefined ? [] : [{ file: `${name}.css`, source }]
          }),
        }),
      )
    }
    return detected.get(page) ?? []
  }

  const featuresOf = (page: string): string[] =>
    withExceptions(detectedFeaturesOf(page), pages[page]?.features)

  const filesOf = (page: string) => {
    const own = apisOf(page)
    const owners = ownersOf(page)
    const files = (
      type: "api" | "component" | "css" | "docs",
      list: string[],
    ) => unique(list).map((path) => ({ path, type }))
    return [
      ...files(
        "api",
        own.map(({ folder }) => `src/component-api/${folder}`),
      ),
      ...files("component", [
        ...sourcesOf(page).map(
          (source) => `packages/opui/components/${source}`,
        ),
        ...own.flatMap(({ api }) =>
          (api.elements ?? []).map(
            ({ tag }) => `packages/opui/elements/${scriptOf(tag)}.js`,
          ),
        ),
      ]),
      ...files(
        "css",
        pageStylesheets(page)
          .filter((stylesheet) => owners.includes(stylesheet))
          .map(
            (stylesheet) => `packages/opui/css/components/${stylesheet}.css`,
          ),
      ),
      ...files("docs", [
        `src/component-examples/${page}`,
        `src/docs/components/${page}.astro`,
      ]),
    ]
  }

  return {
    apis,
    apisOf,
    baseOf: (slug: string) => pages[slug]?.base,
    dependenciesOf,
    dependentsOf,
    detectedFeaturesOf,
    examplesOf: (slug: string) => pages[slug]?.examples ?? ["Basics"],
    exceptionsOf: (slug: string) => pages[slug]?.features ?? {},
    fallbacksOf: (slug: string) => pages[slug]?.fallbacks ?? {},
    families,
    familyOf,
    featuresOf,
    filesOf,
    importsOf,
    installOf,
    nameOf,
    ownerOf,
    pageOfComponent,
    pages: slugs,
    shownApisOf,
    sourcesOf,
    stylesheetsOf: pageStylesheets,
  }
}
