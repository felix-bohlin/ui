import { readFileSync } from "node:fs"
import { beforeAll, describe, expect, test } from "vitest"
import {
  allValues,
  scriptValues,
  valuesIn,
} from "../../scripts/component-analysis.mjs"
import { loadApis, readComponent } from "../../scripts/component-reader.mjs"

type Reads = {
  contexts: string[]
  derived: string[]
  loop: string[]
  names: Map<string, number>
  props: string[]
  rest: boolean
  slots: string[]
}

type Value = {
  code: string
  name?: string
  newEachRender?: boolean
  reads: Reads
  readsSlot: boolean
  staticTag?: string
}

type TemplateNode = {
  attributes?: (Value & { kind: string; name?: string })[]
  children?: TemplateNode[]
  consts?: Value[]
  declares?: string[]
  reads?: Reads
  readsSlot?: boolean
  tag?: string
  type: string
}

const file = "packages/opui/components/Sample/Sample.astro"

const read = async (frontmatter: string, body: string) =>
  readComponent(
    `---\nimport type { Props } from "./types.astro"\n${frontmatter}\n---\n\n${body}\n`,
    file,
  )

const derivedNamed = (
  component: Awaited<ReturnType<typeof readComponent>>,
  name: string,
) => component.derived.find((value: Value) => value.name === name) as Value

const readsOf = ({ names, ...reads }: Reads) => ({
  ...reads,
  names: Object.fromEntries(names),
})

const eachIn = (nodes: TemplateNode[]): TemplateNode[] =>
  nodes.flatMap((node) => [
    ...(node.type === "each" ? [node] : []),
    ...eachIn(node.children ?? []),
  ])

beforeAll(async () => {
  await loadApis()
})

describe("what a value reads", () => {
  test("a derived value reads props, context reads, rest, slots and other consts, and an id base reads base", async () => {
    const component = await read(
      'import { fieldGroupContext } from "../FieldGroup/context.astro"\nimport { createIds } from "../id"\nimport { trimEdges } from "../whitespace"\n\nconst { class: className, id, label, ...rest } = Astro.props\n\nconst ids = createIds(Astro.locals, "sample", id)\nconst field = fieldGroupContext.get()\nconst labelSlot = Astro.slots.has("label")\n  ? trimEdges(await Astro.slots.render("label"))\n  : ""\nconst hasIcon = Astro.slots.has("icon")\nconst named = label || field?.name || rest.title\nconst labelled = named && (hasIcon || labelSlot)\nconst titleId = ids("title")',
      '<div class:list={["ui-sample", className]} aria-labelledby={titleId} data-labelled={labelled} {...rest}>\n  <slot name="icon" />\n  {labelSlot}\n</div>',
    )
    expect(readsOf(derivedNamed(component, "named").reads)).toEqual({
      contexts: ["field"],
      derived: [],
      loop: [],
      names: { field: 1, label: 1, rest: 1 },
      props: ["label"],
      rest: true,
      slots: [],
    })
    expect(derivedNamed(component, "hasIcon").reads.slots).toEqual(["icon"])
    expect(derivedNamed(component, "labelled").reads).toMatchObject({
      derived: ["named", "hasIcon"],
      slots: ["label"],
    })
    expect(derivedNamed(component, "titleId").reads.derived).toEqual(["base"])
  })

  test("a value reads a slot itself or through a const that does, and a provided value carries the same facts", async () => {
    const component = await read(
      'import { sampleContext } from "./context.astro"\n\nconst { class: className, label, ...rest } = Astro.props\n\nconst hasLabel = Boolean(label || Astro.slots.has("label"))\nconst labelled = hasLabel ? "true" : undefined\nconst size = label ? "large" : "small"\nconst html = await sampleContext.provide({ labelled, size }, () =>\n  Astro.slots.render("default"),\n)',
      '<div class:list={["ui-sample", className]} {...rest}>\n  <slot name="label" />\n  <Fragment set:html={html} />\n</div>',
    )
    expect(
      component.derived.map(({ name, readsSlot }: Value) => [name, readsSlot]),
    ).toEqual([
      ["hasLabel", true],
      ["labelled", true],
      ["size", false],
    ])
    expect(
      component.provide.value.map(
        ({ key, readsSlot }: Value & { key: string }) => [key, readsSlot],
      ),
    ).toEqual([
      ["labelled", true],
      ["size", false],
    ])
  })

  test("a const is new on every render when it is a function, an object or an array, also behind a condition or another const, and a call is not", async () => {
    const component = await read(
      'const { class: className, name, ...rest } = Astro.props\n\nconst onPick = () => name\nconst box = { name }\nconst list = name ? [name] : undefined\nconst alias = box\nconst label = name || "sample"\nconst called = String(name)',
      '<div class:list={["ui-sample", className]} data-label={label} {...rest} />',
    )
    expect(
      component.derived.map(({ name, newEachRender }: Value) => [
        name,
        newEachRender,
      ]),
    ).toEqual([
      ["onPick", true],
      ["box", true],
      ["list", true],
      ["alias", true],
      ["label", false],
      ["called", false],
    ])
  })

  test("a const that is one tag name is a static tag", async () => {
    const component = await read(
      'const { class: className, href, ...rest } = Astro.props\n\nconst Content = "selectedcontent"\nconst Tag = href ? "a" : "span"',
      '<Tag class:list={["ui-sample", className]} {...rest}>\n  <Content />\n</Tag>',
    )
    expect(derivedNamed(component, "Content").staticTag).toBe("selectedcontent")
    expect(derivedNamed(component, "Tag").staticTag).toBe(undefined)
  })

  test("a loop declares its item's names, its index and its consts, and its list, consts and content read the names of the loops around them", async () => {
    const component = await read(
      "const { class: className, groups, ...rest } = Astro.props",
      '<ul class:list={["ui-sample", className]} {...rest}>\n  {groups.map(({ items, label }) => <li>{items.map((entry) => {\n    const both = label + entry\n    return <span title={both}>{entry}</span>\n  })}</li>)}\n</ul>',
    )
    const [outer, inner] = eachIn(component.tree)
    expect(outer?.declares).toEqual(["items", "label", "index"])
    expect(inner?.declares).toEqual(["entry", "index", "both"])
    expect(inner?.reads?.loop).toEqual(["items"])
    expect(inner?.consts?.[0]?.reads.loop).toEqual(["label", "entry"])
    const span = inner?.children?.find((node) => node.type === "element")
    expect(span?.attributes?.[0]?.reads.loop).toEqual(["both"])
  })

  test("the values of a component list every code in source order, the script's after the template's", async () => {
    const component = await read(
      'import { warnMissingId } from "../dev"\n\nconst { class: className, id, ...rest } = Astro.props\n\nconst label = id ? "Labelled" : undefined\nwarnMissingId("Sample", id)',
      '<div class:list={["ui-sample", className]} title={label} {...rest}>{label}</div>',
    )
    expect(valuesIn(component.tree).map(({ code }: Value) => code)).toEqual([
      '["ui-sample", className]',
      "label",
      "rest",
      "label",
    ])
    expect(scriptValues(component).map(({ code }: Value) => code)).toEqual([
      'id ? "Labelled" : undefined',
      'warnMissingId("Sample", id)',
    ])
    expect(allValues(component)).toHaveLength(6)
    expect(component.warnings[0].reads.props).toEqual(["id"])
  })
})

describe("what a component declares and renders", () => {
  test("declared names the props, consts, context reads, imports and components of the source", async () => {
    const component = await read(
      'import Button from "../Button/Button.astro"\nimport { fieldGroupContext } from "../FieldGroup/context.astro"\nimport { autoLabelledBy } from "../id"\n\nconst { class: className, label: text, ...rest } = Astro.props\n\nconst field = fieldGroupContext.get()\nconst labelledBy = autoLabelledBy(rest, field?.name)',
      '<div class:list={["ui-sample", className]} aria-labelledby={labelledBy} {...rest}>\n  <Button>{text}</Button>\n</div>',
    )
    expect([...component.declared].toSorted()).toEqual([
      "Button",
      "autoLabelledBy",
      "className",
      "field",
      "labelledBy",
      "text",
    ])
  })

  test("a string slot pairs the prop with the slot of its name", async () => {
    const component = await read(
      "const { class: className, endText, label, ...rest } = Astro.props",
      '<div class:list={["ui-sample", className]} {...rest}>\n  {label}<slot name="label" />\n  {endText}<slot name="end-text" />\n</div>',
    )
    expect(component.stringSlots).toEqual([
      { local: "endText", prop: "endText", slot: "end-text" },
      { local: "label", prop: "label", slot: "label" },
    ])
  })

  test("a custom element root is custom for the ports and the types, and a tag that can be one only for the ports", async () => {
    const custom = await read(
      "const { class: className, ...rest } = Astro.props",
      '<opui-sample class:list={["ui-sample", className]} {...rest}>\n  <slot />\n</opui-sample>',
    )
    expect([...custom.customRoots]).toEqual([
      [custom.rootElements[0], undefined],
    ])
    expect(custom.customTag).toBe("opui-sample")
    const callout = await readComponent(
      readFileSync("packages/opui/components/Callout/Callout.astro", "utf8"),
      "packages/opui/components/Callout/Callout.astro",
    )
    expect([...callout.customRoots]).toEqual([
      [callout.rootElements[0], "Root"],
    ])
    expect(callout.customTag).toBe(undefined)
    const plain = await read(
      "const { class: className, ...rest } = Astro.props",
      '<section class:list={["ui-sample", className]} {...rest}>\n  <slot />\n</section>',
    )
    expect(plain.customRoots.size).toBe(0)
    expect(plain.customTag).toBe(undefined)
  })
})
