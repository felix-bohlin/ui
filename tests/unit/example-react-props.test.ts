import { createElement } from "react"
import { renderToString } from "react-dom/server"
import { describe, expect, test, vi } from "vitest"
import {
  convertExample,
  REACT_FIXED_VALUE_TYPES,
} from "../../scripts/build-examples.mjs"
import { checkAttributeOrder } from "../../scripts/check-components.mjs"
import {
  reactKinds,
  reactPropsOf,
  resolveReactProp,
  typeDiagnostics,
} from "../../scripts/example-react-props.mjs"

const sampleFile = "src/component-examples/sample/Example.astro"

const astro = (body: string, imports = "") =>
  `---\n${imports ? `import { ${imports} } from "opui-css/astro"\n` : ""}---\n\n${body}\n`

const react = (body: string, imports = "") =>
  convertExample(astro(body, imports), "react", sampleFile)

const outputs = new Map<string, string>()

const sample = async (body: string, imports = "") => {
  const code = await react(body, imports)
  outputs.set(`Sample${outputs.size}.tsx`, code)
  return code
}

describe("the React prop table", () => {
  test.each([
    ["td", false, "colspan", "colSpan", "number"],
    ["td", false, "class", "className", "string"],
    ["td", false, "tabindex", "tabIndex", "number"],
    ["form", false, "novalidate", "noValidate", "boolean"],
    ["input", false, "readonly", "readOnly", "boolean"],
    ["input", false, "maxlength", "maxLength", "number"],
    ["label", false, "for", "htmlFor", "string"],
    ["svg", false, "stroke-width", "strokeWidth", "string"],
    ["svg", false, "xmlns:xlink", "xmlnsXlink", "string"],
    ["div", false, "popover", "popover", "string"],
    ["div", false, "hidden", "hidden", "boolean"],
    ["div", false, "interestfor", "interestfor", "string"],
    ["p", false, "aria-label", "aria-label", "string"],
    ["p", false, "data-anything", "data-anything", "string"],
    ["Select", true, "multiple", "multiple", "boolean"],
    ["Select", true, "variant", "variant", "string"],
    ["Carousel", true, "itemsPerView", "itemsPerView", "number"],
    ["Table", true, "tabindex", "tabIndex", "number"],
  ])("%s %s: %s is %s (%s)", (tag, component, name, expected, kind) => {
    const table = reactPropsOf(tag, component)!
    const resolved = resolveReactProp(table, name)
    expect(resolved).toBe(expected)
    expect([...reactKinds(table, resolved)]).toContain(kind)
  })

  test.each([
    ["input", false, "novalidate"],
    ["td", false, "nowrap"],
    ["div", false, "disabled"],
    ["p", false, "bogus"],
  ])("%s %s has no %s", (tag, component, name) => {
    expect(resolveReactProp(reactPropsOf(tag, component)!, name)).toBe(
      undefined,
    )
  })

  test("an element or component that React's types don't have is undefined", () => {
    expect(reactPropsOf("nope", false)).toBe(undefined)
    expect(reactPropsOf("Nope", true)).toBe(undefined)
  })
})

describe("attribute names and value forms in React", () => {
  test.each([
    ["<form novalidate></form>", "", "<form noValidate>"],
    ["<table><tr><td colspan='2'>x</td></tr></table>", "", "colSpan={2}"],
    ["<div tabindex='0'>x</div>", "", "tabIndex={0}"],
    ["<div popover>x</div>", "", 'popover=""'],
    ["<div popover='manual'>x</div>", "", 'popover="manual"'],
    ["<div hidden>x</div>", "", "<div hidden>"],
    ["<svg stroke-width='2'></svg>", "", 'strokeWidth="2"'],
    ["<label for='a'>x</label>", "", 'htmlFor="a"'],
    [
      "<p aria-hidden='true' data-x='1'>x</p>",
      "",
      'aria-hidden="true" data-x="1"',
    ],
    ["<input maxlength='20' />", "", "maxLength={20}"],
    ["<input readonly value='x' />", "", 'readOnly value="x"'],
    ["<Table tabindex='0'></Table>", "Table", "<Table tabIndex={0}"],
    ["<Carousel itemsPerView='2'></Carousel>", "Carousel", "itemsPerView={2}"],
    ["<img alt='' src='/a.png' />", "", 'alt="" src="/a.png"'],
  ])("%s", async (body, imports, expected) => {
    expect(await sample(body, imports)).toContain(expected)
  })

  test.each([
    ["<input novalidate />", "", "the attribute novalidate on <input>"],
    ["<td nowrap>x</td>", "", "the attribute nowrap on <td>"],
    ["<Nope></Nope>", "Nope", "<Nope>, which React's types don't have"],
    [
      "<td colspan='x'>x</td>",
      "",
      'the string "x" for the prop colSpan of <td>',
    ],
    [
      "<button disabled=''>x</button>",
      "",
      'the string "" for the prop disabled of <button>',
    ],
    ["<Table nonsense></Table>", "Table", "the attribute nonsense on <Table>"],
  ])("rejects %s", async (body, imports, reason) => {
    await expect(react(body, imports)).rejects.toThrow(reason)
  })

  test("rejects a slot that the component has no React prop for", async () => {
    await expect(
      react(
        '<Badge label="x"><Fragment slot="nonsense">y</Fragment></Badge>',
        "Badge",
      ),
    ).rejects.toThrow(
      "the slot nonsense of <Badge>, which has no nonsense prop in React",
    )
  })
})

describe("the order of props", () => {
  test("a component's props and slot props are sorted together in React", async () => {
    const code = await react(
      '<ListItem label="a" end="b"><Fragment slot="start">c</Fragment></ListItem>',
      "ListItem",
    )
    expect(code).toContain('<ListItem end="b" label="a" start="c" />')
  })

  test("a native element keeps its attribute order", async () => {
    expect(await react('<p id="b" class="a">x</p>')).toContain(
      '<p id="b" className="a">',
    )
  })

  test("a component's attributes are sorted in Svelte and Vue", async () => {
    const source = astro(
      '<Select variant="filled" label="x" spread />',
      "Select",
    )
    expect(await convertExample(source, "svelte", sampleFile)).toContain(
      '<Select label="x" spread variant="filled" />',
    )
    expect(await convertExample(source, "vue", sampleFile)).toContain(
      '<Select label="x" spread variant="filled" />',
    )
  })

  test("checkAttributeOrder names the tag and the order to write", async () => {
    expect(
      await checkAttributeOrder(
        astro('<Select variant="filled" label="x" spread />', "Select"),
      ),
    ).toEqual([
      "the attributes of <Select> are not in alphabetical order: write label, spread, variant",
    ])
  })

  test("checkAttributeOrder allows sorted components and any order on elements", async () => {
    expect(
      await checkAttributeOrder(
        astro(
          '<Select label="x" spread variant="filled" /><p id="b" class="a">x</p>',
          "Select",
        ),
      ),
    ).toEqual([])
  })

  test("checkAttributeOrder finds a nested component", async () => {
    expect(
      await checkAttributeOrder(
        astro(
          '<div><Card><Button variant="a" size="b" /></Card></div>',
          "Button, Card",
        ),
      ),
    ).toHaveLength(1)
  })
})

describe("form state in React", () => {
  test.each([
    ['<input type="checkbox" value="a" />', 'value="a"'],
    ['<input type="radio" value="a" />', 'value="a"'],
    ['<input type="submit" value="Go" />', 'value="Go"'],
    ['<input type="text" value="a" />', 'defaultValue="a"'],
    ['<input value="a" />', 'defaultValue="a"'],
    ['<input type="number" value="1" />', 'defaultValue="1"'],
    ['<input readonly value="a" />', 'readOnly value="a"'],
    ["<input checked type='checkbox' />", "defaultChecked"],
  ])("%s", async (body, expected) => {
    expect(await sample(body)).toContain(expected)
  })

  test("rejects an input with a dynamic type", async () => {
    await expect(react("<input type={kind} />")).rejects.toThrow(
      "an <input> with a dynamic type",
    )
  })

  test("REACT_FIXED_VALUE_TYPES is the set of input types react-dom accepts a value on", () => {
    const types = [
      "text",
      "search",
      "tel",
      "url",
      "email",
      "password",
      "date",
      "month",
      "week",
      "time",
      "datetime-local",
      "number",
      "range",
      "color",
      "file",
      "checkbox",
      "radio",
      "submit",
      "image",
      "reset",
      "button",
      "hidden",
    ]
    const accepted = types.filter((type) => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {})
      try {
        renderToString(createElement("input", { type, value: "x" }))
        return spy.mock.calls.length === 0
      } finally {
        spy.mockRestore()
      }
    })
    expect(accepted.toSorted()).toEqual([...REACT_FIXED_VALUE_TYPES].toSorted())
  })

  test("lifts the selected option to defaultValue, through optgroup", async () => {
    const code = await sample(
      "<Select><optgroup label='g'><option>a</option><option selected value='b'>B</option></optgroup></Select>",
      "Select",
    )
    expect(code).toContain('<Select defaultValue="b">')
    expect(code).not.toContain("selected")
  })

  test("takes the option value by the HTML rule from its text", async () => {
    expect(
      await sample(
        "<Select><option selected>\n  Tom   &amp;\n  Jerry\n</option></Select>",
        "Select",
      ),
    ).toContain('defaultValue="Tom & Jerry"')
    expect(
      await react(
        "<Select><option selected>&nbsp;a</option></Select>",
        "Select",
      ),
    ).toContain('defaultValue=" a"')
  })

  test("writes several selected options of a multiple select as an array", async () => {
    expect(
      await sample(
        "<Select multiple><option selected>a</option><option>b</option><option selected value='c'>C</option></Select>",
        "Select",
      ),
    ).toContain('defaultValue={["a", "c"]}')
  })

  test("a native select works the same", async () => {
    expect(
      await sample("<select><option selected value='x'>X</option></select>"),
    ).toContain('<select defaultValue="x">')
  })

  test.each([
    [
      "several selected options without multiple",
      "<Select><option selected>a</option><option selected>b</option></Select>",
      "several selected options in <Select> without multiple",
    ],
    [
      "a selected option next to a value",
      "<Select value='a'><option selected>a</option></Select>",
      "a selected <option> next to a value on <Select>",
    ],
  ])("rejects %s", async (_, body, reason) => {
    await expect(react(body, "Select")).rejects.toThrow(reason)
  })

  test("turns textarea text into defaultValue", async () => {
    expect(await sample("<textarea>Hello</textarea>")).toContain(
      '<textarea defaultValue="Hello"></textarea>',
    )
    expect(await sample("<textarea>\nline 1\nline 2</textarea>")).toContain(
      'defaultValue={"line 1\\nline 2"}',
    )
    expect(
      await sample("<textarea>&lt;p&gt;a &amp; <b>b</b></textarea>"),
    ).toContain('defaultValue="<p>a & <b>b</b>"')
    await expect(react("<textarea>{text}</textarea>")).rejects.toThrow(
      "a <textarea> with markup",
    )
  })
})

describe("the generated React type-checks", () => {
  test("every sample above has no type errors", async () => {
    expect(outputs.size).toBeGreaterThan(20)
    const result = typeDiagnostics(outputs)
    expect(
      [...result].filter(([, diagnostics]) => diagnostics.length > 0),
    ).toEqual([])
  }, 60_000)

  test("a sample the check must flag: a string on a number prop", () => {
    const result = typeDiagnostics(
      new Map([
        [
          "Bad.tsx",
          'export default function Bad() { return <td colSpan="2">x</td> }',
        ],
      ]),
    )
    expect(result.get("Bad.tsx")![0]).toContain(
      "not assignable to type 'number'",
    )
  })
})
