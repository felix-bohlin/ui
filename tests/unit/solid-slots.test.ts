import { createComponent } from "@solidjs/web"
import { expect, test } from "vitest"
import Callout from "../../packages/opui/components/Callout/Callout.solid"
import { useCalloutContext } from "../../packages/opui/components/Callout/context.solid"
import { useMenuContext } from "../../packages/opui/components/Menu/context.solid"
import Menu from "../../packages/opui/components/Menu/Menu.solid"
import { renderSolid } from "../../src/components/Example/render-solid"

test("a slot a Solid component resolves with children() reads the context the component provides", () => {
  const Severity = () => `severity:${useCalloutContext()?.severity}`
  expect(
    renderSolid(Callout as never, "solid-", {
      closeButton: true,
      get closeIcon() {
        return createComponent(Severity, {})
      },
      severity: "error",
    }),
  ).toContain("severity:error")
  const RootId = () => `root:${useMenuContext()?.rootId}`
  const menu = renderSolid(Menu as never, "solid-", {
    get iconChecked() {
      return createComponent(RootId, {})
    },
    id: "actions",
    items: [{ label: "Copy" }, { label: "Paste" }],
  })
  expect(menu.match(/root:actions/g)).toHaveLength(2)
})
