import type { ComponentApi } from "../../src/component-api/types"
import { partCasesOf as partCasesAmong } from "./case-table"

export * from "./case-table"

export const apis = import.meta.glob<ComponentApi>(
  "../../src/component-api/*/api.ts",
  { eager: true, import: "default" },
)

export const partCasesOf = (api: ComponentApi) =>
  partCasesAmong(api, Object.values(apis))
