import { existsSync } from "node:fs"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { getContainerRenderer } from "@astrojs/vue/container-renderer"
import { loadRenderers } from "astro:container"
import { createTwoFilesPatch } from "diff"
import { createSSRApp } from "vue"
import { renderToString } from "vue/server-renderer"
import { beforeAll, describe, expect, test } from "vitest"
import solidRenderer from "../../integrations/solid/server.js"
import { normalize } from "./normalize"

const RECORD = !!process.env.PARITY_RECORD

const astroModules = import.meta.glob<{ default: any }>(
  "../../src/component-examples/**/*.astro",
)
const solidModules = import.meta.glob<{ default: any }>(
  "../../src/component-examples/**/*.tsx",
)
const vueModules = import.meta.glob<{ default: any }>(
  "../../src/component-examples/**/*.vue",
)
const exampleSources = import.meta.glob<string>(
  "../../src/component-examples/**/*.{astro,html,tsx,vue}",
  { eager: true, import: "default", query: "?raw" },
)
const htmlSources = import.meta.glob<string>(
  "../../src/component-examples/**/*.html",
  { import: "default", query: "?raw" },
)

const EXAMPLE_CLASSES = new Set([
  "code",
  "copy",
  "ec-line",
  "expressive-code",
  "frame",
  "header",
  "indent",
  ...Object.values(exampleSources).flatMap((source) =>
    [...source.matchAll(/\bclass="([^"{]+)"/g)].flatMap((match) =>
      match[1].split(/\s+/),
    ),
  ),
])

const FRAMEWORKS = ["html", "astro", "solid", "vue"] as const

type Framework = (typeof FRAMEWORKS)[number]

const REFERENCES: Record<Framework, Framework[]> = {
  astro: ["html"],
  html: [],
  solid: ["astro", "html"],
  vue: ["astro", "html"],
}

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
register("solid", solidModules)
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
        componentSlug: key.split("/")[0],
        link: (path: string) => path,
      },
    }),
  html: async (loaded) => loaded,
  solid: async (loaded) =>
    solidRenderer.renderToStaticMarkup(
      loaded.default,
      {},
      { default: undefined },
    ).html,
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

describe.each(cases)("$key", (example) => {
  const frameworks = FRAMEWORKS.filter(
    (framework) => example.loaders[framework],
  )

  test(`${frameworks[0]} matches snapshot`, async () => {
    await expect(await markup(example, frameworks[0])).toMatchFileSnapshot(
      `__snapshots__/${example.key}.html`,
    )
  })

  test.each(frameworks.filter((framework) => framework !== "html"))(
    "%s only adds ui- prefixed classes",
    async (framework) => {
      const classes = [
        ...(await markup(example, framework)).matchAll(/ class="([^"]*)"/g),
      ].flatMap((match) => match[1].split(" "))
      const unprefixed = [...new Set(classes)].filter(
        (name) => !name.startsWith("ui-") && !EXAMPLE_CLASSES.has(name),
      )
      expect(unprefixed).toEqual([])
    },
  )

  test.each(
    frameworks.flatMap((framework) => {
      const reference = REFERENCES[framework].find(
        (candidate) => example.loaders[candidate],
      )
      return reference ? [[framework, reference]] : []
    }),
  )("%s matches %s", async (framework, reference) => {
    const [expected, actual] = await Promise.all([
      markup(example, reference),
      markup(example, framework),
    ])
    const driftFile = `__snapshots__/${example.key}.${framework}.diff`
    const recorded = existsSync(new URL(driftFile, import.meta.url))

    if (actual === expected) {
      expect(
        recorded,
        `${driftFile} records drift that no longer exists; delete it`,
      ).toBe(false)
      return
    }
    if (!recorded && !RECORD) {
      expect(actual, `${framework} differs from ${reference}`).toBe(expected)
    }
    await expect(
      createTwoFilesPatch(reference, framework, expected, actual, "", "", {
        context: 2,
      }),
    ).toMatchFileSnapshot(driftFile)
  })
})
