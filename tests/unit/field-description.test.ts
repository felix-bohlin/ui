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
  "../../packages/opui/components/*/*.{astro,react.tsx,svelte,vue}",
  { import: "default" },
)

const PARTS = { bottom: "B", end: "N", start: "T", top: "P" }

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
  ...["Select", "TextField", "Textarea"].map((name) => ({
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
})

describe("TextField password toggle", () => {
  const toggle = { ...NAMING, passwordToggle: true, type: "password" }

  test.each(FRAMEWORKS)(
    "%s: the toggle stays out of the description on its own",
    async (framework) => {
      const { all, control } = await renderField(
        "TextField",
        framework,
        toggle,
        {},
      )
      expect(attribute(control, "aria-describedby")).toBe("outside")
      expect(
        all.find((el) => attribute(el, "commandfor") === "x")?.tagName,
      ).toBe("button")
    },
  )

  test.each(FRAMEWORKS)(
    "%s: with an end slot, the end part describes the control",
    async (framework) => {
      const { byId, control } = await renderField(
        "TextField",
        framework,
        toggle,
        { end: PARTS.end },
      )
      expect(attribute(control, "aria-describedby")).toBe("x-end outside")
      expect(
        elements(byId("x-end")!).some(
          (el) => attribute(el, "commandfor") === "x",
        ),
      ).toBe(true)
    },
  )
})
