import { parseFragment, type DefaultTreeAdapterMap } from "parse5"
import { describe, expect, test } from "vitest"
import {
  type ComponentFramework,
  frameworks,
} from "../../src/component-api/frameworks"
import { render } from "./renderers"

type Element = DefaultTreeAdapterMap["element"]
type Node = DefaultTreeAdapterMap["childNode"] | Element

const components = import.meta.glob<unknown>(
  "../../packages/opui/components/*/*.{astro,react.tsx,svelte,vue}",
  { import: "default" },
)

const cases = [
  {
    buttons: 2,
    file: "NumberField/NumberField",
    props: { label: "Quantity" },
  },
  {
    buttons: 1,
    file: "TextField/TextField",
    props: { label: "Password", passwordToggle: true, type: "password" },
  },
]

const elements = (node: Node): Element[] =>
  "childNodes" in node
    ? [
        ...("tagName" in node ? [node as Element] : []),
        ...node.childNodes.flatMap((child) => elements(child as Node)),
      ]
    : []
const controls = (html: string) =>
  elements(parseFragment(html) as unknown as Node).filter((element) =>
    ["button", "input"].includes(element.tagName),
  )
const disabled = (element: Element) =>
  element.attrs.some((attr) => attr.name === "disabled")

describe.each(cases)("$file", ({ buttons, file, props }) => {
  test.each(Object.keys(render) as ComponentFramework[])(
    "%s disables its buttons with the field",
    async (framework) => {
      const [folder, name] = file.split("/")
      const component =
        await components[
          `../../packages/opui/components/${folder}/${frameworks[framework].component(name)}`
        ]()
      const enabled = controls(await render[framework](component, props))
      expect(
        enabled.filter((element) => element.tagName === "button"),
      ).toHaveLength(buttons)
      expect(enabled.filter(disabled)).toEqual([])

      const rendered = controls(
        await render[framework](component, { ...props, disabled: true }),
      )
      expect(
        rendered
          .filter((element) => !disabled(element))
          .map(({ tagName }) => tagName),
      ).toEqual([])
    },
  )
})
