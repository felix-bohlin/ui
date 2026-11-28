import { barrelExports } from "../utils/package-source"
import { catalogOf } from "./catalog"
import { pages } from "./pages"
import type { ComponentApi } from "./types"

const apis = import.meta.glob<ComponentApi>("./*/api.ts", {
  eager: true,
  import: "default",
})

const barrels = import.meta.glob<string>(
  "../../packages/opui/{astro,react,solid,svelte,vue}/index.ts",
  { eager: true, import: "default", query: "?raw" },
)

const examples = import.meta.glob<string>("../component-examples/*/*.html", {
  eager: true,
  import: "default",
  query: "?raw",
})

const stylesheets = import.meta.glob<string>(
  "../../packages/opui/css/components/*.css",
  { eager: true, import: "default", query: "?raw" },
)

export const catalog = catalogOf({
  apis: Object.entries(apis).map(
    ([file, api]) => [file.split("/")[1], api] as const,
  ),
  exports: Object.fromEntries(
    Object.entries(barrels).map(([file, source]) => [
      file.split("/").at(-2)!,
      barrelExports(source).map(({ name }) => name),
    ]),
  ),
  pages,
  sources: {
    examples: (page) =>
      Object.keys(examples)
        .filter((file) => file.split("/").at(-2) === page)
        .toSorted()
        .map((file) => examples[file]),
    stylesheet: (name) =>
      stylesheets[`../../packages/opui/css/components/${name}.css`],
  },
})
