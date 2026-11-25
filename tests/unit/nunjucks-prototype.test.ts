import { spreadAttributes } from "astro/runtime/server/index.js"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { createRenderer } from "../../scripts/build-examples.mjs"
import { DIAGNOSTICS } from "../../scripts/component-diagnostics.mjs"
import { nunjucksExpression } from "../../scripts/component-nunjucks-expression.mjs"
import {
  compileNunjucks,
  componentFiles,
  nunjucksCensus,
  nunjucksTemplates,
} from "../../scripts/component-nunjucks.mjs"
import {
  createEnvironment,
  createRuntime,
  HELPERS,
} from "../../scripts/nunjucks-runtime.mjs"
import { slotProp } from "../../src/component-api/frameworks"
import { createIdGenerator } from "../../src/utils/id"
import { apis, casesOf, partCasesOf, type Case } from "./component-cases"
import { normalize } from "./normalize"
import { contentOf } from "./renderers"

const TARGETS = ["Button", "Dialog", "DialogTitle", "Field", "Tabs", "TabsItem"]

const census = await nunjucksCensus()

const nameOf = (file: string) =>
  file
    .split("/")
    .at(-1)!
    .replace(/\.astro$/, "")

const COMPILED = census.compiled.map(nameOf)

const fileOf = (name: string) =>
  census.compiled.find((file) => nameOf(file) === name)!

const CASES = Object.values(apis)
  .flatMap((api) => [...casesOf(api), ...partCasesOf(api)])
  .filter((entry) => COMPILED.includes(entry.component))
  .toSorted((a, b) => a.component.localeCompare(b.component, "en"))

let templates: Record<string, string>
let renderer: Awaited<ReturnType<typeof createRenderer>>

beforeAll(async () => {
  templates = await nunjucksTemplates(census.compiled)
  renderer = await createRenderer()
}, 60_000)

afterAll(() => renderer?.close())

const renderNunjucks = (source: string, context = {}) =>
  createEnvironment(templates, { id: createIdGenerator() }).renderString(
    source,
    context,
  )

const renderAstro = (name: string, source: string, props = {}) =>
  renderer.renderSource(`tests/unit/.nunjucks/${name}.astro`, source, {
    locals: {
      $id: createIdGenerator(),
      framework: "astro",
      link: (path: string) => path,
    },
    props: { props },
  })

const astroCase = ({ component, props, slots }: Case) => {
  const content = JSON.stringify(contentOf(component))
  const children = slots
    .map((slot) =>
      slot === "default"
        ? `<Fragment set:html={${content}} />`
        : `<Fragment slot="${slot}" set:html={${content}} />`,
    )
    .join("")
  return renderAstro(
    `${component}.${slots.join(".") || "bare"}`,
    `---\nimport Component from "../../../${fileOf(component)}"\n\nconst { props } = Astro.props\n---\n\n<Component {...props}>${children}</Component>\n`,
    props,
  )
}

const nunjucksCase = ({ component, props, slots }: Case, template = "") => {
  const content = contentOf(component)
  const named = slots.filter((slot) => slot !== "default")
  const context = {
    content,
    props: {
      ...props,
      ...(named.length && {
        slots: Object.fromEntries(
          named.map((slot) => [slotProp(slot), content]),
        ),
      }),
    },
  }
  const source = slots.includes("default")
    ? `{% call ${component}(props) %}{{ content | safe }}{% endcall %}`
    : `{{ ${component}(props) }}`
  if (template) {
    return createEnvironment(
      { ...templates, [`opui/${component}.njk`]: template },
      { id: createIdGenerator() },
    ).renderString(
      `{% from "opui/${component}.njk" import ${component} %}${source}`,
      context,
    )
  }
  return renderNunjucks(
    `{% from "opui/${component}.njk" import ${component} %}${source}`,
    context,
  )
}

const UNDEFINED_CASES: Case[] = [
  ["Button", { type: undefined }],
  ["Button", { as: "a", disabled: true, href: "/" }],
  ["Button", { disabled: true }],
  ["Dialog", { "aria-labelledby": undefined }],
  ["Dialog", { "aria-label": "Settings" }],
  ["Dialog", { id: "settings" }],
  ["Field", { for: "email", label: "Email", startText: "To" }],
  ["Tabs", { name: "pets", role: "radiogroup" }],
  ["TabsItem", { checked: true, id: "cat", value: "cat" }],
].map(([component, props]) => ({
  component: component as string,
  name: JSON.stringify(props),
  props: props as Record<string, unknown>,
  slots: ["default"],
  types: {} as Case["types"],
}))

describe("every compiled macro renders what Astro renders", () => {
  test.each([...CASES, ...UNDEFINED_CASES])(
    "$component with $name",
    async (entry) => {
      expect(normalize(nunjucksCase(entry))).toBe(
        normalize(await astroCase(entry)),
      )
    },
  )

  test("a tampered macro renders differently, so the comparison catches a broken emitter", async () => {
    const [entry] = CASES.filter((item) => item.component === "Button")
    const tampered = templates["opui/Button.njk"].replace(
      '"ui-button"',
      '"ui-buttons"',
    )
    expect(tampered).not.toBe(templates["opui/Button.njk"])
    expect(normalize(nunjucksCase(entry, tampered))).not.toBe(
      normalize(await astroCase(entry)),
    )
  })
})

const COMPOSITIONS = [
  {
    astro: `<Tabs value="dog" aria-label="Pets"><TabsItem value="cat">Cat</TabsItem><TabsItem value="dog">Dog</TabsItem></Tabs>`,
    name: "Tabs with a value",
    nunjucks: `{% call Tabs({ value: "dog", "aria-label": "Pets" }) %}{% call TabsItem({ value: "cat" }) %}Cat{% endcall %}{% call TabsItem({ value: "dog" }) %}Dog{% endcall %}{% endcall %}`,
  },
  {
    astro: `<Tabs aria-label="Pets"><TabsItem value="cat" checked>Cat</TabsItem><TabsItem value="dog">Dog</TabsItem></Tabs><Tabs aria-label="Plants"><TabsItem>Fern</TabsItem></Tabs>`,
    name: "two Tabs without a name",
    nunjucks: `{% call Tabs({ "aria-label": "Pets" }) %}{% call TabsItem({ value: "cat", checked: true }) %}Cat{% endcall %}{% call TabsItem({ value: "dog" }) %}Dog{% endcall %}{% endcall %}{% call Tabs({ "aria-label": "Plants" }) %}{% call TabsItem() %}Fern{% endcall %}{% endcall %}`,
  },
  {
    astro: `<Dialog><DialogTitle>Settings</DialogTitle></Dialog>`,
    name: "Dialog with a DialogTitle",
    nunjucks: `{% call Dialog() %}{% call DialogTitle() %}Settings{% endcall %}{% endcall %}`,
  },
  {
    astro: `<Dialog id="settings"><DialogTitle>Settings</DialogTitle></Dialog>`,
    name: "Dialog with an id",
    nunjucks: `{% call Dialog({ id: "settings" }) %}{% call DialogTitle() %}Settings{% endcall %}{% endcall %}`,
  },
  {
    astro: `<Dialog aria-label="Settings"><DialogTitle id="title">Settings</DialogTitle></Dialog>`,
    name: "Dialog with an aria-label",
    nunjucks: `{% call Dialog({ "aria-label": "Settings" }) %}{% call DialogTitle({ id: "title" }) %}Settings{% endcall %}{% endcall %}`,
  },
  {
    astro: `<Field for="email" label="Email"><Fragment slot="start" set:html={"<b>@</b>"} /><Fragment slot="label" set:html={" <i>Work</i> "} /><input id="email"></Field>`,
    name: "Field with named slots",
    nunjucks: `{% set start %}<b>@</b>{% endset %}{% set label %} <i>Work</i> {% endset %}{% call Field({ for: "email", label: "Email", slots: { start: start, label: label } }) %}<input id="email">{% endcall %}`,
  },
]

describe("compositions render what Astro renders", () => {
  test.each(COMPOSITIONS)("$name", async ({ astro, name, nunjucks }) => {
    const imports = TARGETS.map(
      (target) => `import ${target} from "../../../${fileOf(target)}"`,
    ).join("\n")
    const expected = await renderAstro(
      `composition-${name.replace(/\W+/g, "-")}`,
      `---\n${imports}\n---\n\n${astro}\n`,
    )
    const macros = TARGETS.map(
      (target) => `{% from "opui/${target}.njk" import ${target} %}`,
    ).join("")
    expect(normalize(renderNunjucks(`${macros}${nunjucks}`))).toBe(
      normalize(expected),
    )
  })
})

describe("opui.attrs writes what Astro writes", () => {
  const KEYS = [
    "class",
    "class:list",
    "className",
    "data-x",
    "disabled",
    "download",
    "hidden",
    "popover",
    "set:html",
    "style",
    'x"y',
  ]
  const VALUES = [
    "",
    'a&b"c<d>',
    "auto",
    0,
    1,
    ["a", { b: true, c: false }],
    false,
    null,
    true,
    undefined,
    { "--x": "1", fontSize: "2px", gap: 3, margin: "" },
  ]
  const runtime = createRuntime()
  const rows = KEYS.flatMap((key) => VALUES.map((value) => ({ key, value })))

  test.each(rows)("$key = $value", ({ key, value }) => {
    const part = { [key]: value }
    expect(String(runtime.attrs(part))).toBe(
      String(spreadAttributes({ ...part })),
    )
    for (const tag of ["div", "x-el"]) {
      expect(String(runtime.elementAttrs(tag, part))).toBe(
        String(spreadAttributes({ ...part }, tag)),
      )
    }
  })
})

describe("the expression translator", () => {
  const LOCALS = ["a", "b", "c"]
  const scope = {
    file: "Sample.astro",
    helpers: new Set(Object.keys(HELPERS)),
    locals: new Set(LOCALS),
  }
  const EXPRESSIONS = [
    "!(a && b)",
    "!a",
    "-1",
    "[a, b]",
    "`${a}-${b}x`",
    "`ui-${a}`",
    "a !== 'x'",
    "a && !b || c",
    "a && b",
    "a ? b : c",
    "a ? undefined : 'x'",
    "a + 1",
    "a == null",
    "a === b",
    "a ?? b",
    "a || b",
    "a?.b ?? c",
    "a?.length",
    "Boolean(a || b)",
    'cx(["x", { y: a }, b && `z-${b}`])',
    "null",
    "String(a)",
    "undefined",
    "{ x: a, 'y-z': { w: b } }",
  ]
  const VALUES = [
    undefined,
    null,
    "",
    "x",
    0,
    1,
    true,
    false,
    ["x"],
    { b: "q" },
  ]
  const env = createEnvironment({})
  let captured: unknown
  env.addGlobal("capture", (value: unknown) => {
    captured = value
    return ""
  })

  test.each(EXPRESSIONS)("%s evaluates as in JavaScript", (code) => {
    const translated = nunjucksExpression(code, scope)
    for (const a of VALUES) {
      for (const b of [undefined, "", "y", 0]) {
        for (const c of [null, "z"]) {
          const expected = new Function(...LOCALS, "cx", `return (${code})`)(
            a,
            b,
            c,
            HELPERS.cx,
          )
          captured = Symbol("unset")
          env.renderString(`{{ capture(${translated}) }}`, { a, b, c })
          expect(
            captured,
            `${translated} with ${JSON.stringify({ a, b, c })}`,
          ).toStrictEqual(expected)
        }
      }
    }
  })

  test.each([
    ["a.map((x) => x)", "a function"],
    ["{ ...a }", "an object spread"],
    ["typeof a", "TypeOfExpression"],
    ["Math.max(a, b)", "the global Math"],
    ["(a || b) ?? c", "?? after an expression that isn't a name"],
    ["a?.()", "an optional call"],
    ["0x10", "a number Nunjucks can't read"],
  ])("refuses %s as %s", (code, what) => {
    expect(() => nunjucksExpression(code, scope)).toThrow(
      expect.objectContaining({
        code: "BC701",
        message: expect.stringContaining(`Sample.astro uses ${what} in \``),
      }),
    )
  })

  test("refuses a helper the runtime doesn't register", () => {
    expect(() =>
      nunjucksExpression("pick(a)", { ...scope, imports: new Set(["pick"]) }),
    ).toThrow(
      expect.objectContaining({
        code: "BC702",
        message: expect.stringContaining("Sample.astro uses the helper pick"),
      }),
    )
  })
})

const FRONTMATTER = 'import type { Props } from "./types.astro"\n'

describe("the emitter refuses what it can't write", () => {
  test.each([
    [
      "BC703",
      `---\n${FRONTMATTER}import { tabsContext } from "./context.astro"\nconst { ...rest } = Astro.props\nconst html = await tabsContext.provide({ rest }, () => Astro.slots.render("start"))\n---\n\n<div {...rest}><Fragment set:html={html} /></div>\n`,
      "a context provided around the slot start",
    ],
    [
      "BC704",
      `---\n${FRONTMATTER}import Button from "../Button/Button.astro"\nconst { ...rest } = Astro.props\n---\n\n<div {...rest}><Button>Save</Button></div>\n`,
      "the component Button",
    ],
    [
      "BC705",
      `---\n${FRONTMATTER}const { value, ...rest } = Astro.props\nconst loop = value || "x"\n---\n\n<div {...rest}>{loop}</div>\n`,
      "the name loop",
    ],
  ])("%s", async (code, source, what) => {
    await expect(
      compileNunjucks(source, "packages/opui/components/Tabs/Sample.astro"),
    ).rejects.toThrow(
      expect.objectContaining({
        code,
        message: expect.stringContaining(
          `packages/opui/components/Tabs/Sample.astro uses ${what}, which scripts/component-nunjucks.mjs can't compile`,
        ),
      }),
    )
  })
})

test("the census compiles or refuses every component, and compiles the six targets", async () => {
  const { compiled, refused } = census
  expect([...compiled, ...refused.map(({ file }) => file)].toSorted()).toEqual(
    await componentFiles(),
  )
  expect(refused.filter(({ code }) => !(code in DIAGNOSTICS))).toEqual([])
  expect(COMPILED).toEqual(expect.arrayContaining(TARGETS))
  expect(
    COMPILED.filter((name) => !CASES.some((entry) => entry.component === name)),
  ).toEqual([])
})
