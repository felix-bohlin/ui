import { ssrElement } from "@solidjs/web"
import { createElement, type ComponentProps } from "react"
import { h, type FunctionalComponent } from "vue"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import AvatarReact from "../../packages/opui/components/Avatar/Avatar.react"
import AvatarSolid from "../../packages/opui/components/Avatar/Avatar.solid"
import AvatarVue from "../../packages/opui/components/Avatar/Avatar.vue"
import ButtonReact from "../../packages/opui/components/Button/Button.react"
import ButtonSolid from "../../packages/opui/components/Button/Button.solid"
import ButtonVue from "../../packages/opui/components/Button/Button.vue"
import ChipReact from "../../packages/opui/components/Chip/Chip.react"
import ChipSolid from "../../packages/opui/components/Chip/Chip.solid"
import ChipVue from "../../packages/opui/components/Chip/Chip.vue"
import ListItemReact from "../../packages/opui/components/ListItem/ListItem.react"
import ListItemSolid from "../../packages/opui/components/ListItem/ListItem.solid"
import ListItemVue from "../../packages/opui/components/ListItem/ListItem.vue"
import MenuReact from "../../packages/opui/components/Menu/Menu.react"
import MenuSolid from "../../packages/opui/components/Menu/Menu.solid"
import MenuVue from "../../packages/opui/components/Menu/Menu.vue"
import { parseHtml } from "../../scripts/html-tokens.mjs"
import { render } from "./renderers"

type Node = ReturnType<typeof parseHtml>[number]

const ROUTER = "data-router"

const links = {
  react: (props: ComponentProps<"a">) =>
    createElement("a", { ...props, [ROUTER]: "" }),
  solid: ({ children, ...props }: Record<string, unknown>) =>
    ssrElement("a", { ...props, [ROUTER]: "" }, children, false),
  vue: ((_, { attrs, slots }) =>
    h(
      "a",
      { ...attrs, [ROUTER]: "" },
      slots.default?.(),
    )) as FunctionalComponent,
}

const components = {
  Avatar: { react: AvatarReact, solid: AvatarSolid, vue: AvatarVue },
  Button: { react: ButtonReact, solid: ButtonSolid, vue: ButtonVue },
  Chip: { react: ChipReact, solid: ChipSolid, vue: ChipVue },
  ListItem: { react: ListItemReact, solid: ListItemSolid, vue: ListItemVue },
}

const FRAMEWORKS = ["react", "solid", "vue"] as const

const anchors = (nodes: Node[]): Record<string, string>[] =>
  nodes.flatMap((node) =>
    node.type === "element"
      ? [
          ...(node.tag === "a"
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
          ...anchors(node.children),
        ]
      : [],
  )

describe.each(FRAMEWORKS)("A link component in as in %s", (framework) => {
  const Link = links[framework]
  const warn = vi.spyOn(console, "warn")

  beforeEach(() => {
    warn.mockClear()
  })

  afterEach(() => {
    expect(warn).not.toHaveBeenCalled()
  })

  test.each(Object.entries(components))(
    "%s passes href to it, and renders the plain disabled link when disabled",
    async (_, component) => {
      const [link] = anchors(
        parseHtml(
          await render[framework](component[framework], {
            as: Link,
            href: "/docs/",
            label: "Docs",
          }),
        ),
      )
      expect(link).toMatchObject({ [ROUTER]: "", href: "/docs/" })
      const [disabled] = anchors(
        parseHtml(
          await render[framework](component[framework], {
            as: Link,
            disabled: true,
            href: "/docs/",
            label: "Docs",
          }),
        ),
      )
      expect(disabled).toMatchObject({ "aria-disabled": "true", role: "link" })
      expect(disabled).not.toHaveProperty("href")
      expect(disabled).not.toHaveProperty(ROUTER)
    },
  )

  test("a Menu item passes href to it, and renders the plain disabled link when disabled", async () => {
    const menus = { react: MenuReact, solid: MenuSolid, vue: MenuVue }
    const [link, disabled] = anchors(
      parseHtml(
        await render[framework](menus[framework], {
          id: "menu",
          items: [
            { as: Link, href: "/docs/", label: "Docs" },
            { as: Link, disabled: true, href: "/docs/", label: "Docs" },
          ],
        }),
      ),
    )
    expect(link).toMatchObject({ [ROUTER]: "", href: "/docs/" })
    expect(link).not.toHaveProperty("command")
    expect(disabled).toMatchObject({ "aria-disabled": "true", role: "link" })
    expect(disabled).not.toHaveProperty("href")
    expect(disabled).not.toHaveProperty(ROUTER)
  })
})
