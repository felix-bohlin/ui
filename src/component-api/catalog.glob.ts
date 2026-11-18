import { catalogOf } from "./catalog"
import type { ComponentApi } from "./types"

const apis = import.meta.glob<ComponentApi>("./*/api.ts", {
  eager: true,
  import: "default",
})

const pages = import.meta.glob("../docs/components/*.astro")

export const catalog = catalogOf(
  Object.entries(apis).map(([file, api]) => [file.split("/")[1], api] as const),
  Object.keys(pages).map((file) =>
    file.split("/").at(-1)!.replace(".astro", ""),
  ),
)
