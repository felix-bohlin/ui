import { experimental_AstroContainer as AstroContainer } from "astro/container"
import type { AstroInstance } from "astro"
import { describe, expect, test } from "vitest"
import {
  cleanRender,
  compare,
  convertExample,
  exampleLocals,
  generatedTargets,
  HTML_SCRIPT_RULES,
  htmlFromRender,
  layoutClasses,
  REACT_DEFAULT_VALUE,
  readHandWritten,
  TARGETS,
} from "../../scripts/build-examples.mjs"
import type { ComponentApi } from "../../src/component-api/types"

const EXAMPLES = "../../src/component-examples/"

const astroModules = import.meta.glob<AstroInstance>(
  "../../src/component-examples/**/*.astro",
)
const sources = import.meta.glob<string>(
  "../../src/component-examples/**/*.{astro,html,react.tsx,svelte,vue}",
  { eager: true, import: "default", query: "?raw" },
)
const apis = import.meta.glob<ComponentApi>(
  "../../src/component-api/*/api.ts",
  { eager: true, import: "default" },
)

const keys = Object.keys(sources)
  .filter((path) => path.endsWith(".astro"))
  .map((path) => path.slice(EXAMPLES.length, -".astro".length))
  .toSorted()

const handWritten = readHandWritten()
const classes = await layoutClasses()
const container = await AstroContainer.create()

const generate = async (key: string, framework: keyof typeof TARGETS) => {
  const file = `src/component-examples/${key}.astro`
  const source = sources[`${EXAMPLES}${key}.astro`]
  if (framework !== "html") return convertExample(source, framework, file)
  const module = await astroModules[`${EXAMPLES}${key}.astro`]()
  const rendered = await container.renderToString(module.default, {
    locals: exampleLocals(key, source),
  })
  return htmlFromRender(rendered, source, file, classes)
}

const astro = (body: string, imports = "", consts = "") =>
  `---\n${imports ? `import { ${imports} } from "opui-css/astro"\n` : ""}${consts}---\n\n${body}\n`

const convert = (source: string, framework: string, name = "Example") =>
  convertExample(
    source,
    framework,
    `src/component-examples/sample/${name}.astro`,
  )

describe("React", () => {
  test("renames attributes and turns static state into defaults", async () => {
    const code = await convert(
      astro(
        '<TextField autocomplete="off" class="field" value="Ada" />\n<label for="name" tabindex="0">Name</label>\n<Radio name="pick" value="b" checked />',
        "Radio, TextField",
      ),
      "react",
    )
    expect(code).toContain(
      '<TextField autoComplete="off" className="field" defaultValue="Ada" />',
    )
    expect(code).toContain('<label htmlFor="name" tabIndex={0}>')
    expect(code).toContain('<Radio name="pick" value="b" defaultChecked />')
  })

  test("keeps value on a read-only field", async () => {
    expect(
      await convert(
        astro('<TextField readonly value="x" />', "TextField"),
        "react",
      ),
    ).toContain('<TextField readOnly value="x" />')
  })

  test("moves the selected option to the Select's defaultValue", async () => {
    const code = await convert(
      astro(
        '<Select label="Pick">\n  <option>a</option>\n  <option selected value="b">B</option>\n</Select>',
        "Select",
      ),
      "react",
    )
    expect(code).toContain('<Select label="Pick" defaultValue="b">')
    expect(code).not.toContain("selected")
  })

  test("turns slots into props, sorted in when the attributes are", async () => {
    const code = await convert(
      astro(
        '<Badge hideLabel label="5 new">\n  <Fragment slot="indicator">5</Fragment>\n</Badge>\n<AccordionSummary>\n  Title\n  <Fragment slot="marker"><svg aria-hidden="true"></svg></Fragment>\n</AccordionSummary>',
        "AccordionSummary, Badge",
      ),
      "react",
    )
    expect(code).toContain('<Badge hideLabel indicator="5" label="5 new" />')
    expect(code).toContain('marker={<svg aria-hidden="true"></svg>}')
  })

  test("turns a style string into an object", async () => {
    expect(
      await convert(
        astro('<div style="max-inline-size: 18rem; --_size: 2rem"></div>'),
        "react",
      ),
    ).toContain('style={{ maxInlineSize: "18rem", "--_size": "2rem" }}')
  })

  test("keys a .map by its id, name or title", async () => {
    const code = await convert(
      astro(
        "<ul>\n  {\n    places.map(({ id, title }) => (\n      <li>{title}</li>\n    ))\n  }\n</ul>",
        "",
        'const places = [{ id: "a", title: "A" }]\n',
      ),
      "react",
    )
    expect(code).toContain('const places = [{ id: "a", title: "A" }]')
    expect(code).toContain("{places.map(({ id, title }) => (")
    expect(code).toContain("<li key={id}>{title}</li>")
  })

  test("inlines an icon used once and shares the others", async () => {
    const once = await convert(
      astro(
        "<Button><Fragment set:html={icon} /></Button>",
        "Button",
        'const icon = `<svg aria-hidden="true"></svg>`\n',
      ),
      "react",
    )
    expect(once).not.toContain("const icon")
    const twice = await convert(
      astro(
        "<Button><Fragment set:html={icon} /></Button>\n<Button><Fragment set:html={icon} /></Button>",
        "Button",
        'const icon = `<svg aria-hidden="true"></svg>`\n',
      ),
      "react",
    )
    expect(twice).toContain('const icon = <svg aria-hidden="true"></svg>')
    expect(twice).toContain("<Button>{icon}</Button>")
  })

  test("names the function after the file, with Example when it clashes", async () => {
    expect(
      await convert(astro("<Button>Go</Button>", "Button"), "react", "Button"),
    ).toContain("export default function ButtonExample()")
  })

  test("keeps the space before inline elements", async () => {
    expect(
      await convert(
        astro('<p>\n  Read the\n  <a href="#">terms</a>.\n</p>'),
        "react",
      ),
    ).toContain('Read the <a href="#">terms</a>.')
  })

  test("quotes a value with double quotes in single quotes", async () => {
    expect(
      await convert(
        astro(
          "<ListItem description='Has aria-current=\"page\"' />",
          "ListItem",
        ),
        "react",
      ),
    ).toContain("description='Has aria-current=\"page\"'")
  })

  test("puts a <style> at the end of the fragment", async () => {
    const code = await convert(
      astro(
        '<p class="note">Hi</p>\n\n<style>\n  .note {\n    color: red;\n  }\n</style>',
      ),
      "react",
    )
    expect(code).toContain(
      '<>\n      <p className="note">Hi</p>\n      <style>{`\n        .note {\n          color: red;\n        }\n      `}</style>\n    </>',
    )
  })
})

describe("Svelte", () => {
  test("writes slots as snippets and loops as each blocks", async () => {
    const code = await convert(
      astro(
        '<Badge label="5 new">\n  <Fragment slot="indicator">5</Fragment>\n</Badge>\n<ul>\n  {\n    places.map(({ id, title }) => (\n      <li>{title}</li>\n    ))\n  }\n</ul>',
        "Badge",
        'const places = [{ id: "a", title: "A" }]\n',
      ),
      "svelte",
    )
    expect(code).toContain('import { Badge } from "opui-css/svelte"')
    expect(code).toContain("{#snippet indicator()}5{/snippet}")
    expect(code).toContain("{#each places as { id, title } (id)}")
  })

  test("writes values with braces or double quotes as expressions", async () => {
    const code = await convert(
      astro(
        '<Textarea characterCountLabel="{count} left" description=\'A "b"\' />',
        "Textarea",
      ),
      "svelte",
    )
    expect(code).toContain('characterCountLabel={"{count} left"}')
    expect(code).toContain("description={'A \"b\"'}")
  })

  test("numbers a component's tabindex and leaves a native one", async () => {
    const code = await convert(
      astro('<Table tabindex="0"></Table>\n<div tabindex="0"></div>', "Table"),
      "svelte",
    )
    expect(code).toContain("<Table tabindex={0} />")
    expect(code).toContain('<div tabindex="0"></div>')
  })

  test("leaves the inside of a template literal as it is", async () => {
    expect(
      await convert(
        astro(
          "<pre><code>{code}</code></pre>",
          "",
          "const code = `a {\n  b: c;\n}`\n",
        ),
        "svelte",
      ),
    ).toContain("  const code = `a {\n  b: c;\n}`")
  })

  test("makes styles global", async () => {
    expect(
      await convert(
        astro("<p>Hi</p>\n\n<style>\n  p {\n    color: red;\n  }\n</style>"),
        "svelte",
      ),
    ).toContain(
      "<style>\n  :global {\n    p {\n      color: red;\n    }\n  }\n</style>",
    )
  })
})

describe("Vue", () => {
  test("binds expressions, interpolates text and uses template slots", async () => {
    const code = await convert(
      astro(
        '<Select items={[{ label: "A", value: "a" }]} label="Pick" />\n<Badge label="New">\n  <Fragment slot="indicator">5</Fragment>\n</Badge>\n<ul>\n  {\n    places.map(({ id, title }) => (\n      <li>{title}</li>\n    ))\n  }\n</ul>',
        "Badge, Select",
        'const places = [{ id: "a", title: "A" }]\n',
      ),
      "vue",
    )
    expect(code).toContain(`:items="[{ label: 'A', value: 'a' }]"`)
    expect(code).toContain("<template #indicator>5</template>")
    expect(code).toContain(
      '<li v-for="{ id, title } in places" :key="id">{{ title }}</li>',
    )
  })
})

describe("unsupported sources", () => {
  test.each([
    ["a frontmatter statement", astro("<p>{x}</p>", "", "const x = make()\n")],
    ["a component that isn't imported", astro("<Button>Go</Button>")],
    [
      "a .map without a key",
      astro(
        "<ul>{items.map(({ label }) => (<li>{label}</li>))}</ul>",
        "",
        "const items = []\n",
      ),
    ],
    ["a directive", astro('<p class:list={["a"]}>Hi</p>')],
    [
      "a client script",
      astro("<p>Hi</p>\n\n<script>\n  console.log(1)\n</script>"),
    ],
  ])("rejects %s", async (_, source) => {
    await expect(convert(source, "react")).rejects.toThrow("can't convert")
  })
})

describe("HTML", () => {
  test("cleans the rendered markup", () => {
    expect(
      cleanRender(
        '<img alt src="/a.png?w=1&amp;h=2" data-astro-cid-x><input disabled data-select-all slot="end"><p>Say &quot;hi&quot;</p><select><button><selectedcontent></button></select>',
      ),
    ).toBe(
      '<img alt="" src="/a.png?w=1&h=2"><input disabled data-select-all>\n<p>Say "hi"</p>\n<select><button><selectedcontent></selectedcontent></button></select>',
    )
  })

  test("trims the padding components add around text, not inside pre", () => {
    expect(cleanRender("<a class='x'> Link </a> <pre>  a\n  b  </pre>")).toBe(
      "<a class='x'>Link</a>\n<pre>  a\n  b  </pre>",
    )
  })

  test("breaks lines between the items of flex and grid containers", () => {
    expect(
      cleanRender(
        '<label class="ui-row"><span>A</span><span>B</span></label>',
        [],
        new Map([["ui-row", "inline-flex"]]),
      ),
    ).toBe('<label class="ui-row">\n<span>A</span>\n<span>B</span>\n</label>')
  })

  test("keeps the blank lines between the source's top-level elements", () => {
    expect(cleanRender("<p>A</p> <p>B</p> <p>C</p>", [true, false])).toBe(
      "<p>A</p>\n\n<p>B</p>\n<p>C</p>",
    )
  })

  test("imports the scripts the rendered components need", () => {
    const imports = (html: string) =>
      HTML_SCRIPT_RULES.flatMap((rule) => rule.match(html))
    expect(imports("<opui-toaster></opui-toaster><opui-copy>")).toEqual([
      'import "opui-css/elements/copy.js"',
      'import "opui-css/elements/toaster.js"',
    ])
    expect(imports("<input data-indeterminate>")).toContain(
      "activateIndeterminate()",
    )
    expect(imports('<output class="ui-value" data-live>')).toEqual([
      'import "opui-css/css/js/range.js"',
    ])
  })

  test("appends the example's script without its types", async () => {
    expect(
      await htmlFromRender(
        "<p>Hi</p>",
        astro(
          '<p>Hi</p>\n\n<script>\n  const p = document.querySelector<HTMLElement>("p")\n</script>',
        ),
        "src/component-examples/sample/Example.astro",
        new Map(),
      ),
    ).toBe(
      '<p>Hi</p>\n\n<script type="module">\n  const p = document.querySelector("p")\n</script>\n',
    )
  })
})

test("compare sorts a change into the smallest bucket", () => {
  expect(compare(undefined, "<p>a</p>")).toBe("new")
  expect(compare("<p>a</p>", "<p>a</p>")).toBe("identical")
  expect(compare("<p>a</p>", "<p>\n  a\n</p>")).toBe("whitespace")
  expect(compare('<p a="1" b="2"></p>', '<p b="2" a="1"></p>')).toBe("order")
  expect(compare('<p class="a b"></p>', '<p class="b a"></p>')).toBe("order")
  expect(compare("<path />", "<path></path>")).toBe("whitespace")
  expect(compare("<p>a</p>", "<p>b</p>")).toBe("changed")
})

test("REACT_DEFAULT_VALUE lists the components that hold their value as state", () => {
  const state = Object.values(apis)
    .filter(
      (api) =>
        api.model?.prop === "value" &&
        !api.model.frameworks?.svelte?.some((model) => model.prop === "group"),
    )
    .map((api) => api.component)
    .toSorted()
  expect(REACT_DEFAULT_VALUE).toEqual(state)
})

describe("hand-written examples", () => {
  test("hand-written-examples.json is sorted and names existing files", () => {
    const files = Object.keys(handWritten)
    expect(files).toEqual(files.toSorted())
    expect(
      files.filter(
        (file) =>
          !sources[`${EXAMPLES}${file}`] ||
          !sources[
            `${EXAMPLES}${file.replace(/\.(html|react\.tsx|svelte|vue)$/, ".astro")}`
          ],
      ),
    ).toEqual([])
  })

  test.each(Object.keys(handWritten))(
    "%s would differ if it were generated",
    async (file) => {
      const key = file.replace(/\.(html|react\.tsx|svelte|vue)$/, "")
      const framework = (Object.keys(TARGETS) as (keyof typeof TARGETS)[]).find(
        (candidate) => file === `${key}${TARGETS[candidate]}`,
      )!
      const generated = await generate(key, framework).catch(() => undefined)
      expect(
        generated,
        `${file} generates as it is; remove it from scripts/hand-written-examples.json`,
      ).not.toBe(sources[`${EXAMPLES}${file}`])
    },
  )

  test("an example with a client <script> keeps its React, Svelte and Vue", () => {
    const scripted = keys.filter((key) =>
      /^<script\b/m.test(sources[`${EXAMPLES}${key}.astro`]),
    )
    expect(scripted.length).toBeGreaterThan(0)
    for (const key of scripted) {
      expect(
        generatedTargets(key, sources[`${EXAMPLES}${key}.astro`], {}),
      ).toEqual(["html"])
    }
  })
})

describe.each(keys)("%s", (key) => {
  const targets = generatedTargets(
    key,
    sources[`${EXAMPLES}${key}.astro`],
    handWritten,
  ) as (keyof typeof TARGETS)[]
  test.each(targets)(
    "%s is generated from the Astro file",
    async (framework) => {
      const file = `${key}${TARGETS[framework]}`
      expect(
        sources[`${EXAMPLES}${file}`],
        `${file} is generated from ${key}.astro: edit ${key}.astro and run pnpm build-examples`,
      ).toBe(await generate(key, framework))
    },
  )
})
