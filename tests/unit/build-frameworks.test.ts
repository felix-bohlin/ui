import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import {
  isAugmentation,
  reachable,
  rewriteSpecifiers,
  specifiersOf,
} from "../../packages/opui/scripts/build-frameworks.mjs"

const packageDir = path.resolve(import.meta.dirname, "../../packages/opui")

test("specifiersOf finds every relative import, export and dynamic import", () => {
  expect(
    specifiersOf(
      [
        'import { cx } from "../cx"',
        'import type { Props } from "./types"',
        'import "../../elements/toaster.js"',
        'export { default as Button } from "../components/Button/Button.react"',
        'void import("../../elements/copy.js")',
        'import { useId } from "react"',
        'import Dialog from "/absolute/Dialog.vue"',
      ].join("\n"),
    ),
  ).toEqual([
    "../cx",
    "./types",
    "../../elements/toaster.js",
    "../components/Button/Button.react",
    "../../elements/copy.js",
  ])
})

test("reachable follows a barrel to its own framework's files only", () => {
  const files = reachable([path.join(packageDir, "react/index.ts")]).map(
    (file) => path.relative(packageDir, file),
  )
  expect(files).toContain("components/Button/Button.react.tsx")
  expect(files).toContain("components/cx.ts")
  expect(files).toContain("elements/toaster.js")
  expect(files.filter((file) => /\.(astro|svelte|vue)$/.test(file))).toEqual([])
})

test("isAugmentation tells the element type files from the components", () => {
  const read = (file: string) =>
    readFileSync(path.join(packageDir, file), "utf8")
  expect(isAugmentation(read("react/elements.ts"))).toBe(true)
  expect(isAugmentation(read("svelte/elements.ts"))).toBe(true)
  expect(isAugmentation(read("components/Button/Button.react.tsx"))).toBe(false)
})

describe("rewriteSpecifiers", () => {
  let root: string
  let dist: string
  let from: string

  beforeAll(() => {
    root = mkdtempSync(path.join(tmpdir(), "opui-build-frameworks-"))
    dist = path.join(root, "dist")
    from = path.join(dist, "components/Toaster/Toaster.react.js")
    for (const file of [
      "dist/components/cx.js",
      "dist/components/Toaster/Toaster.svelte",
      "dist/components/Toaster/Toaster.vue.js",
      "dist/components/Toaster/types.d.ts",
      "elements/toaster.js",
    ]) {
      mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
      writeFileSync(path.join(root, file), "")
    }
  })

  afterAll(() => rmSync(root, { force: true, recursive: true }))

  test("adds the extension a compiled file has in dist", () => {
    expect(
      rewriteSpecifiers(
        [
          'import { cx } from "../cx"',
          'import type { Props } from "./types"',
          'export { default } from "./Toaster.vue"',
          'import Toaster from "./Toaster.svelte"',
        ].join("\n"),
        from,
        root,
        dist,
      ),
    ).toBe(
      [
        'import { cx } from "../cx.js"',
        'import type { Props } from "./types.js"',
        'export { default } from "./Toaster.vue.js"',
        'import Toaster from "./Toaster.svelte"',
      ].join("\n"),
    )
  })

  test("points a file that stays out of dist at the package's own copy", () => {
    expect(
      rewriteSpecifiers(
        'void import("../../elements/toaster.js")',
        from,
        root,
        dist,
      ),
    ).toBe('void import("../../../elements/toaster.js")')
  })

  test("fails on an import that resolves nowhere", () => {
    expect(() =>
      rewriteSpecifiers('import "./missing"', from, root, dist),
    ).toThrow("imports ./missing, which doesn't exist")
  })
})
