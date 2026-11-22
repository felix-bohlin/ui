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
  folder = name,
) => {
  const component =
    await components[
      `../../packages/opui/components/${folder}/${frameworks[framework].component(name)}`
    ]()
  const html = await render[framework](component, props, slots)
  const all = elements(parseFragment(html) as unknown as Node)
  const byId = (id: string) => all.find((el) => attribute(el, "id") === id)
  return { all, byId }
}

const FRAMEWORKS = Object.keys(render) as ComponentFramework[]

const BOXED = ["start-text", "top", "start", "end", "bottom", "end-text"]

const OWN_CONTROL = [
  {
    control: '<input id="x">',
    drawn: ["control"],
    name: "OneTimeCode",
    parts: ["end-text"],
    props: { endText: "E" },
    slots: {},
    tag: "input",
  },
  ...(["input", "select", "textarea"] as const).map((tag) => ({
    control: tag === "input" ? '<input id="x">' : `<${tag} id="x"></${tag}>`,
    drawn: DRAWN,
    name: "Field",
    parts: BOXED,
    props: { endText: "E", startText: "S" },
    slots: PARTS,
    tag,
  })),
]

const ownField = (
  name: string,
  framework: ComponentFramework,
  props: Record<string, unknown>,
  slots: Slots,
) =>
  renderField(
    name,
    framework,
    {
      [framework === "react" ? "htmlFor" : "for"]: "x",
      label: "L",
      ...props,
    },
    slots,
  )

describe.each(OWN_CONTROL)(
  "$name with $tag",
  ({ control, drawn, name, parts, props, slots, tag }) => {
    test.each(FRAMEWORKS)(
      "%s: the label points at the control from for, and each part has the id the control's description names",
      async (framework) => {
        const { all, byId } = await ownField(name, framework, props, {
          default: control,
          ...slots,
        })
        expect(byId("x")?.tagName).toBe(tag)
        expect(
          all.filter(
            (el) => el.tagName === "label" && attribute(el, "for") === "x",
          ),
        ).toHaveLength(1)
        expect(
          parts.map((part) => `x-${part}`).filter((id) => !byId(id)),
        ).toEqual([])
      },
    )

    test.each(FRAMEWORKS)(
      "%s: the field's parts come in the order they're drawn",
      async (framework) => {
        const { all } = await ownField(
          name,
          framework,
          {},
          {
            default: control,
            ...slots,
          },
        )
        const field = all.find(
          (el) => attribute(el, "class") === "ui-field-container",
        )!
        const shown = field.childNodes
          .filter((node): node is Element => "tagName" in node)
          .map((el) =>
            el.tagName === tag
              ? "control"
              : attribute(el, "class")!.replace("ui-", ""),
          )
        expect(shown).toEqual(drawn)
      },
    )
  },
)

describe("PasswordToggle", () => {
  test.each(FRAMEWORKS)(
    "%s: the toggle's button points at the input",
    async (framework) => {
      const { all } = await renderField(
        "PasswordToggle",
        framework,
        { [framework === "react" ? "htmlFor" : "for"]: "x" },
        {},
      )
      const button = all.find((el) => attribute(el, "commandfor") === "x")
      expect(button?.tagName).toBe("button")
      expect(attribute(button, "command")).toBe("--toggle-password")
      expect(all[0]?.tagName).toBe("opui-password-toggle")
    },
  )
})
