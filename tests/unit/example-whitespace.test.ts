import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { createElement, type ComponentType } from "react"
import { renderToString as renderReact } from "react-dom/server"
import type { Component as SvelteComponent } from "svelte"
import { render as renderSvelte } from "svelte/server"
import { createSSRApp, type Component as VueComponent } from "vue"
import { renderToString as renderVue } from "vue/server-renderer"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import {
  convertExample,
  createRenderer,
} from "../../scripts/build-examples.mjs"
import { whitespaceRoles } from "../../scripts/example-html.mjs"
import { normalize } from "./normalize"

const samples = new URL("./.samples/", import.meta.url)

let renderer: Awaited<ReturnType<typeof createRenderer>>
let count = 0

beforeAll(async () => {
  mkdirSync(samples, { recursive: true })
  renderer = await createRenderer()
}, 60_000)

afterAll(async () => {
  await renderer.close()
  rmSync(samples, { force: true, recursive: true })
})

const EXTENSIONS = { react: "react.tsx", svelte: "svelte", vue: "vue" }

const ssr = {
  react: (loaded: { default: ComponentType }) =>
    renderReact(createElement(loaded.default)),
  svelte: (loaded: { default: SvelteComponent }) =>
    renderSvelte(loaded.default).body,
  vue: (loaded: { default: VueComponent }) =>
    renderVue(createSSRApp(loaded.default)),
}

const convert = async (body: string, imports = "") => {
  const name = `Sample${++count}`
  const file = `src/component-examples/sample/${name}.astro`
  const source = `---\n${imports ? `import { ${imports} } from "opui-css/astro"\n` : ""}---\n\n${body}\n`
  const astro = await renderer.renderSource(file, source)
  const roles = whitespaceRoles(astro)
  const outputs = {} as Record<keyof typeof EXTENSIONS, string>
  const renders = {} as Record<keyof typeof EXTENSIONS, string>
  for (const framework of ["react", "svelte", "vue"] as const) {
    outputs[framework] = await convertExample(source, framework, file, {
      roles,
    })
    const path = new URL(`${name}.${EXTENSIONS[framework]}`, samples)
    writeFileSync(path, outputs[framework])
    renders[framework] = await ssr[framework](
      await import(/* @vite-ignore */ path.href),
    )
  }
  return { astro, outputs, renders }
}

const SAMPLES: [string, string, string][] = [
  [
    "kbd elements on separate lines",
    "<p>Press\n  <kbd>A</kbd>\n  <kbd>B</kbd>\n</p>",
    "",
  ],
  ['{" "} before a newline', '<p>a{" "}\n  <b>b</b></p>', ""],
  [
    "a long run the formatter reflows",
    "<p><b>one</b> <b>two</b> <b>three</b> <b>four</b> <b>five</b> <b>six</b> <b>seven</b> <b>eight</b></p>",
    "",
  ],
  ["inline edge spaces", '<p>Read<a href="#t"> terms</a> now</p>', ""],
  ["an NBSP", "<p>a&nbsp;<b>b</b></p>", ""],
  [
    "a space before an inline element on the next line",
    '<p>\n  Read the\n  <a href="#t">terms</a>.\n</p>',
    "",
  ],
  [
    "a space before a required asterisk",
    '<Checkbox name="a" required>\n  Required\n  <Fragment slot="end-text">Text</Fragment>\n</Checkbox>',
    "Checkbox",
  ],
]

describe("the whitespace of the generated React, Svelte and Vue", () => {
  test.each(SAMPLES)(
    "%s renders like Astro",
    async (_, body, imports) => {
      const { astro, renders } = await convert(body, imports)
      for (const framework of ["react", "svelte", "vue"] as const) {
        expect(normalize(renders[framework]), framework).toBe(normalize(astro))
      }
    },
    60_000,
  )

  test("H<tspan>2</tspan>O renders like Astro in React, and Svelte and Vue reject it", async () => {
    const source =
      '---\n---\n\n<svg aria-hidden="true"><text>H<tspan>2</tspan>O</text></svg>\n'
    const file = "src/component-examples/sample/Tspan.astro"
    const astro = await renderer.renderSource(file, source)
    const roles = whitespaceRoles(astro)
    for (const framework of ["svelte", "vue"]) {
      await expect(
        convertExample(source, framework, file, { roles }),
      ).rejects.toThrow("text next to an element inside an SVG <text>")
    }
    for (const framework of ["react"] as const) {
      const path = new URL(`Tspan.${EXTENSIONS[framework]}`, samples)
      writeFileSync(
        path,
        await convertExample(source, framework, file, { roles }),
      )
      expect(
        normalize(
          await ssr[framework](await import(/* @vite-ignore */ path.href)),
        ),
        framework,
      ).toBe(normalize(astro))
    }
  }, 60_000)

  test("a sample the check must flag: a dropped space", async () => {
    const { astro } = await convert("<p><kbd>A</kbd> <kbd>B</kbd></p>")
    expect(normalize("<p><kbd>A</kbd><kbd>B</kbd></p>")).not.toBe(
      normalize(astro),
    )
  }, 60_000)

  test.each([
    [
      "buttons in an example row",
      '<div class="example-row">\n  <Button>A</Button>\n  <Button>B</Button>\n</div>',
      "Button",
    ],
    [
      "a FieldGroup",
      '<FieldGroup name="g">\n  <Checkbox>One</Checkbox>\n  <Checkbox>Two</Checkbox>\n</FieldGroup>',
      "Checkbox, FieldGroup",
    ],
    ["padding inside a Button", "<Button> Save </Button>", "Button"],
  ])(
    "%s gets no written space",
    async (_, body, imports) => {
      const { astro, outputs, renders } = await convert(body, imports)
      expect(outputs.react).not.toContain('{" "}')
      expect(outputs.svelte).not.toContain('{" "}')
      expect(outputs.vue).not.toContain('{{ " " }}')
      for (const framework of ["react", "svelte", "vue"] as const) {
        expect(normalize(renders[framework]), framework).toBe(normalize(astro))
      }
    },
    60_000,
  )

  test("the roles come from the render", async () => {
    const { astro } = await convert(
      '<p>a <b>b</b></p><div class="example-row">\n  <b>c</b>\n</div>',
    )
    expect([...whitespaceRoles(astro).values()]).toEqual([
      "space",
      "drop",
      "drop",
    ])
  }, 60_000)
})
