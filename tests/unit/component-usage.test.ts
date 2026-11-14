import { describe, expect, test } from "vitest"
import { componentUsages } from "./component-usage"

describe("componentUsages", () => {
  test("reads each component's props with their static values, and nothing from inside other attributes", async () => {
    expect(
      await componentUsages(
        `<Chip description='Pick a size for > the size="small" chip' data-size="small" size="large" open />`,
      ),
    ).toEqual([
      {
        component: "Chip",
        props: [
          {
            name: "description",
            value: 'Pick a size for > the size="small" chip',
          },
          { name: "data-size", value: "small" },
          { name: "size", value: "large" },
          { name: "open", value: undefined },
        ],
      },
    ])
  })

  test("reads string literals in expressions and template literals as static values, and leaves other expressions without one", async () => {
    const [{ props }] = await componentUsages(
      '<Chip a={"small"} b={("large" as const)} c=`medium` d={`x${y}`} e={size} {f} {...rest} />',
    )
    expect(props).toEqual([
      { name: "a", value: "small" },
      { name: "b", value: "large" },
      { name: "c", value: "medium" },
      { name: "d", value: undefined },
      { name: "e", value: undefined },
      { name: "f", value: undefined },
    ])
  })

  test("resolves named, renamed and namespace imports to the component's name", async () => {
    const usages = await componentUsages(
      [
        "---",
        'import { Chip as Tag, ListItem } from "opui-css/astro"',
        'import * as UI from "opui-css/astro"',
        "---",
        "<Tag />",
        "<ListItem />",
        "<UI.Button />",
        "<Card />",
      ].join("\n"),
    )
    expect(usages.map((usage) => usage.component)).toEqual([
      "Chip",
      "ListItem",
      "Button",
      "Card",
    ])
  })

  test("finds components inside elements, slots and expressions, but not in strings or HTML elements", async () => {
    const usages = await componentUsages(
      [
        "---",
        'const items = ["a"]',
        "const markup = '<Badge size=\"small\" />'",
        "---",
        '<div><List><ListItem slot="start" /></List></div>',
        "{items.map((item) => <Chip label={item} />)}",
        '<Fragment set:html={markup} /><button size="small"></button>',
      ].join("\n"),
    )
    expect(usages.map((usage) => usage.component)).toEqual([
      "List",
      "ListItem",
      "Chip",
    ])
  })
})
