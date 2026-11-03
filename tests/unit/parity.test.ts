import { existsSync } from "node:fs"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import type { AstroInstance } from "astro"
import { createTwoFilesPatch } from "diff"
import { createElement, type ComponentType } from "react"
import { renderToString as renderReact } from "react-dom/server"
import type { Component as SvelteComponent } from "svelte"
import { render } from "svelte/server"
import { createSSRApp, type Component as VueComponent } from "vue"
import { renderToString } from "vue/server-renderer"
import { describe, expect, test, vi } from "vitest"
import { readExample } from "../../scripts/build-examples.mjs"
import { parseHtml, serialize } from "../../scripts/html-tokens.mjs"
import {
  DEFAULT_FRAMEWORK,
  exampleExtension,
  FRAMEWORK_IDS as FRAMEWORKS,
  type FrameworkId as Framework,
} from "../../src/utils/framework"
import { createIdGenerator, exampleIdBase } from "../../src/utils/id"
import { idsOf, normalize } from "./normalize"

const RECORD = !!process.env.PARITY_RECORD

const astroModules = import.meta.glob<AstroInstance>(
  "../../src/component-examples/**/*.astro",
)
const reactModules = import.meta.glob<{ default: ComponentType }>(
  "../../src/component-examples/**/*.react.tsx",
)
const svelteModules = import.meta.glob<{ default: SvelteComponent }>(
  "../../src/component-examples/**/*.svelte",
)
const vueModules = import.meta.glob<{ default: VueComponent }>(
  "../../src/component-examples/**/*.vue",
)
const exampleSources = import.meta.glob<string>(
  "../../src/component-examples/**/*.{astro,html,react.tsx,svelte,vue}",
  { eager: true, import: "default", query: "?raw" },
)
const htmlSources = import.meta.glob<string>(
  "../../src/component-examples/**/*.html",
  { import: "default", query: "?raw" },
)

const EXAMPLE_CLASSES = new Set(
  Object.values(exampleSources).flatMap((source) =>
    [...source.matchAll(/\b(?:class|className)="([^"{]+)"/g)].flatMap((match) =>
      match[1].split(/\s+/),
    ),
  ),
)

const KNOWN_DIFFERENCES: Record<string, string> = {
  "checkbox/Spread: react": "Step 8",
  "checkbox/Spread: svelte": "Step 8",
  "form/KitchenSink: react": "Step 8",
  "form/KitchenSink: svelte": "Step 8",
  "switch/Spread: react": "Step 8",
  "switch/Spread: svelte": "Step 8",
}

const REFERENCES: Record<Framework, Framework[]> = {
  astro: ["html"],
  html: [],
  react: ["astro", "html"],
  svelte: ["astro", "html"],
  vue: ["astro", "html"],
}

type Loaded = {
  astro: AstroInstance
  html: string
  react: { default: ComponentType }
  svelte: { default: SvelteComponent }
  vue: { default: VueComponent }
}

type Example = {
  key: string
  loaders: { [F in Framework]?: () => Promise<Loaded[F]> }
}

const keyOf = (path: string) =>
  path
    .replace("../../src/component-examples/", "")
    .replace(/(\.react)?\.[a-z]+$/, "")

const examples = new Map<string, Example>()
const register = <F extends Framework>(
  framework: F,
  modules: Record<string, Example["loaders"][F]>,
) => {
  for (const [path, load] of Object.entries(modules)) {
    const key = keyOf(path)
    if (!examples.has(key)) examples.set(key, { key, loaders: {} })
    examples.get(key)!.loaders[framework] = load
  }
}
register("astro", astroModules)
register("html", htmlSources)
register("react", reactModules)
register("svelte", svelteModules)
register("vue", vueModules)

const cases = [...examples.values()].toSorted((a, b) =>
  a.key.localeCompare(b.key),
)

const container = await AstroContainer.create()

const renderers: {
  [F in Framework]: (loaded: Loaded[F], key: string) => Promise<string>
} = {
  astro: (loaded, key) =>
    container.renderToString(loaded.default, {
      locals: {
        $id: createIdGenerator(),
        componentSlug: key.split("/")[0],
        framework: DEFAULT_FRAMEWORK,
        link: (path: string) => path,
      },
    }),
  html: async (loaded) => loaded,
  react: async (loaded, key) => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})
    try {
      const html = renderReact(createElement(loaded.default))
      if (spy.mock.calls.length > 0) {
        throw new Error(
          `${key} logged a React error: ${String(spy.mock.calls[0][0]).slice(0, 200)}`,
        )
      }
      return html.replace(/<link rel="preload" as="image"[^>]*\/>/g, "")
    } finally {
      spy.mockRestore()
    }
  },
  svelte: async (loaded) => render(loaded.default).body,
  vue: (loaded) => renderToString(createSSRApp(loaded.default)),
}

test("the React renderer fails on a console.error", async () => {
  const Controlled = () => createElement("input", { value: "x" })
  await expect(
    renderers.react({ default: Controlled }, "sample/Controlled"),
  ).rejects.toThrow("sample/Controlled logged a React error")
  expect(
    await renderers.react(
      { default: () => createElement("input", { defaultValue: "x" }) },
      "sample/Uncontrolled",
    ),
  ).toBe('<input value="x"/>')
})

const renderExample = <F extends Framework>(example: Example, framework: F) =>
  example.loaders[framework]!().then((loaded) =>
    renderers[framework](loaded, example.key),
  )

const renders = new Map<string, Promise<string>>()
const rendered = (example: Example, framework: Framework) => {
  const cacheKey = `${example.key}.${framework}`
  if (!renders.has(cacheKey)) {
    renders.set(cacheKey, renderExample(example, framework))
  }
  return renders.get(cacheKey)!
}

const styles = new Map<string, Promise<string[]>>()
const exampleCss = (example: Example) => {
  if (!styles.has(example.key)) {
    const source =
      exampleSources[`../../src/component-examples/${example.key}.astro`]
    styles.set(
      example.key,
      source
        ? readExample(source, `${example.key}.astro`).then(
            ({ styles }) => styles,
          )
        : Promise.resolve([]),
    )
  }
  return styles.get(example.key)!
}

const COMMENTED: Framework[] = ["astro", "html"]

const cache = new Map<string, Promise<string>>()
const markup = (
  example: Example,
  framework: Framework,
  comments = COMMENTED.includes(framework),
) => {
  const cacheKey = `${example.key}.${framework}.${comments}`
  if (!cache.has(cacheKey)) {
    cache.set(
      cacheKey,
      Promise.all([rendered(example, framework), exampleCss(example)]).then(
        ([html, css]) => normalize(html, { comments, css }),
      ),
    )
  }
  return cache.get(cacheKey)!
}

const idPattern = (key: string) =>
  new RegExp(`^${exampleIdBase(key)}-\\d+(-[a-z]+)*$`)

const authoredIds = async (example: Example, framework: Framework) => {
  const source =
    exampleSources[
      `../../src/component-examples/${example.key}.${exampleExtension(framework)}`
    ]
  return idsOf(await rendered(example, framework)).filter((id) =>
    source.includes(`"${id}"`),
  )
}

const exposedSvgs = (
  nodes: ReturnType<typeof parseHtml>,
  hidden = false,
): string[] =>
  nodes.flatMap((node) => {
    if (node.type !== "element") return []
    const attribute = (name: string) =>
      node.attrs.find((attr: { name: string }) => attr.name === name)?.value
    const inner = hidden || attribute("aria-hidden") === "true"
    const named =
      attribute("aria-label") ||
      attribute("aria-labelledby") ||
      node.children.some(
        (child: { type: string; tag?: string }) =>
          child.type === "element" && child.tag === "title",
      )
    if (node.tag === "svg" && !inner && !named) {
      return [
        `<svg ${node.attrs.map(({ name, value }: { name: string; value: string }) => `${name}="${value}"`).join(" ")}>`,
      ]
    }
    return exposedSvgs(node.children, inner)
  })

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

  test.each(frameworks)(
    "%s parses back to its own markup",
    async (framework) => {
      const html = await rendered(example, framework)
      expect(serialize(parseHtml(html))).toBe(html)
    },
  )

  test.each(frameworks)("%s hides decorative svgs", async (framework) => {
    expect(
      exposedSvgs(parseHtml(await rendered(example, framework))),
      'decorative svgs need aria-hidden="true"; name the others with aria-label or a <title>',
    ).toEqual([])
  })

  test.each(frameworks)(
    "%s ids follow <slug>-<example>-<n> and match html",
    async (framework) => {
      const pattern = idPattern(example.key)
      const ids = await authoredIds(example, framework)
      expect(
        ids.filter((id) => !pattern.test(id)),
        `ids must match ${pattern}`,
      ).toEqual([])
      if (framework === "html" || !example.loaders.html) return
      const htmlIds = await authoredIds(example, "html")
      expect(
        ids.filter((id) => !htmlIds.includes(id)),
        "ids must be the ones the html example uses",
      ).toEqual([])
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
    const comments = [framework, reference].every((name) =>
      COMMENTED.includes(name),
    )
    const [expected, actual] = await Promise.all([
      markup(example, reference, comments),
      markup(example, framework, comments),
    ])
    const known = [framework, reference]
      .map((name) => `${example.key}: ${name}`)
      .find((name) => name in KNOWN_DIFFERENCES)
    if (known) {
      expect(
        actual,
        `${known} is in KNOWN_DIFFERENCES (${KNOWN_DIFFERENCES[known]}) but no longer differs; delete it`,
      ).not.toBe(expected)
      return
    }
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
