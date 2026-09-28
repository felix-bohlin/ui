import { writeFileSync } from "node:fs"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { getContainerRenderer } from "@astrojs/vue/container-renderer"
import { loadRenderers } from "astro:container"
import { createSSRApp } from "vue"
import { renderToString } from "vue/server-renderer"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { normalize } from "./normalize"
import knownDrift from "./parity-known-drift.json"

const KNOWN_DRIFT_FILE = new URL("./parity-known-drift.json", import.meta.url)
const RECORD = !!process.env.PARITY_RECORD

const astroModules = import.meta.glob<{ default: any }>(
  "../../src/component-examples/**/*.astro",
)
const vueModules = import.meta.glob<{ default: any }>(
  "../../src/component-examples/**/*.vue",
)
const componentSources = import.meta.glob<string>(
  "../../src/component-examples/**/*.{astro,vue}",
  { eager: true, import: "default", query: "?raw" },
)
const htmlSources = import.meta.glob<string>(
  "../../src/component-examples/**/*.html",
  { import: "default", query: "?raw" },
)

const allComponentSources = Object.values(componentSources).join("\n")

const EXTERNAL_CLASSES = new Set(["ec-line", "frame", "indent"])

type Framework = "astro" | "html" | "vue"

type Example = {
  key: string
  loaders: Partial<Record<Framework, () => Promise<unknown>>>
}

const keyOf = (path: string) =>
  path.replace("../../src/component-examples/", "").replace(/\.[a-z]+$/, "")

const examples = new Map<string, Example>()
const register = (
  framework: Framework,
  modules: Record<string, () => Promise<unknown>>,
) => {
  for (const [path, load] of Object.entries(modules)) {
    const key = keyOf(path)
    if (!examples.has(key)) examples.set(key, { key, loaders: {} })
    examples.get(key)!.loaders[framework] = load
  }
}
register("astro", astroModules)
register("html", htmlSources)
register("vue", vueModules)

const cases = [...examples.values()]
  .filter(({ key }) => !key.endsWith("Code"))
  .toSorted((a, b) => a.key.localeCompare(b.key))

const createIdGenerator = () => {
  const counts = new Map<string, number>()
  return (prefix: string) => {
    const count = (counts.get(prefix) ?? 0) + 1
    counts.set(prefix, count)
    return `${prefix}-${count}`
  }
}

let container: AstroContainer

beforeAll(async () => {
  const renderers = await loadRenderers([getContainerRenderer()])
  container = await AstroContainer.create({ renderers })
})

const renderers: Record<
  Framework,
  (loaded: any, key: string) => Promise<string>
> = {
  astro: (loaded, key) =>
    container.renderToString(loaded.default, {
      locals: {
        $id: createIdGenerator(),
        _isInsideForm: false,
        componentSlug: key.split("/")[0],
        link: (path: string) => path,
      },
    }),
  html: async (loaded) => loaded,
  vue: (loaded) => renderToString(createSSRApp(loaded.default)),
}

const cache = new Map<string, Promise<string>>()
const markup = (example: Example, framework: Framework) => {
  const cacheKey = `${example.key}.${framework}`
  if (!cache.has(cacheKey)) {
    cache.set(
      cacheKey,
      example.loaders[framework]!()
        .then((loaded) => renderers[framework](loaded, example.key))
        .then(normalize),
    )
  }
  return cache.get(cacheKey)!
}

type Comparison = keyof typeof knownDrift

const recorded: Record<Comparison, string[]> = {
  "astro-vue": [],
  html: [],
}

const compare = (
  comparison: Comparison,
  example: Example,
  pairs: [Framework, Framework][],
) => {
  const known = knownDrift[comparison].includes(example.key)
  const title = pairs.map(([a, b]) => `${a} = ${b}`).join(", ")
  const run = RECORD || !known ? test : test.fails

  run(title, async () => {
    for (const [a, b] of pairs) {
      const [left, right] = await Promise.all([
        markup(example, a),
        markup(example, b),
      ])
      if (RECORD) {
        if (left !== right) recorded[comparison].push(example.key)
        if (left !== right) break
        continue
      }
      expect(right, `${b} differs from ${a}`).toBe(left)
    }
  })
}

describe.each(cases)("$key", (example) => {
  const frameworks = (["astro", "html", "vue"] as const).filter(
    (framework) => example.loaders[framework],
  )

  test.each(frameworks)("%s matches snapshot", async (framework) => {
    await expect(await markup(example, framework)).toMatchFileSnapshot(
      `__snapshots__/${example.key}.${framework}.html`,
    )
  })

  test.each(frameworks.filter((framework) => framework !== "html"))(
    "%s only adds ui- prefixed classes",
    async (framework) => {
      const classes = [
        ...(await markup(example, framework)).matchAll(/ class="([^"]*)"/g),
      ].flatMap((match) => match[1].split(" "))
      const unprefixed = [...new Set(classes)].filter(
        (name) =>
          !name.startsWith("ui-") &&
          !EXTERNAL_CLASSES.has(name) &&
          !allComponentSources.includes(name),
      )
      expect(unprefixed).toEqual([])
    },
  )

  if (example.loaders.astro && example.loaders.vue) {
    compare("astro-vue", example, [["astro", "vue"]])
  }

  const components = frameworks.filter((framework) => framework !== "html")
  if (example.loaders.html && components.length > 0) {
    compare(
      "html",
      example,
      components.map((framework) => ["html", framework]),
    )
  }
})

afterAll(() => {
  if (!RECORD) return
  const sorted = Object.fromEntries(
    Object.entries(recorded).map(([comparison, keys]) => [
      comparison,
      [...new Set(keys)].toSorted(),
    ]),
  )
  writeFileSync(KNOWN_DRIFT_FILE, JSON.stringify(sorted, null, 2) + "\n")
})
