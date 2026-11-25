import { readFileSync } from "node:fs"
import { spreadAttributes } from "astro/runtime/server/index.js"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import { createRenderer } from "../../scripts/build-examples.mjs"
import { nunjucksExpression } from "../../scripts/component-nunjucks-expression.mjs"
import { readComponent } from "../../scripts/component-reader.mjs"
import { formatCode } from "../../scripts/format.mjs"
import {
  compileNunjucks,
  componentFiles,
  nunjucksCensus,
  nunjucksTemplates,
} from "../../scripts/component-nunjucks.mjs"
import {
  createEnvironment,
  FILTERS,
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
  {
    astro: `<Rating label="Quality" name="quality" value={3} />`,
    name: "Rating with a name and a value",
    nunjucks: `{{ Rating({ label: "Quality", name: "quality", value: 3 }) }}`,
  },
  {
    astro: `<Rating label="Quality" max="3" name="quality" required value="2" />`,
    name: "Rating that is required, with string numbers",
    nunjucks: `{{ Rating({ label: "Quality", max: "3", name: "quality", required: true, value: "2" }) }}`,
  },
  {
    astro: `<Rating label="Quality" value={4} /><Rating label="Unrated" max="many" />`,
    name: "Rating as a meter",
    nunjucks: `{{ Rating({ label: "Quality", value: 4 }) }}{{ Rating({ label: "Unrated", max: "many" }) }}`,
  },
  {
    astro: `<Reactions aria-label="Reactions" items={[{ "aria-label": "Thumbs up", checked: true, label: "Up", value: "up" }, { "aria-label": "Heart", label: "Heart", value: "heart" }]} quick={{ "aria-label": "Thumbs up", label: "Up", value: "up" }} />`,
    name: "Reactions with a quick reaction among the items",
    nunjucks: `{{ Reactions({ "aria-label": "Reactions", items: [{ "aria-label": "Thumbs up", checked: true, label: "Up", value: "up" }, { "aria-label": "Heart", label: "Heart", value: "heart" }], quick: { "aria-label": "Thumbs up", label: "Up", value: "up" } }) }}`,
  },
  {
    astro: `<Reactions aria-labelledby="reactions" items={[{ "aria-label": "Heart", label: "Heart", value: "heart" }]} name="post" quick={{ "aria-label": "Party", label: "Party", value: "party" }}><p id="reactions">React</p></Reactions>`,
    name: "Reactions with a new quick reaction",
    nunjucks: `{% call Reactions({ "aria-labelledby": "reactions", items: [{ "aria-label": "Heart", label: "Heart", value: "heart" }], name: "post", quick: { "aria-label": "Party", label: "Party", value: "party" } }) %}<p id="reactions">React</p>{% endcall %}`,
  },
  {
    astro: `<Stepper current={1} items={[{ label: "Cart", state: "complete" }, { description: "Address and method", label: "Shipping" }, { href: "/pay", label: "Pay", state: "error" }]} />`,
    name: "Stepper with items",
    nunjucks: `{{ Stepper({ current: 1, items: [{ label: "Cart", state: "complete" }, { description: "Address and method", label: "Shipping" }, { href: "/pay", label: "Pay", state: "error" }] }) }}`,
  },
  {
    astro: `<Timeline items={[{ description: "Paid by card", label: "Ordered", time: "Monday" }, { current: true, label: "Shipped" }]} tracked />`,
    name: "Timeline with items",
    nunjucks: `{{ Timeline({ items: [{ description: "Paid by card", label: "Ordered", time: "Monday" }, { current: true, label: "Shipped" }], tracked: true }) }}`,
  },
  {
    astro: `<FileUpload description="Up to 5 MB" items={[{ label: "beach.png", state: "complete", value: "a" }, { label: "dunes.png", progress: 40, state: "uploading", value: "b" }, { label: "pier.png", state: "queued", value: "c" }, { description: "Too large", label: "map.png", state: "error", value: "d" }]} label="Add photos" multiple />`,
    name: "FileUpload with an item in each state",
    nunjucks: `{{ FileUpload({ description: "Up to 5 MB", items: [{ label: "beach.png", state: "complete", value: "a" }, { label: "dunes.png", progress: 40, state: "uploading", value: "b" }, { label: "pier.png", state: "queued", value: "c" }, { description: "Too large", label: "map.png", state: "error", value: "d" }], label: "Add photos", multiple: true }) }}`,
  },
  {
    astro: `<Menu id="actions" items={[{ label: "Edit", shortcut: "E" }, { href: "/open", label: "Open" }, { "data-action": "copy", keepOpen: true, label: "Copy" }, { borderTop: true, color: "critical", label: "Delete" }, { disabled: true, href: "/archive", label: "Archive" }]} />`,
    name: "Menu with items",
    nunjucks: `{{ Menu({ id: "actions", items: [{ label: "Edit", shortcut: "E" }, { href: "/open", label: "Open" }, { "data-action": "copy", keepOpen: true, label: "Copy" }, { borderTop: true, color: "critical", label: "Delete" }, { disabled: true, href: "/archive", label: "Archive" }] }) }}`,
  },
  {
    astro: `<Badge color="critical" label="3 new"><button>Inbox</button><Fragment slot="indicator">3</Fragment></Badge><Badge dot label="Online"><span>Ada</span></Badge>`,
    name: "Badge with an indicator and as a dot",
    nunjucks: `{% set indicator %}3{% endset %}{% call Badge({ color: "critical", label: "3 new", slots: { indicator: indicator } }) %}<button>Inbox</button>{% endcall %}{% call Badge({ dot: true, label: "Online" }) %}<span>Ada</span>{% endcall %}`,
  },
  {
    astro: `<Tooltip arrow id="save-tip">Saves the draft</Tooltip>`,
    name: "Tooltip",
    nunjucks: `{% call Tooltip({ arrow: true, id: "save-tip" }) %}Saves the draft{% endcall %}`,
  },
  {
    astro: `<Callout closeButton closeLabel="Dismiss" severity="info"><p>Saved</p><Fragment slot="close-icon"><b>x</b></Fragment></Callout><Callout closeButton><p>Sent</p></Callout>`,
    name: "Callout with a close button",
    nunjucks: `{% set closeIcon %}<b>x</b>{% endset %}{% call Callout({ closeButton: true, closeLabel: "Dismiss", severity: "info", slots: { closeIcon: closeIcon } }) %}<p>Saved</p>{% endcall %}{% call Callout({ closeButton: true }) %}<p>Sent</p>{% endcall %}`,
  },
  {
    astro: `<Dialog id="settings"><DialogHeader closeButton><DialogTitle>Settings</DialogTitle></DialogHeader></Dialog>`,
    name: "Dialog with a closing header",
    nunjucks: `{% call Dialog({ id: "settings" }) %}{% call DialogHeader({ closeButton: true }) %}{% call DialogTitle() %}Settings{% endcall %}{% endcall %}{% endcall %}`,
  },
]

describe("compositions render what Astro renders", () => {
  test.each(COMPOSITIONS)("$name", async ({ astro, name, nunjucks }) => {
    const used = [
      ...new Set([...astro.matchAll(/<([A-Z]\w*)/g)].map(([, tag]) => tag)),
    ].filter((tag) => tag !== "Fragment")
    const imports = used
      .map((target) => `import ${target} from "../../../${fileOf(target)}"`)
      .join("\n")
    const expected = await renderAstro(
      `composition-${name.replace(/\W+/g, "-")}`,
      `---\n${imports}\n---\n\n${astro}\n`,
    )
    const macros = used
      .map((target) => `{% from "opui/${target}.njk" import ${target} %}`)
      .join("")
    expect(normalize(renderNunjucks(`${macros}${nunjucks}`))).toBe(
      normalize(expected),
    )
  })
})

describe("opuiAttributes writes what Astro writes", () => {
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
  const rows = KEYS.flatMap((key) => VALUES.map((value) => ({ key, value })))

  test.each(rows)("$key = $value", ({ key, value }) => {
    const part = { [key]: value }
    expect(String(FILTERS.opuiAttributes(part))).toBe(
      String(spreadAttributes({ ...part })),
    )
    for (const tag of ["div", "x-el"]) {
      expect(String(FILTERS.opuiAttributes(part, tag))).toBe(
        String(spreadAttributes({ ...part }, tag)),
      )
    }
  })
})

describe("the expression translator", () => {
  const LOCALS = ["a", "b", "c", "index", "size"]
  const scope = {
    file: "Sample.astro",
    helpers: new Set(Object.keys(HELPERS)),
    locals: new Set(LOCALS),
    numbers: new Set(["index"]),
    strings: new Set(["size"]),
  }
  const EXPRESSIONS = [
    "!(a && b)",
    "!a",
    "!a === b",
    "(a ? b : c) || a",
    "(a || b) && c",
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
    "a + b - c",
    "a - (b + c)",
    "a == null",
    "a === b",
    "a === null",
    "a === undefined",
    "a !== null",
    "a !== undefined",
    "a ?? b",
    "a || (b && c)",
    "a || b",
    "a?.b ?? c",
    "a?.length",
    "Boolean(a || b)",
    'cx(["x", { y: a }, b && `z-${b}`])',
    "null",
    "String(a)",
    "index === 0",
    "size !== 'medium'",
    "size === 'medium' && `ui-${size}`",
    "undefined",
    "{ ...a, x: b }",
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
          for (const index of [0, 1]) {
            for (const size of [undefined, "medium", "small"]) {
              const values = { a, b, c, index, size }
              const expected = new Function(
                ...LOCALS,
                "cx",
                `return (${code})`,
              )(a, b, c, index, size, HELPERS.cx)
              captured = Symbol("unset")
              env.renderString(`{{ capture(${translated}) }}`, values)
              expect(
                captured,
                `${translated} with ${JSON.stringify(values)}`,
              ).toStrictEqual(expected)
            }
          }
        }
      }
    }
  })

  test.each([
    ["a.map((x) => x)", "a function"],
    ["[...a]", "an array spread"],
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
      `---\n${FRONTMATTER}import Button from "../Button/Button.astro"\nconst { ...rest } = Astro.props\n---\n\n<div {...rest}><Button><span slot="icon">+</span>Add</Button></div>\n`,
      "a named slot passed to Button",
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

test("the census compiles every component", async () => {
  const { compiled, refused } = census
  expect([...compiled, ...refused.map(({ file }) => file)].toSorted()).toEqual(
    await componentFiles(),
  )
  expect(refused).toEqual([])
  expect(COMPILED).toEqual(expect.arrayContaining(TARGETS))
  expect(
    COMPILED.filter((name) => !CASES.some((entry) => entry.component === name)),
  ).toEqual([])
})

describe("the macros", () => {
  test.each([
    "Button",
    "Callout",
    "Dialog",
    "Field",
    "Tabs",
    "TabsItem",
    "Timeline",
  ])("%s matches its snapshot", async (name) => {
    await expect(templates[`opui/${name}.njk`]).toMatchFileSnapshot(
      `./nunjucks-macros/${name}.njk`,
    )
  })

  test.each(census.compiled)(
    "%s compiles to the same macro formatted at printWidth 40 and 200",
    async (file) => {
      const source = readFileSync(file, "utf8")
      const [narrow, wide] = await Promise.all(
        [40, 200].map(async (printWidth) =>
          compileNunjucks(await formatCode(source, file, { printWidth }), file),
        ),
      )
      expect(narrow).toBe(wide)
    },
  )

  const unregistered = (imports: string[]) =>
    imports.flatMap((line) =>
      (/\{([^}]*)\}/.exec(line)?.[1].split(",") ?? [])
        .map((name) => name.trim().split(/\s+as\s+/)[0])
        .filter((name) => name && !(name in HELPERS)),
    )

  test("the runtime registers every helper a component imports", async () => {
    expect(unregistered(['import { nope, cx } from "../style"'])).toEqual([
      "nope",
    ])
    const missing = []
    for (const file of census.compiled) {
      const { imports } = await readComponent(readFileSync(file, "utf8"), file)
      missing.push(...unregistered(imports).map((name) => `${file}: ${name}`))
    }
    expect(missing).toEqual([])
  })
})
