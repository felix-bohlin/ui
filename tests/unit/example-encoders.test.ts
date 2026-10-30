import { parseFragment } from "parse5"
import { parse as parseSvelte } from "svelte/compiler"
import ts from "typescript"
import { compileTemplate, parse as parseVue } from "vue/compiler-sfc"
import { describe, expect, test } from "vitest"
import {
  cleanRender,
  convertExample,
  parseExample,
} from "../../scripts/build-examples.mjs"
import {
  attributeText,
  decodeAttribute,
  decodeText,
  decodeTextarea,
  jsxAttribute,
  jsxText,
  markupText,
  templateLiteral,
} from "../../scripts/example-encoders.mjs"

const VALUES = [
  "",
  " ",
  "plain",
  'say "hi"',
  "it's",
  "both \" and '",
  "a & b",
  "&copy",
  "&copy ",
  "&copy=1",
  "&amp;",
  "&amp;amp;",
  "&lt;b&gt;",
  "&#65;",
  "&notit;",
  "a&b=c",
  "{x}",
  "{{x}}",
  "}{",
  "<b>",
  "a > b",
  "a b",
  "line\nbreak",
  "back\\slash",
  "`tick`",
  "${x}",
  "url?w=1&h=2&fit=crop",
]

const sampleFile = "src/component-examples/sample/Example.astro"

const astro = (body: string) => `---\n---\n\n${body}\n`

const convert = async (body: string, framework: string) =>
  convertExample(astro(body), framework, sampleFile)

const evaluateReact = (code: string) => {
  const { outputText } = ts.transpileModule(code, {
    compilerOptions: {
      jsx: ts.JsxEmit.React,
      jsxFactory: "h",
      jsxFragmentFactory: "Fragment",
      module: ts.ModuleKind.CommonJS,
    },
    fileName: "Example.tsx",
  })
  const exports: { default?: () => unknown } = {}
  const h = (
    tag: string,
    props: Record<string, unknown>,
    ...children: unknown[]
  ) => ({
    children,
    props: props ?? {},
    tag,
  })
  new Function("h", "Fragment", "exports", outputText)(h, "Fragment", exports)
  return exports.default!() as ReturnType<typeof h>
}

type SvelteText = {
  data?: string
  expression?: { value: unknown }
  type: string
}

type SvelteElement = {
  attributes: { name: string; value: true | SvelteText | SvelteText[] }[]
  fragment: { nodes: { data: string }[] }
}

const svelteElement = (code: string) =>
  parseSvelte(code, { modern: true }).fragment.nodes.find(
    (node) => node.type === "RegularElement",
  ) as unknown as SvelteElement

const svelteAttribute = (code: string, name: string) => {
  const attribute = svelteElement(code).attributes.find(
    (item) => item.name === name,
  )!
  if (attribute.value === true) return ""
  return [attribute.value]
    .flat()
    .map((part) =>
      part.type === "Text" ? part.data : String(part.expression?.value),
    )
    .join("")
}

const vueElement = (code: string) => {
  const { descriptor } = parseVue(code)
  const { ast } = compileTemplate({
    filename: "Example.vue",
    id: "example",
    source: descriptor.template!.content,
  })
  return ast!.children.find((node: { type: number }) => node.type === 1) as {
    children: { content?: string; type: number }[]
    props: { name: string; value?: { content: string } }[]
  }
}

describe("decodeText and markupText", () => {
  test.each(VALUES)(
    "markupText round-trips %j through the HTML parser",
    (value) => {
      expect(decodeText(markupText(value))).toBe(value)
    },
  )

  test("markupText encodes the characters a template would read as markup", () => {
    expect(markupText("<b> {x} & y")).toBe("&lt;b> &#123;x&#125; &amp; y")
  })

  test("a sample the round trip must flag: encoding nothing changes the text", () => {
    expect(decodeText("a &amp; b")).not.toBe("a &amp; b")
  })
})

describe("decodeTextarea", () => {
  test("reads tags as text, decodes references and drops the first newline", () => {
    expect(decodeTextarea("a <b>b</b> &amp; &lt;i&gt;")).toBe(
      "a <b>b</b> & <i>",
    )
    expect(decodeTextarea("\nline 1\nline 2")).toBe("line 1\nline 2")
  })

  test("a sample the round trip must flag: decodeText reads the tags as markup", () => {
    expect(decodeText("a <b>b</b>")).not.toBe("a <b>b</b>")
  })
})

describe("attributeText", () => {
  test.each(VALUES)(
    "round-trips %j through the HTML parser, in both quotes",
    (value) => {
      expect(decodeAttribute(attributeText(value), '"')).toBe(value)
      expect(decodeAttribute(attributeText(value, "'"), "'")).toBe(value)
    },
  )

  test.each([
    ["url?w=1&h=2&fit=crop", "url?w=1&h=2&fit=crop"],
    ["a&b=c", "a&b=c"],
    ["&copy=1", "&copy=1"],
    ["&copy ", "&amp;copy "],
    ["&amp;", "&amp;amp;"],
    ["&#65;", "&amp;#65;"],
    ['say "hi"', "say &quot;hi&quot;"],
    ["a b", "a&nbsp;b"],
  ])("encodes %j as %j", (value, expected) => {
    expect(attributeText(value)).toBe(expected)
  })

  test("encodes the quote it is given, not the other one", () => {
    expect(attributeText('it\'s "x"', "'")).toBe('it&#39;s "x"')
  })
})

describe("jsxText", () => {
  test.each([
    ["HTML &amp; CSS", "HTML &amp; CSS"],
    ["Terms & Conditions", "Terms & Conditions"],
    ["a &nbsp; b", "a &nbsp; b"],
    ["a &check; b", "a ✓ b"],
    ["&copy 2024", "© 2024"],
    ["x &lt; y", "x &lt; y"],
    ["{x}", '{"{"}x{"}"}'],
    ["a > b", 'a {">"} b'],
  ])("writes %j as %j", (source, expected) => {
    expect(jsxText(source)).toBe(expected)
  })

  test.each(VALUES.filter((value) => !/^\s*$|\n/.test(value)))(
    "keeps the text %j when React reads the element",
    (value) => {
      const code = `export default function Example() { return <p>x${jsxText(markupText(value))}x</p> }`
      expect(evaluateReact(code).children.join("")).toBe(`x${value}x`)
    },
  )
})

describe("jsxAttribute", () => {
  test.each(VALUES)(
    "keeps the attribute value %j when React reads the element",
    (value) => {
      const code = `export default function Example() { return <p ${jsxAttribute("title", value)}>x</p> }`
      expect(evaluateReact(code).props.title).toBe(value)
    },
  )
})

describe("templateLiteral", () => {
  test.each(VALUES)("keeps %j inside a template literal", (value) => {
    expect(new Function(`return \`${templateLiteral(value)}\``)()).toBe(value)
  })
})

describe("a value goes through every target", () => {
  test.each(VALUES)("keeps the attribute value %j", async (value) => {
    const body = `<p title="${attributeText(value)}">Hi</p>`
    const { tree } = await parseExample(astro(body), sampleFile)
    expect(tree[0].attributes[0].value).toBe(value)

    expect(evaluateReact(await convert(body, "react")).props.title).toBe(value)
    expect(svelteAttribute(await convert(body, "svelte"), "title")).toBe(value)
    expect(
      vueElement(await convert(body, "vue")).props.find(
        (prop) => prop.name === "title",
      )?.value?.content ?? "",
    ).toBe(value)
  })

  test.each(
    VALUES.filter(
      (value) =>
        value &&
        !/^\s|\s$|[\\\n\u00a0]/.test(value) &&
        !JSON.stringify(value).includes("\\"),
    ),
  )("keeps the text of the string literal {%j}", async (value) => {
    const body = `<p>{${JSON.stringify(value)}}</p>`
    expect(evaluateReact(await convert(body, "react")).children.join("")).toBe(
      value,
    )
    const svelte = svelteElement(await convert(body, "svelte"))
    expect(
      svelte.fragment.nodes.map((node: { data: string }) => node.data).join(""),
    ).toBe(value)
    expect(vueElement(await convert(body, "vue")).children[0].content).toBe(
      value,
    )
  })

  test('the string literal {"<br>"} stays text in Svelte and Vue, not an element', async () => {
    const body = '<p>{"<br>"}</p>'
    expect(
      svelteElement(await convert(body, "svelte")).fragment.nodes,
    ).toHaveLength(1)
    expect(vueElement(await convert(body, "vue")).children).toHaveLength(1)
  })

  test.each([
    "p {\n  color: red;\n}",
    'p::before {\n  content: "\\201C";\n}',
    "/* `${x}` and \\ */\np {\n  color: red;\n}",
    'p::after {\n  content: "\\\\";\n}',
  ])("keeps the CSS %j in a <style>", async (css) => {
    const body = `<p>Hi</p>\n<style is:global>\n${css}\n</style>`
    const { styles } = await parseExample(astro(body), sampleFile)
    expect(styles).toEqual([css])

    const style = evaluateReact(await convert(body, "react")).children.find(
      (child) => (child as { tag?: string }).tag === "style",
    ) as { children: string[] }
    expect(style.children.join("").replace(/\s+/g, "")).toBe(
      css.replace(/\s+/g, ""),
    )

    const svelte = parseSvelte(await convert(body, "svelte"), { modern: true })
    expect(svelte.css!.content.styles.replace(/\s+/g, "")).toContain(
      css.replace(/\s+/g, ""),
    )
    expect(
      parseVue(await convert(body, "vue")).descriptor.styles[0].content.trim(),
    ).toBe(css)
  })
})

describe("what a set:html string may contain", () => {
  test.each(["{x}", "}"])("rejects the string %j", async (markup) => {
    const source = `---\nimport { Button } from "opui-css/astro"\nconst icon = \`<b>${markup}</b>\`\n---\n\n<Button><Fragment set:html={icon} /></Button>\n`
    await expect(parseExample(source, sampleFile)).rejects.toThrow(
      "with a string that contains { or }",
    )
  })
})

describe("a Select's selected option", () => {
  const select = (option: string) =>
    convertExample(
      `---\nimport { Select } from "opui-css/astro"\n---\n\n<Select>${option}</Select>\n`,
      "react",
      sampleFile,
    )

  test("keeps a value with double quotes in single quotes", async () => {
    expect(await select("<option selected value='a\"b'>x</option>")).toContain(
      "defaultValue='a\"b'",
    )
  })

  test("writes a value with both quotes as an expression", async () => {
    expect(
      await select('<option selected value="a&quot;b\'c">x</option>'),
    ).toContain('defaultValue={"a\\"b\'c"}')
  })

  test("writes a value that JSX would decode as an expression", async () => {
    expect(
      await select('<option selected value="&amp;amp;">x</option>'),
    ).toContain('defaultValue={"&amp;"}')
  })

  test("reads the value from decoded option text", async () => {
    expect(await select("<option selected>Tom &amp; Jerry</option>")).toContain(
      'defaultValue="Tom & Jerry"',
    )
  })
})

describe("HTML attributes", () => {
  test("re-encodes a rendered attribute without creating a character reference", () => {
    const html = cleanRender(
      '<a href="/x?a=1&amp;copy=2" title="&amp;copy 2024" data-x="&amp;h=1">x</a>',
    )
    const [anchor] = parseFragment(html).childNodes as unknown as {
      attrs: { name: string; value: string }[]
    }[]
    expect(
      Object.fromEntries(anchor.attrs.map(({ name, value }) => [name, value])),
    ).toEqual({
      "data-x": "&h=1",
      href: "/x?a=1&copy=2",
      title: "&copy 2024",
    })
    expect(html).toContain('title="&amp;copy 2024"')
    expect(html).toContain('data-x="&h=1"')
  })
})

describe("every generated Vue file", () => {
  const files = import.meta.glob<string>(
    "../../src/component-examples/**/*.vue",
    {
      eager: true,
      import: "default",
      query: "?raw",
    },
  )

  test("parses and compiles without errors", () => {
    const problems: string[] = []
    for (const [path, code] of Object.entries(files)) {
      const { descriptor, errors } = parseVue(code)
      const compiled = descriptor.template
        ? compileTemplate({
            filename: path,
            id: "example",
            source: descriptor.template.content,
          })
        : { errors: [] }
      for (const error of [...errors, ...compiled.errors]) {
        problems.push(
          `${path}: ${typeof error === "string" ? error : error.message}`,
        )
      }
    }
    expect(Object.keys(files).length).toBeGreaterThan(100)
    expect(problems).toEqual([])
  })

  test("a sample the check must flag: a broken template has errors", () => {
    const { descriptor } = parseVue("<template><div v-if></div></template>")
    expect(
      compileTemplate({
        filename: "x.vue",
        id: "x",
        source: descriptor.template!.content,
      }).errors.length,
    ).toBeGreaterThan(0)
  })
})
