import { readFileSync } from "node:fs"
import { stripTypeScriptTypes } from "node:module"
import { format, resolveConfig } from "prettier"
import { beforeAll, describe, expect, test } from "vitest"
import {
  cleanRender,
  convertExample,
  generate,
  elementTags,
  htmlFromRender,
  parseExample,
  readExample,
  runtimeImports,
  scriptImports,
  REACT_DEFAULT_VALUE,
} from "../../scripts/build-examples.mjs"
import {
  astroSourceOf,
  generatedTargets,
  handWrittenProblems,
  readHandWritten,
  staleProblems,
  TARGETS,
} from "../../scripts/example-targets.mjs"
import type { ComponentApi } from "../../src/component-api/types"

const EXAMPLES = "../../src/component-examples/"

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
const tags = await elementTags()
const committed = (file: string) => {
  try {
    return readFileSync(file, "utf8")
  } catch {
    return undefined
  }
}

const astro = (body: string, imports = "", consts = "") =>
  `---\n${imports ? `import { ${imports} } from "opui-css/astro"\n` : ""}${consts}---\n\n${body}\n`

const collapse = (text: string) =>
  text.replace(/\s+/g, "").replace(/,([)\]}])/g, "$1")

const scriptIn = async (html: string, script: string) => {
  const code = await format(stripTypeScriptTypes(script).trim(), {
    ...(await resolveConfig(sampleFile())),
    parser: "babel",
  })
  return collapse(html).includes(collapse(code))
}

const sampleFile = (name = "Example") =>
  `src/component-examples/sample/${name}.astro`

const formatted = async (source: string, name?: string, printWidth?: number) =>
  format(source, {
    ...(await resolveConfig(sampleFile(name))),
    filepath: sampleFile(name),
    ...(printWidth ? { printWidth } : {}),
  })

const convert = async (source: string, framework: string, name?: string) =>
  convertExample(await formatted(source, name), framework, sampleFile(name))

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
        '<p class="note">Hi</p>\n\n<style is:global>\n  .note {\n    color: red;\n  }\n</style>',
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
        astro(
          "<p>Hi</p>\n\n<style is:global>\n  p {\n    color: red;\n  }\n</style>",
        ),
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

const PLACES = `const places = [{ id: "a", title: "A" }, { id: "b", title: "B" }]\n`

describe("reading .map", () => {
  const layouts = {
    "a component body": [
      "<ul>{places.map(({ id, title }) => <Card>{title}</Card>)}</ul>",
      "Card",
    ],
    "extra parentheses": [
      "<ul>{places.map(({ id, title }) => ((<li>{title}</li>)))}</ul>",
      "",
    ],
    "no parentheses": [
      "<ul>{places.map(({ id, title }) => <li>{title}</li>)}</ul>",
      "",
    ],
    "one line": [
      "<ul>{places.map(({ id, title }) => (<li>{title}</li>))}</ul>",
      "",
    ],
    "the head over 80 columns": [
      `<ul>{
        places.map(
          ({
            id,
            title,
          }) => (
            <li>{title}</li>
          ),
        )
      }</ul>`,
      "",
    ],
  }

  test.each(Object.entries(layouts))("reads %s", async (_, [body, imports]) => {
    const { tree } = await parseExample(
      astro(body, imports, PLACES),
      sampleFile(),
    )
    const [list] = tree
    const map = list.children.find(
      (child: { type: string }) => child.type === "map",
    )
    expect(map).toMatchObject({ array: "places", key: "id", type: "map" })
    expect(map.params.replace(/\s+/g, " ")).toMatch(/^\{ ?id, ?title,? ?\}$/)
  })

  test("reads a string array and keys it by the string", async () => {
    const { tree } = await parseExample(
      astro(
        "<ul>{names.map((name) => <li>{name}</li>)}</ul>",
        "",
        'const names = ["a", "b"]\n',
      ),
      sampleFile(),
    )
    expect(
      tree[0].children.find((c: { type: string }) => c.type === "map"),
    ).toMatchObject({
      key: "name",
      params: "name",
    })
  })

  test("reads a const with as const", async () => {
    const { tree } = await parseExample(
      astro(
        "<ul>{names.map((name) => <li>{name}</li>)}</ul>",
        "",
        'const names = ["a", "b"] as const\n',
      ),
      sampleFile(),
    )
    expect(
      tree[0].children.find((c: { type: string }) => c.type === "map"),
    ).toMatchObject({
      key: "name",
    })
  })

  test.each([
    [
      "a key after id, value, name and title",
      "<ul>{rows.map(({ code }) => <li>{code}</li>)}</ul>",
      'const rows = [{ code: "x", name: "same" }, { code: "y", name: "same" }]\n',
      "code",
    ],
    [
      "name before title",
      "<ul>{rows.map(({ name, title }) => <li>{title}</li>)}</ul>",
      'const rows = [{ name: "x", title: "same" }, { name: "y", title: "same" }]\n',
      "name",
    ],
    [
      "a field of the item when the parameter is not destructured",
      "<ul>{rows.map((row) => <li>{row.label}</li>)}</ul>",
      'const rows = [{ id: 1, label: "x" }, { id: 2, label: "y" }]\n',
      "row.id",
    ],
    [
      "the local name of a renamed field",
      "<ul>{rows.map(({ id: ident }) => <li>{ident}</li>)}</ul>",
      "const rows = [{ id: 1 }, { id: 2 }]\n",
      "ident",
    ],
  ])("keys by %s", async (_, body, consts, key) => {
    const { tree } = await parseExample(astro(body, "", consts), sampleFile())
    expect(
      tree[0].children.find((c: { type: string }) => c.type === "map"),
    ).toMatchObject({ key })
  })

  test.each([
    [
      "a .map over something that is not a frontmatter const",
      "<ul>{items.map(({ id }) => <li>{id}</li>)}</ul>",
      "",
      "items.map, which isn't over an array const in the frontmatter",
    ],
    [
      "a callback with an index",
      "<ul>{places.map(({ id }, index) => <li>{id}</li>)}</ul>",
      PLACES,
      "the places.map callback, which must take one parameter",
    ],
    [
      "a callback with a block body",
      "<ul>{places.map(({ id }) => { return <li>{id}</li> })}</ul>",
      PLACES,
      "the places.map callback body, which must be one element",
    ],
    [
      "a parameter with a default",
      "<ul>{places.map(({ id = 1 }) => <li>{id}</li>)}</ul>",
      PLACES,
      "the places.map callback parameter",
    ],
    [
      "duplicate values in every field",
      "<ul>{rows.map(({ label }) => <li>{label}</li>)}</ul>",
      'const rows = [{ label: "x" }, { label: "x" }]\n',
      "rows.map without a field that is destructured, present in every item, a string or number, and unique",
    ],
    [
      "a unique field that the callback does not destructure",
      "<ul>{rows.map(({ label }) => <li>{label}</li>)}</ul>",
      'const rows = [{ id: 1, label: "x" }, { id: 2, label: "x" }]\n',
      "rows.map without a field that is destructured",
    ],
    [
      "duplicate strings",
      "<ul>{names.map((name) => <li>{name}</li>)}</ul>",
      'const names = ["a", "a"]\n',
      "names.map over items that aren't unique",
    ],
    [
      "an empty array",
      "<ul>{names.map((name) => <li>{name}</li>)}</ul>",
      "const names = []\n",
      "names.map over an empty array",
    ],
    [
      "two elements in one expression",
      "<p>{flag ? <b>a</b> : <i>b</i>}</p>",
      "",
      "an expression with more than one element",
    ],
    [
      "markup in an expression that is not a .map",
      "<p>{flag && <b>a</b>}</p>",
      "",
      "an expression with markup other than array.map(callback)",
    ],
    [
      "an expression that is not a property chain",
      "<p>{make()}</p>",
      "",
      "the expression {make()}",
    ],
  ])("rejects %s", async (_, body, consts, reason) => {
    await expect(
      parseExample(astro(body, "", consts), sampleFile()),
    ).rejects.toThrow(reason)
  })

  test("a .map renders in every target with the key from the data", async () => {
    const source = astro(
      "<ul>{places.map(({ id, title }) => <li>{title}</li>)}</ul>",
      "",
      PLACES,
    )
    expect(await convert(source, "react")).toContain(
      "<li key={id}>{title}</li>",
    )
    expect(await convert(source, "svelte")).toContain(
      "{#each places as { id, title } (id)}",
    )
    expect(await convert(source, "vue")).toContain(
      '<li v-for="{ id, title } in places" :key="id">',
    )
  })
})

describe("reading the frontmatter", () => {
  test("keeps type annotations, as const and comments in every target", async () => {
    const source = astro(
      "<p>{title}</p>",
      "",
      '// The title\nconst title: string = "Hi" // trailing\nconst sizes = ["a", "b"] as const\n',
    )
    for (const framework of ["react", "svelte", "vue"]) {
      const code = await convert(source, framework)
      expect(code, framework).toContain("// The title")
      expect(code, framework).toContain(
        'const title: string = "Hi" // trailing',
      )
      expect(code, framework).toContain('const sizes = ["a", "b"] as const')
    }
  })

  test("carries a type import that a declaration uses and drops one that none does", async () => {
    const source = astro(
      "<p>{title}</p>",
      "",
      'import type { Used } from "./types"\nimport type { Unused } from "./types"\nconst title: Used = "Hi"\n',
    )
    const code = await convert(source, "react")
    expect(code).toContain('import type { Used } from "./types"')
    expect(code).not.toContain("Unused")
  })

  test.each([
    ["a call", "const x = make()\n", "`x = make()`"],
    ["a type assertion", 'const x = <string>"a"\n', '`x = <string>"a"`'],
    ["a function", "function f() {}\n", "the frontmatter statement"],
    ["an export", 'export const x = "a"\n', "the frontmatter statement"],
    [
      "a comment on a const that set:html removes",
      '// The icon\nconst icon = "<svg></svg>"\n',
      "a comment on the set:html const icon",
    ],
  ])("rejects %s", async (_, consts, reason) => {
    const body = consts.includes("icon")
      ? "<Button><Fragment set:html={icon} /></Button>"
      : "<p>{x}</p>"
    await expect(
      parseExample(
        astro(body, consts.includes("icon") ? "Button" : "", consts),
        sampleFile(),
      ),
    ).rejects.toThrow(reason)
  })
})

describe("reading slots", () => {
  const icon = 'const icon = `<svg aria-hidden="true"></svg>`\n'

  test("keeps the slot of a Fragment that renders set:html", async () => {
    const source = astro(
      '<Badge label="New"><Fragment slot="indicator" set:html={icon} /></Badge>',
      "Badge",
      icon,
    )
    expect(await convert(source, "react")).toContain(
      'indicator={<svg aria-hidden="true"></svg>}',
    )
    expect(await convert(source, "svelte")).toMatch(
      /\{#snippet indicator\(\)\}\s*<svg/,
    )
    expect(await convert(source, "vue")).toMatch(/<template #indicator>\s*<svg/)
  })

  test.each([
    [
      "a slot on a native element's child",
      '<div><span slot="x">hi</span></div>',
      'slot="x" outside the direct children of a component',
    ],
    [
      "a slot on the body of a .map",
      '<Card>{places.map(({ id }) => <li slot="x">{id}</li>)}</Card>',
      'slot="x" outside the direct children of a component',
    ],
    [
      "a slot inside a slot",
      '<Card><Fragment slot="a"><b slot="b">x</b></Fragment></Card>',
      'slot="b" outside the direct children of a component',
    ],
    [
      "a slot that is an expression",
      "<Card><p slot={name}>x</p></Card>",
      "a slot attribute that isn't a plain string",
    ],
    [
      "another attribute on a Fragment",
      '<Card><Fragment slot="a" class="x">y</Fragment></Card>',
      "the attribute class on a <Fragment>",
    ],
    [
      "a Fragment without a slot",
      "<Card><Fragment>y</Fragment></Card>",
      "a <Fragment> without a slot",
    ],
  ])("rejects %s", async (_, body, reason) => {
    await expect(
      parseExample(
        astro(body, "Card", PLACES + "const name = 'a'\n"),
        sampleFile(),
      ),
    ).rejects.toThrow(reason)
  })
})

describe("React roots", () => {
  test("wraps anything but one element in a fragment", async () => {
    const consts = 'const title = "Hi"\n'
    expect(await convert(astro("{title}", "", consts), "react")).toMatch(
      /return \(?\s*<>\s*\{title\}\s*<\/>/,
    )
    expect(await convert(astro("Hello", "", consts), "react")).toMatch(
      /return \(?\s*<>\s*Hello\s*<\/>/,
    )
    expect(await convert(astro("<p>Hi</p>", "", consts), "react")).toMatch(
      /return <p>Hi<\/p>/,
    )
  })
})

describe("unsupported sources", () => {
  test.each([
    ["a component that isn't imported", astro("<Button>Go</Button>")],
    ["a directive", astro('<p class:list={["a"]}>Hi</p>')],
    [
      "a client script",
      astro("<p>Hi</p>\n\n<script>\n  console.log(1)\n</script>"),
    ],
  ])("rejects %s", async (_, source) => {
    await expect(convert(source, "react")).rejects.toThrow("can't convert")
  })
})

describe("the source layout", () => {
  const shape = (nodes: Record<string, unknown>[]): Record<string, unknown>[] =>
    nodes.flatMap((node): Record<string, unknown>[] => {
      if (node.type === "text") {
        const value = String(node.value).replace(/\s+/g, " ").trim()
        return value ? [{ type: "text", value }] : []
      }
      return [
        {
          ...node,
          ...(node.attributes
            ? {
                attributes: (
                  node.attributes as { kind: string; value: string }[]
                ).map((attribute) =>
                  attribute.kind === "expression"
                    ? {
                        ...attribute,
                        value: attribute.value
                          .replace(/\s+/g, "")
                          .replace(/,([\]})])/g, "$1"),
                      }
                    : attribute,
                ),
              }
            : {}),
          ...(node.children
            ? { children: shape(node.children as Record<string, unknown>[]) }
            : {}),
          ...(node.child
            ? { child: shape([node.child as Record<string, unknown>])[0] }
            : {}),
        },
      ]
    })

  test("a sample the check must flag: shape tells a change from a reformat", async () => {
    const a = await parseExample(astro("<p>a</p>"), sampleFile())
    const b = await parseExample(astro("<p>b</p>"), sampleFile())
    const c = await parseExample(astro("<p>\n  a\n</p>"), sampleFile())
    expect(shape(a.tree)).not.toEqual(shape(b.tree))
    expect(shape(a.tree)).toEqual(shape(c.tree))
  })

  test("every example reads the same at print widths 40 and 120", async () => {
    const problems: string[] = []
    for (const key of keys) {
      const source = sources[`${EXAMPLES}${key}.astro`]
      const name = key.split("/")[1]
      const expected = shape(
        (await parseExample(source, sampleFile(name))).tree,
      )
      for (const width of [40, 120]) {
        const reformatted = await formatted(source, name, width)
        const tree = shape(
          (await parseExample(reformatted, sampleFile(name))).tree,
        )
        if (JSON.stringify(tree) !== JSON.stringify(expected)) {
          problems.push(`${key} at ${width}`)
        }
      }
    }
    expect(problems).toEqual([])
  }, 300_000)
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
    const imports = (html: string) => scriptImports(html, tags)
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

  test("matches elements and attributes, not text", () => {
    expect(
      scriptImports("<code>data-indeterminate</code><p>opui-copy</p>", tags),
    ).toEqual([])
    expect(
      scriptImports("<code>opui-toaster</code><span data-live></span>", tags),
    ).toEqual([])
  })

  test("takes the element-to-file map from the customElements.define calls", () => {
    expect(tags.get("opui-text-field")).toBe("elements/text-field.js")
    expect(tags.get("opui-character-count")).toBe("elements/character-count.js")
    expect(
      scriptImports(
        "<opui-select-all><input data-indeterminate></opui-select-all>",
        tags,
      ),
    ).toEqual([
      'import "opui-css/elements/select-all.js"',
      'import { activateIndeterminate } from "opui-css/css/js/checkbox.js"',
      "",
      "activateIndeterminate()",
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

describe("generated examples", () => {
  let all: Awaited<ReturnType<typeof generate>>
  let withoutList: Awaited<ReturnType<typeof generate>>
  const listed = Object.keys(handWritten)
  const listedSlugs = [...new Set(listed.map((file) => file.split("/")[0]))]

  beforeAll(async () => {
    all = await generate()
    withoutList = await generate({ handWritten: {}, only: listedSlugs })
  }, 300_000)

  test("every example converts", () => {
    expect(all.problems).toEqual([])
  })

  test("every generated file is up to date", () => {
    expect(staleProblems(all.outputs, committed)).toEqual([])
  })

  test("every example has its generated files", () => {
    const expected = keys.flatMap((key) =>
      generatedTargets(key, handWritten).map(
        (framework) => `src/component-examples/${key}${TARGETS[framework]}`,
      ),
    )
    expect([...all.outputs.keys()].toSorted()).toEqual(expected.toSorted())
  })

  test("handWrittenProblems reports an unsorted list and files that don't exist", () => {
    const exists = (file: string) =>
      file !== "src/component-examples/a/Gone.vue"
    expect(
      handWrittenProblems({ "a/B.vue": "r", "a/A.vue": "r" }, exists),
    ).toEqual(["scripts/hand-written-examples.json is not sorted"])
    expect(handWrittenProblems({ "a/Gone.vue": "r" }, exists)).toEqual([
      "scripts/hand-written-examples.json names a/Gone.vue, which doesn't exist",
    ])
    expect(
      handWrittenProblems({ "a/B.vue": "r" }, (file: string) =>
        file.endsWith(".vue"),
      ),
    ).toEqual([
      "scripts/hand-written-examples.json names a/B.vue, which has no a/B.astro",
    ])
    expect(
      handWrittenProblems(
        handWritten,
        (file: string) => `../../${file}` in sources,
      ),
    ).toEqual([])
  })

  test.each(listed)("%s would differ if it were generated", (file) => {
    const generated = withoutList.outputs.get(`src/component-examples/${file}`)
    expect(
      generated,
      `${file} generates as it is; remove it from scripts/hand-written-examples.json`,
    ).not.toBe(sources[`${EXAMPLES}${file}`])
  })

  test("an example with a client <script> lists its React, Svelte and Vue files", async () => {
    const scripted = []
    for (const key of keys) {
      const { scripts } = await readExample(
        sources[`${EXAMPLES}${key}.astro`],
        sampleFile(),
      )
      if (scripts.length > 0) scripted.push(key)
    }
    expect(scripted.length).toBeGreaterThan(0)
    for (const key of scripted) {
      expect(generatedTargets(key, handWritten), key).toEqual(["html"])
    }
  })

  test("a client script is generated into the HTML file", async () => {
    for (const key of keys) {
      const { scripts } = await readExample(
        sources[`${EXAMPLES}${key}.astro`],
        sampleFile(),
      )
      for (const script of scripts) {
        expect(
          await scriptIn(sources[`${EXAMPLES}${key}.html`], script),
          key,
        ).toBe(true)
      }
    }
  })

  test("scriptIn flags a script that is missing or changed", async () => {
    const html = '<p>Hi</p>\n<script type="module">\n  const a = 1\n</script>\n'
    expect(await scriptIn(html, "const a = 1")).toBe(true)
    expect(await scriptIn(html, "const a = 2")).toBe(false)
    expect(await scriptIn("<p>Hi</p>", "const a = 1")).toBe(false)
  })
})

describe("an example's structure", () => {
  const read = (body: string, consts = "") =>
    readExample(astro(body, "", consts), sampleFile())

  test("finds a script in the syntax, not in text that looks like one", async () => {
    const quoted = await read(
      "<p>Hi</p>",
      'const code = "<script>1</script>"\n// <script>\n',
    )
    expect(quoted.scripts).toEqual([])
    const indented = await read("<p>Hi</p>\n  <script>\n    1\n  </script>")
    expect(indented.scripts).toHaveLength(1)
  })

  test("reads every script and style, blank lines and the body", async () => {
    const read2 = await read(
      "<p>A</p>\n\n<p>B</p>\n<p>C</p>\n<style is:global>\n  p {}\n</style>\n<script>\n  1\n</script>\n<script>\n  2\n</script>",
    )
    expect(read2.scripts).toHaveLength(2)
    expect(read2.styles).toEqual(["p {}"])
    expect(read2.blankLines).toEqual([true, false])
  })

  test.each([
    ["is:inline", "<script is:inline>1</script>", "the attribute is:inline"],
    ["src", '<script src="/a.js"></script>', "the attribute src"],
    ["type=module", '<script type="module">1</script>', "the attribute type"],
    [
      "define:vars",
      "<script define:vars={{ a: 1 }}>1</script>",
      "the attribute define:vars",
    ],
  ])("rejects a script with %s in every target", async (_, script, reason) => {
    const source = astro(`<p>Hi</p>\n${script}`)
    await expect(readExample(source, sampleFile())).rejects.toThrow(reason)
    for (const framework of ["react", "svelte", "vue"]) {
      await expect(
        convertExample(source, framework, sampleFile()),
      ).rejects.toThrow(reason)
    }
    await expect(
      htmlFromRender("<p>Hi</p>", source, sampleFile(), new Map()),
    ).rejects.toThrow(reason)
  })

  test.each([
    ["a style without is:global", "<style>p {}</style>"],
    ["a style with lang", '<style is:global lang="scss">p {}</style>'],
    [
      "a style with define:vars",
      "<style is:global define:vars={{ a: 1 }}>p {}</style>",
    ],
  ])("rejects %s in every target", async (_, style) => {
    const source = astro(`<p>Hi</p>\n${style}`)
    const reason = "a <style> that isn't exactly <style is:global>"
    await expect(readExample(source, sampleFile())).rejects.toThrow(reason)
    for (const framework of ["react", "svelte", "vue"]) {
      await expect(
        convertExample(source, framework, sampleFile()),
      ).rejects.toThrow(reason)
    }
    await expect(
      htmlFromRender("<p>Hi</p>", source, sampleFile(), new Map()),
    ).rejects.toThrow(reason)
  })

  test.each([
    ["a side-effect import", 'import "./x.js"'],
    ["a default import", 'import x from "./x.js"'],
    ["a namespace import", 'import * as x from "./x.js"'],
    ["a named import", 'import { x } from "./x.js"'],
    ["a re-export", 'export * from "./x.js"'],
    ["a dynamic import", 'import("./x.js")'],
  ])("rejects %s in a script", async (_, code) => {
    await expect(
      read(`<p>Hi</p>\n<script>\n  ${code}\n</script>`),
    ).rejects.toThrow("an import in a <script>")
  })

  test.each([
    ["a nested script", "<div><script>1</script></div>", "a nested <script>"],
    [
      "a nested style",
      "<div><style is:global>p {}</style></div>",
      "a nested <style>",
    ],
    [
      "a comment directly inside a component",
      "<Card><!-- x --></Card>",
      "a comment directly inside <Card>, which the Astro compiler drops",
    ],
    [
      "a comment directly inside a Fragment",
      '<Card><Fragment slot="a"><!-- x --></Fragment></Card>',
      "a comment directly inside <Fragment>",
    ],
  ])("rejects %s", async (_, body, reason) => {
    await expect(
      readExample(astro(body, "Card"), sampleFile()),
    ).rejects.toThrow(reason)
  })

  test("a comment inside an element is fine", async () => {
    const { body } = await read("<svg><!-- icon --><path /></svg>")
    expect(body.length).toBeGreaterThan(0)
  })

  test("two scripts become two modules after the rule imports", async () => {
    const html = await htmlFromRender(
      "<opui-copy></opui-copy>",
      astro(
        "<opui-copy></opui-copy>\n<script>\n  const a = 1\n</script>\n<script>\n  const a = 2\n</script>",
      ),
      sampleFile(),
      new Map(),
    )
    expect(html.match(/<script type="module">/g)).toHaveLength(3)
    expect(html.indexOf('import "opui-css/elements/copy.js"')).toBeLessThan(
      html.indexOf("const a = 1"),
    )
    expect(html.indexOf("const a = 1")).toBeLessThan(
      html.indexOf("const a = 2"),
    )
  })
})

describe("component runtimes", () => {
  test.each([
    [
      "a side-effect import",
      'import "../../elements/copy.js"',
      ["../../elements/copy.js"],
    ],
    [
      "a named import",
      'import { a } from "../../css/js/range.js"',
      ["../../css/js/range.js"],
    ],
    [
      "a default import",
      'import a from "../../css/js/range.js"',
      ["../../css/js/range.js"],
    ],
    [
      "a namespace import",
      'import * as a from "../../css/js/range.js"',
      ["../../css/js/range.js"],
    ],
    [
      "a re-export",
      'export { a } from "../../css/js/range.js"',
      ["../../css/js/range.js"],
    ],
    [
      "a dynamic import",
      'import("../../elements/copy.js")',
      ["../../elements/copy.js"],
    ],
    [
      "a template literal import",
      "import(`../../elements/copy.js`)",
      ["../../elements/copy.js"],
    ],
    ["no import", "console.log(1)", []],
  ])("finds %s", (_, code, expected) => {
    expect(runtimeImports(code, "Component.astro")).toEqual(expected)
  })

  test("rejects a computed import", () => {
    expect(() => runtimeImports("import(path)", "Component.astro")).toThrow(
      "Component.astro has a computed import()",
    )
  })
})

describe("stale files", () => {
  const outputs = new Map([
    ["src/component-examples/a/B.html", "<p>b</p>\n"],
    ["src/component-examples/a/B.react.tsx", "export default 1\n"],
    ["src/component-examples/a/C.vue", "<template>c</template>\n"],
  ])
  const files: Record<string, string> = {
    "src/component-examples/a/B.html": "<p>b</p>\n",
    "src/component-examples/a/B.react.tsx": "export default 2\n",
  }

  test("names each file that differs or is missing, with the Astro file to edit", () => {
    expect(staleProblems(outputs, (file: string) => files[file])).toEqual([
      "src/component-examples/a/B.react.tsx is stale: edit src/component-examples/a/B.astro and run pnpm build-examples",
      "src/component-examples/a/C.vue is stale: edit src/component-examples/a/C.astro and run pnpm build-examples",
    ])
  })

  test("reports nothing when every file matches", () => {
    expect(staleProblems(outputs, (file: string) => outputs.get(file))).toEqual(
      [],
    )
  })

  test("a generated file maps to its Astro file, and a hand-written one does not", () => {
    const read = (file: string) => sources[`../../${file}`]
    expect(astroSourceOf("src/component-examples/button/Sizes.vue", read)).toBe(
      "src/component-examples/button/Sizes.astro",
    )
    expect(astroSourceOf("src/component-examples/tabs/Binding.vue", read)).toBe(
      undefined,
    )
    expect(
      astroSourceOf("src/component-examples/tabs/Binding.html", read),
    ).toBe("src/component-examples/tabs/Binding.astro")
    expect(
      astroSourceOf("src/component-examples/text-field/NoLabel.html", read),
    ).toBe(undefined)
    expect(
      astroSourceOf("src/component-examples/button/Sizes.astro", read),
    ).toBe(undefined)
    expect(astroSourceOf("README.md", read)).toBe(undefined)
  })
})

describe("package scripts", () => {
  const { scripts } = JSON.parse(readFileSync("package.json", "utf8"))
  const group = new RegExp(scripts["check:fast"].match(/"\/(.+)\/"/)[1])

  test("check:fast checks the examples and writes none", () => {
    expect(group.test("check-examples")).toBe(true)
    expect(group.test("build-examples")).toBe(false)
    expect(scripts["check:fast"]).not.toContain("build-examples")
    expect(scripts["check-examples"]).toBe(
      "node scripts/build-examples.mjs --check",
    )
  })

  test("build writes the examples first and check runs check:fast", () => {
    expect(scripts.build.startsWith("pnpm build-examples && ")).toBe(true)
    expect(scripts.check).toContain("pnpm check:fast")
  })
})
