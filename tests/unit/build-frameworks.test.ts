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
import { parse } from "vue/compiler-sfc"
import {
  isAugmentation,
  reachable,
  rewriteSpecifiers,
  serverVue,
  sourceOf,
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

test("sourceOf finds the file the build writes a dist target from", () => {
  const source = (target: string) => {
    const file = sourceOf(packageDir, target)
    return file && path.relative(packageDir, file)
  }
  expect(source("./dist/react/index.js")).toBe("react/index.ts")
  expect(source("./dist/vue/index.d.ts")).toBe("vue/index.ts")
  expect(source("./dist/components/Button/Button.react.js")).toBe(
    "components/Button/Button.react.tsx",
  )
  expect(source("./dist/components/Button/Button.svelte")).toBe(
    "components/Button/Button.svelte",
  )
  expect(source("./dist/components/Button/Button.svelte.d.ts")).toBe(
    "components/Button/Button.svelte",
  )
  expect(source("./dist/components/Button/Button.vue.js")).toBe(
    "components/Button/Button.vue",
  )
  expect(source("./dist/react/missing.js")).toBeUndefined()
  expect(source("./dist/opui.css")).toBeUndefined()
  expect(source("./react/index.ts")).toBeUndefined()
})

test("the server build of a Vue component carries both render functions, so a server render passes the app's slots its push function and a client mount still renders", () => {
  const file = path.join(packageDir, "components/Sample/Sample.vue")
  const { descriptor } = parse(
    '<script setup lang="ts">\nimport { computed } from "vue"\nconst { label } = defineProps<{ label?: string }>()\nconst text = computed(() => label ?? "Sample")\n</script>\n\n<template>\n  <div class="ui-sample" :title="text">\n    <slot></slot>\n  </div>\n</template>\n',
    { filename: file },
  )
  const { render, server, ssr } = serverVue(descriptor, file, "Sample", {
    fileExists: () => false,
    readFile: () => undefined,
  })
  expect(server.code).toMatch(
    /import \{ render \} from "\.\/Sample\.vue\.render\.js"\nimport \{ ssrRender \} from "\.\/Sample\.vue\.ssr\.js"\n_sfc_main\.render = render\n_sfc_main\.ssrRender = ssrRender\nexport default _sfc_main$/,
  )
  expect(render.code).toContain("export function render(")
  expect(ssr.code).toContain("export function ssrRender(")
  expect(ssr.code).toContain("_ssrRenderSlot(")
  for (const part of [render, server, ssr]) {
    expect(
      part.map?.sources.map((source: string) => path.basename(source)),
    ).toEqual(["Sample.vue"])
  }
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
      "dist/components/Toaster/Toaster.svelte.d.ts",
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

  test("points a declaration file at the declaration of a .svelte file, which nodenext only finds by its .js name", () => {
    expect(
      rewriteSpecifiers(
        [
          'export { default as Toaster } from "../components/Toaster/Toaster.svelte"',
          'export type { Props } from "../components/Toaster/types"',
        ].join("\n"),
        path.join(dist, "svelte/index.d.ts"),
        root,
        dist,
      ),
    ).toBe(
      [
        'export { default as Toaster } from "../components/Toaster/Toaster.svelte.js"',
        'export type { Props } from "../components/Toaster/types.js"',
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
