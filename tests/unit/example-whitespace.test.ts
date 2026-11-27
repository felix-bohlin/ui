import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import {
  compileExample,
  createRenderer,
} from "../../scripts/build-examples.mjs"
import {
  BLANK_LINE_MARKER,
  markWhitespace,
} from "../../scripts/example-whitespace.mjs"
import {
  EXAMPLE_EXTENSIONS,
  HYDRATED_FRAMEWORK_IDS,
} from "../../src/utils/framework"
import { normalize } from "./normalize"
import { render } from "./renderers"

const samples = new URL("./.samples/", import.meta.url)

let renderer: Awaited<ReturnType<typeof createRenderer>>
let count = 0

beforeAll(async () => {
  mkdirSync(samples, { recursive: true })
  renderer = await createRenderer()
}, 60_000)

afterAll(async () => {
  await renderer?.close()
  rmSync(samples, { force: true, recursive: true })
})

const EXTENSIONS = EXAMPLE_EXTENSIONS

const TARGETS = HYDRATED_FRAMEWORK_IDS

type Target = (typeof TARGETS)[number]

const astroSource = (body: string, imports = "", consts = "") =>
  `---\n${imports ? `import { ${imports} } from "opui-css/astro"\n` : ""}${consts}---\n\n${body}\n`

const renderSample = async (framework: Target, path: URL) =>
  render[framework](
    ((await import(/* @vite-ignore */ path.href)) as { default: unknown })
      .default,
  )

const convert = async (body: string, imports = "", consts = "") => {
  const name = `Sample${++count}`
  const file = `src/component-examples/sample/${name}.astro`
  const source = astroSource(body, imports, consts)
  const astro = await renderer.renderSource(file, source)
  const compiled = await compileExample(source, file, {
    renderer,
    targets: [...TARGETS],
  })
  expect(compiled.problems).toEqual([])
  const outputs = {} as Record<Target, string>
  const renders = {} as Record<Target, string>
  for (const framework of TARGETS) {
    outputs[framework] = compiled.outputs.get(framework)
    const path = new URL(`${name}.${EXTENSIONS[framework]}`, samples)
    writeFileSync(path, outputs[framework])
    renders[framework] = await renderSample(framework, path)
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
  ["a space after a multi-byte character", "<p>Café <b>au lait</b></p>", ""],
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

describe("the whitespace of the generated React, Solid, Svelte and Vue", () => {
  test.each(SAMPLES)(
    "%s renders like Astro",
    async (_, body, imports) => {
      const { astro, renders } = await convert(body, imports)
      for (const framework of TARGETS) {
        expect(normalize(renders[framework]), framework).toBe(normalize(astro))
      }
    },
    60_000,
  )

  test("H<tspan>2</tspan>O renders like Astro in React and Solid, and Svelte and Vue reject it", async () => {
    const source =
      '---\n---\n\n<svg aria-hidden="true"><text>H<tspan>2</tspan>O</text></svg>\n'
    const file = "src/component-examples/sample/Tspan.astro"
    const astro = await renderer.renderSource(file, source)
    const { outputs, problems } = await compileExample(source, file, {
      renderer,
      targets: ["react", "solid", "svelte", "vue"],
    })
    expect(problems).toEqual([
      expect.stringContaining("text next to an element inside an SVG <text>"),
      expect.stringContaining("text next to an element inside an SVG <text>"),
    ])
    for (const framework of ["react", "solid"] as const) {
      const path = new URL(`Tspan.${EXTENSIONS[framework]}`, samples)
      writeFileSync(path, outputs.get(framework))
      expect(normalize(await renderSample(framework, path)), framework).toBe(
        normalize(astro),
      )
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
      '<FieldGroup>\n  <Checkbox name="g">One</Checkbox>\n  <Checkbox name="g">Two</Checkbox>\n</FieldGroup>',
      "Checkbox, FieldGroup",
    ],
    ["padding inside a Button", "<Button> Save </Button>", "Button"],
  ])(
    "%s gets no written space",
    async (_, body, imports) => {
      const { astro, outputs, renders } = await convert(body, imports)
      expect(outputs.react).not.toContain('{" "}')
      expect(outputs.solid).not.toContain('{" "}')
      expect(outputs.svelte).not.toContain('{" "}')
      expect(outputs.vue).not.toContain('{{ " " }}')
      for (const framework of TARGETS) {
        expect(normalize(renders[framework]), framework).toBe(normalize(astro))
      }
    },
    60_000,
  )

  test.each([
    [
      "text from a set:html string",
      "<p><Fragment set:html={note} /></p>",
      "",
      'const note = "<b>a</b> <i>b</i>"\n',
    ],
    ["raw text", "<pre><code><span>$ </span>npm install</code></pre>", "", ""],
    [
      "text the render drops",
      '<Chip label="Tonal">\n  <svg aria-hidden="true" slot="start" viewBox="0 0 1 1"></svg>\n</Chip>',
      "Chip",
      "",
    ],
  ])(
    "%s, which has no role from the render, renders like Astro",
    async (_, body, imports, consts) => {
      const { astro, renders } = await convert(body, imports, consts)
      for (const framework of TARGETS) {
        expect(normalize(renders[framework]), framework).toBe(normalize(astro))
      }
    },
    60_000,
  )
})

describe("markWhitespace", () => {
  const file = "src/component-examples/sample/Marks.astro"

  const textParts = async (source: string) => {
    const marks = await markWhitespace(source)
    return marks.read(await renderer.renderSource(file, marks.source))
  }

  const startOf = (source: string, text: string) =>
    Buffer.byteLength(source.slice(0, source.indexOf(text)))

  test("reads each run's role from the render, keyed by its byte offset", async () => {
    const source = astroSource(
      '<p>Café\n  <b>au lait</b></p>\n<div class="example-row"><b>a</b> <b>b</b></div>',
    )
    const parts = await textParts(source)
    expect(
      parts({ start: startOf(source, "Café"), value: "Café\n  " }),
    ).toEqual([{ text: "Café" }, { role: "space", run: "\n  " }])
    expect(parts({ start: startOf(source, " <b>b"), value: " " })).toEqual([
      { role: "drop", run: " " },
    ])
  })

  test("a top-level run drops, keeping a blank line", async () => {
    const source = astroSource("<p>a</p>\n\n<p>b</p>")
    const parts = await textParts(source)
    expect(
      parts({
        start: startOf(source, "\n\n<p>b"),
        topLevel: true,
        value: "\n\n",
      }),
    ).toEqual([{ role: "drop", run: "\n\n" }])
  })

  test.each([
    [
      "text from a string, which has no offset",
      "<p>a</p>",
      () => undefined,
      "a\nb c",
    ],
    ["raw text, which has no mark", "<pre>a\nb c</pre>", startOf, "a\nb c"],
    [
      "text the render drops",
      '<Chip label="x">a\nb c<svg slot="start"></svg></Chip>',
      startOf,
      "a\nb c",
    ],
  ])(
    "%s takes the role of its layout: a line break drops, a space stays",
    async (_, body, start, value) => {
      const source = astroSource(body, body.includes("Chip") ? "Chip" : "")
      const parts = await textParts(source)
      expect(parts({ start: start(source, value), value })).toEqual([
        { text: "a" },
        { role: "drop", run: "\n" },
        { text: "b" },
        { role: "space", run: " " },
        { text: "c" },
      ])
    },
  )

  test("a run the marks never saw throws", async () => {
    const parts = await textParts(astroSource("<p>a b</p>"))
    expect(() => parts({ start: 0, value: " " })).toThrow("has no mark")
  })

  test("marks the blank lines between top-level nodes, keeping text and bytes", async () => {
    expect(
      (
        await markWhitespace(
          '---\nconst a = "é"\n---\n\n<p>é</p>\n\nPrimary\n<p>b</p>\n<script>\n  x()\n</script>\n',
        )
      ).source,
    ).toBe(
      `---\nconst a = "é"\n---\n\n<p>é</p>\n<!--${BLANK_LINE_MARKER}-->\nPrimary\n<p>b</p>\n<script>\n  x()\n</script>\n`,
    )
  })

  test("leaves blank lines inside elements alone", async () => {
    expect(
      (await markWhitespace("---\n---\n\n<div>\n\n<p>a</p>\n</div>\n")).source,
    ).not.toContain(BLANK_LINE_MARKER)
  })
})
