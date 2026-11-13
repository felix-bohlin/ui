import { describe, expect, test } from "vitest"
import type { ComponentFramework } from "../../src/component-api/frameworks"
import MenuAstro from "../../packages/opui/components/Menu/Menu.astro"
import MenuReact from "../../packages/opui/components/Menu/Menu.react"
import MenuSvelte from "../../packages/opui/components/Menu/Menu.svelte"
import MenuVue from "../../packages/opui/components/Menu/Menu.vue"
import { parseHtml } from "../../scripts/html-tokens.mjs"
import { render } from "./renderers"

type Node = ReturnType<typeof parseHtml>[number]

const MENU: Record<ComponentFramework, unknown> = {
  astro: MenuAstro,
  react: MenuReact,
  svelte: MenuSvelte,
  vue: MenuVue,
}

const FRAMEWORKS = Object.keys(render) as ComponentFramework[]

const items = [
  { label: "Edit" },
  { form: "post", label: "Delete", type: "submit" },
  { form: "post", label: "Reset", type: "reset" },
  { href: "/help/", label: "Help" },
  { keepOpen: true, label: "Mute" },
  { href: "/log/", keepOpen: true, label: "Log" },
]

const controls = (nodes: Node[]): Record<string, string>[] =>
  nodes.flatMap((node) =>
    node.type === "element"
      ? [
          ...(node.tag === "a" || node.tag === "button"
            ? [
                Object.fromEntries(
                  node.attrs.map(
                    ({ name, value }: { name: string; value: string }) => [
                      name,
                      value,
                    ],
                  ),
                ),
              ]
            : []),
          ...controls(node.children),
        ]
      : [],
  )

describe.each(FRAMEWORKS)("Menu items in %s", (framework) => {
  test("only a plain button item closes the menu with a command, and keepOpen marks its item", async () => {
    const html = await render[framework](MENU[framework], { id: "menu", items })
    const [edit, remove, reset, help, mute, log] = controls(parseHtml(html))
    expect(edit).toMatchObject({ command: "hide-popover", commandfor: "menu" })
    for (const item of [remove, reset, help, mute, log]) {
      expect(item).not.toHaveProperty("command")
      expect(item).not.toHaveProperty("commandfor")
    }
    expect(remove).toMatchObject({ form: "post", type: "submit" })
    expect(reset).toMatchObject({ form: "post", type: "reset" })
    for (const item of [edit, remove, reset, help]) {
      expect(item).not.toHaveProperty("data-keep-open")
    }
    expect(mute).toHaveProperty("data-keep-open")
    expect(log).toHaveProperty("data-keep-open")
  })
})
