import { parseFragment, type DefaultTreeAdapterMap } from "parse5"
import { describe, expect, test } from "vitest"
import {
  type ComponentFramework,
  frameworks,
} from "../../src/component-api/frameworks"
import { render, type Slots } from "./renderers"

type Element = DefaultTreeAdapterMap["element"]
type Node = DefaultTreeAdapterMap["childNode"] | Element

const components = import.meta.glob<unknown>(
  "../../packages/opui/components/*/*.{astro,react.tsx,solid.tsx,svelte,vue}",
  { import: "default" },
)

const PARTS = { bottom: "B", end: "N", start: "T", top: "P" }

const DRAWN = ["top", "start", "control", "end", "bottom"]

const NAMING = {
  "aria-describedby": "outside",
  "aria-labelledby": "elsewhere",
  id: "x",
  label: "L",
}

const cases: {
  describedBy: string[]
  name: string
  props: Record<string, unknown>
  slots: Slots
}[] = [
  {
    describedBy: ["x-start-text", "x-end-text"],
    name: "NumberField",
    props: { endText: "E", startText: "S" },
    slots: {},
  },
  {
    describedBy: ["x-end-text"],
    name: "OneTimeCode",
    props: { endText: "E" },
    slots: {},
  },
  ...["Select", "Textarea"].map((name) => ({
    describedBy: [
      "x-start-text",
      "x-top",
      "x-start",
      "x-end",
      "x-bottom",
      "x-end-text",
    ],
    name,
    props: {
      endText: "E",
      startText: "S",
      ...(name === "Select" && { items: [{ label: "A", value: "a" }] }),
    },
    slots: PARTS,
  })),
]

const elements = (node: Node): Element[] =>
  "childNodes" in node
    ? [
        ...("tagName" in node ? [node as Element] : []),
        ...node.childNodes.flatMap((child) => elements(child as Node)),
      ]
    : []

const attribute = (element: Element | undefined, name: string) =>
  element?.attrs.find((attr) => attr.name === name)?.value

const renderField = async (
  name: string,
  framework: ComponentFramework,
  props: Record<string, unknown>,
  slots: Slots,
) => {
  const component =
    await components[
      `../../packages/opui/components/${name}/${frameworks[framework].component(name)}`
    ]()
  const html = await render[framework](component, props, slots)
  const all = elements(parseFragment(html) as unknown as Node)
  const byId = (id: string) => all.find((el) => attribute(el, "id") === id)
  return { all, byId, control: byId("x") }
}

const FRAMEWORKS = Object.keys(render) as ComponentFramework[]

describe.each(cases)("$name", ({ describedBy, name, props, slots }) => {
  test.each(FRAMEWORKS)(
    "%s: the label names the control, and its parts describe it in visual order",
    async (framework) => {
      const { all, byId, control } = await renderField(
        name,
        framework,
        { ...props, ...NAMING },
        slots,
      )
      expect(["input", "select", "textarea"]).toContain(control?.tagName)
      expect(
        all.filter(
          (el) => el.tagName === "label" && attribute(el, "for") === "x",
        ),
      ).toHaveLength(1)
      expect(attribute(control, "aria-labelledby")).toBe("elsewhere")
      expect(attribute(control, "aria-describedby")?.split(" ")).toEqual([
        ...describedBy,
        "outside",
      ])
      expect(describedBy.filter((id) => !byId(id))).toEqual([])
    },
  )

  test.each(FRAMEWORKS)(
    "%s: the field's parts come in the order they're drawn",
    async (framework) => {
      const { all } = await renderField(name, framework, props, slots)
      const field = all.find((el) => attribute(el, "class") === "ui-field")!
      const parts = field.childNodes
        .filter((node): node is Element => "tagName" in node)
        .map((el) =>
          ["input", "select", "textarea"].includes(el.tagName)
            ? "control"
            : attribute(el, "class")!.replace("ui-", ""),
        )
      expect(parts).toEqual(DRAWN.filter((part) => parts.includes(part)))
      expect(parts).toContain("control")
    },
  )
})

const TEXT_FIELD_PARTS = [
  "x-start-text",
  "x-top",
  "x-start",
  "x-end",
  "x-bottom",
  "x-end-text",
]

const textField = (
  framework: ComponentFramework,
  props: Record<string, unknown>,
  slots: Slots,
) =>
  renderField(
    "TextField",
    framework,
    {
      [framework === "react" ? "htmlFor" : "for"]: "x",
      label: "L",
      ...props,
    },
    {
      default: `<input aria-describedby="${[...TEXT_FIELD_PARTS, "outside"].join(" ")}" id="x">`,
      ...slots,
    },
  )

describe("TextField", () => {
  test.each(FRAMEWORKS)(
    "%s: the label points at the input from for, and each part has the id the input's description names",
    async (framework) => {
      const { all, byId, control } = await textField(
        framework,
        { endText: "E", startText: "S" },
        PARTS,
      )
      expect(control?.tagName).toBe("input")
      expect(
        all.filter(
          (el) => el.tagName === "label" && attribute(el, "for") === "x",
        ),
      ).toHaveLength(1)
      expect(TEXT_FIELD_PARTS.filter((id) => !byId(id))).toEqual([])
    },
  )

  test.each(FRAMEWORKS)(
    "%s: the field's parts come in the order they're drawn",
    async (framework) => {
      const { all } = await textField(framework, {}, PARTS)
      const field = all.find((el) => attribute(el, "class") === "ui-field")!
      const parts = field.childNodes
        .filter((node): node is Element => "tagName" in node)
        .map((el) =>
          el.tagName === "input"
            ? "control"
            : attribute(el, "class")!.replace("ui-", ""),
        )
      expect(parts).toEqual(DRAWN)
    },
  )
})

describe("TextField password toggle", () => {
  test.each(FRAMEWORKS)(
    "%s: the toggle points at the input and has no part id on its own",
    async (framework) => {
      const { all, byId } = await textField(
        framework,
        { passwordToggle: true },
        {},
      )
      expect(
        all.find((el) => attribute(el, "commandfor") === "x")?.tagName,
      ).toBe("button")
      expect(byId("x-end")).toBeUndefined()
    },
  )

  test.each(FRAMEWORKS)(
    "%s: with an end slot, the end part holds the toggle",
    async (framework) => {
      const { byId } = await textField(
        framework,
        { passwordToggle: true },
        { end: PARTS.end },
      )
      expect(
        elements(byId("x-end")!).some(
          (el) => attribute(el, "commandfor") === "x",
        ),
      ).toBe(true)
    },
  )
})
