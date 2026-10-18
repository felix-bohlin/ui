import { describe, expect, test } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"
import { checkApi, checkExports } from "../../src/utils/component-source"

const apis = Object.values(
  import.meta.glob<ComponentApi>("../../src/component-api/*/api.ts", {
    eager: true,
    import: "default",
  }),
)

describe("component api", () => {
  test("api.ts matches the components", () => {
    expect(apis.flatMap(checkApi)).toEqual([])
  }, 120_000)

  test("every exported component is documented", () => {
    expect(checkExports(apis)).toEqual([])
  })
})
