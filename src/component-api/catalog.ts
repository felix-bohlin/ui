import type { ComponentApi } from "./types"

const COMPONENT_PAGES: Record<string, string> = {
  ButtonGroup: "control-group",
  FieldSet: "form",
  Link: "typography",
}

const STYLESHEET_PAGES: Record<string, string> = {
  "text-field": "field",
}

export const pageOfStylesheet = (stylesheet: string) =>
  STYLESHEET_PAGES[stylesheet] ?? stylesheet

export const kebab = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()

export const stylesheetsOf = (api: Pick<ComponentApi, "css" | "source">) =>
  api.css ?? (api.source ? [kebab(api.source)] : [])

const unique = (items: string[]) => [...new Set(items)].toSorted()

export const catalogOf = (
  entries: (readonly [folder: string, api: ComponentApi])[],
  slugs: string[],
) => {
  const apis = entries
    .map(([folder, api]) => ({ api, folder, page: api.page ?? folder }))
    .toSorted((a, b) => (a.folder < b.folder ? -1 : 1))

  const apisOf = (page: string) => apis.filter((entry) => entry.page === page)

  const sourcesOf = (page: string) =>
    unique(apisOf(page).flatMap(({ api }) => api.source ?? []))

  const pageStylesheets = (page: string) =>
    unique(apisOf(page).flatMap(({ api }) => stylesheetsOf(api)))

  const pageOfComponent = (component: string) => {
    const entry = apis.find(({ api }) => api.component === component)
    if (entry) return entry.page
    if (COMPONENT_PAGES[component]) return COMPONENT_PAGES[component]
    const words = kebab(component).split("-")
    return words
      .map((_, index) => words.slice(0, words.length - index).join("-"))
      .find((slug) => slugs.includes(slug))
  }

  const filesOf = (page: string) => {
    const own = apisOf(page)
    const owners = [page, ...sourcesOf(page).map(kebab)]
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
            ({ tag }) =>
              `packages/opui/elements/${tag.replace(/^opui-/, "")}.js`,
          ),
        ),
      ]),
      ...files(
        "css",
        pageStylesheets(page)
          .filter(
            (stylesheet) =>
              owners.includes(stylesheet) ||
              owners.includes(pageOfStylesheet(stylesheet)),
          )
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
    filesOf,
    pageOfComponent,
    sourcesOf,
    stylesheetsOf: pageStylesheets,
  }
}
