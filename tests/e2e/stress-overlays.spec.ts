import { expect, test } from "@playwright/test"
import type { Page } from "@playwright/test"
import { openFixture } from "./fixtures"

type Step =
  | { click: string }
  | { open: string }
  | { scroll: string; block: ScrollLogicalPosition }
  | { select: string }

type Scenario = {
  failing?: string
  name: string
  steps: Step[]
  top: string
}

const id = (name: string) => `#stress-overlays-${name}`

const trigger = (name: string) =>
  `[commandfor="stress-overlays-${name}"]:is([command="show-modal"], [command="toggle-popover"])`

const open = (name: string): Step => ({ open: name })

const select = (name: string): Step => ({ select: name })

const scroll = (name: string, block: ScrollLogicalPosition): Step => ({
  block,
  scroll: name,
})

const SCENARIOS: Scenario[] = [
  { name: "dialog", steps: [open("dialog")], top: id("dialog") },
  {
    name: "menu in dialog",
    steps: [open("dialog"), open("dialog-menu")],
    top: id("dialog-menu"),
  },
  {
    name: "submenu in dialog",
    steps: [open("dialog"), open("dialog-menu"), open("dialog-submenu")],
    top: id("dialog-submenu"),
  },
  {
    name: "tooltip in dialog",
    steps: [open("dialog"), open("dialog-tooltip")],
    top: id("dialog-tooltip"),
  },
  {
    name: "select in dialog",
    steps: [open("dialog"), select("dialog-status")],
    top: `${id("dialog-status")} option:checked`,
  },
  {
    name: "select in accordion in dialog",
    steps: [
      open("dialog"),
      { click: `${id("dialog")} summary` },
      select("dialog-visibility"),
    ],
    top: `${id("dialog-visibility")} option:checked`,
  },
  {
    name: "dialog over dialog",
    steps: [open("dialog"), open("dialog-confirm")],
    top: id("dialog-confirm"),
  },
  {
    name: "drawer over dialog",
    steps: [open("dialog"), open("dialog-drawer")],
    top: id("dialog-drawer"),
  },
  {
    name: "select in drawer over dialog",
    steps: [
      open("dialog"),
      open("dialog-drawer"),
      select("dialog-drawer-filter"),
    ],
    top: `${id("dialog-drawer-filter")} option:checked`,
  },
  {
    name: "end aligned menu in drawer header",
    steps: [open("drawer"), open("drawer-menu")],
    top: id("drawer-menu"),
  },
  {
    name: "select in drawer",
    steps: [open("drawer"), select("drawer-sort")],
    top: `${id("drawer-sort")} option:checked`,
  },
  {
    name: "tooltip in drawer",
    steps: [open("drawer"), open("drawer-tooltip")],
    top: id("drawer-tooltip"),
  },
  {
    name: "menu in accordion in drawer",
    steps: [
      open("drawer"),
      { click: `${id("drawer")} details:nth-child(2) summary` },
      open("drawer-tags-menu"),
    ],
    top: id("drawer-tags-menu"),
  },
  {
    name: "dialog over drawer",
    steps: [open("drawer"), open("drawer-dialog")],
    top: id("drawer-dialog"),
  },
  {
    name: "select in dialog over drawer",
    steps: [
      open("drawer"),
      open("drawer-dialog"),
      select("drawer-dialog-scope"),
    ],
    top: `${id("drawer-dialog-scope")} option:checked`,
  },
  ...["block-start", "inline-start", "inline-end", "block-end"].map((side) => ({
    name: `${side} drawer`,
    steps: [open(`side-${side}`)],
    top: id(`side-${side}`),
  })),
  {
    name: "menu in block end drawer footer",
    steps: [open("side-block-end"), open("side-block-end-menu")],
    top: id("side-block-end-menu"),
  },
  {
    name: "menu at top start",
    steps: [scroll("edge-top-start", "start"), open("edge-top-start")],
    top: id("edge-top-start"),
  },
  {
    name: "tooltip at top start",
    steps: [
      scroll("edge-top-start-tooltip", "start"),
      open("edge-top-start-tooltip"),
    ],
    top: id("edge-top-start-tooltip"),
  },
  {
    name: "end aligned menu at top end",
    steps: [scroll("edge-top-end", "start"), open("edge-top-end")],
    top: id("edge-top-end"),
  },
  {
    name: "select at top end",
    steps: [
      scroll("edge-top-end-select", "start"),
      select("edge-top-end-select"),
    ],
    top: `${id("edge-top-end-select")} option:checked`,
  },
  {
    name: "menu at bottom start",
    steps: [scroll("edge-bottom-start", "end"), open("edge-bottom-start")],
    top: id("edge-bottom-start"),
  },
  {
    name: "select at bottom start",
    steps: [
      scroll("edge-bottom-start-select", "end"),
      select("edge-bottom-start-select"),
    ],
    top: `${id("edge-bottom-start-select")} option:checked`,
  },
  {
    name: "inline end menu at bottom end",
    steps: [scroll("edge-bottom-end", "end"), open("edge-bottom-end")],
    top: id("edge-bottom-end"),
  },
  {
    name: "inline end tooltip at bottom end",
    steps: [
      scroll("edge-bottom-end-tooltip", "end"),
      open("edge-bottom-end-tooltip"),
    ],
    top: id("edge-bottom-end-tooltip"),
  },
  {
    name: "inline start submenu at the start edge",
    steps: [open("sub-view"), open("sub-view-zoom")],
    top: id("sub-view-zoom"),
  },
  {
    name: "second level submenu",
    steps: [open("sub-file"), open("sub-file-export"), open("sub-file-image")],
    top: id("sub-file-image"),
  },
  {
    name: "submenu at the end edge",
    steps: [open("sub-edit"), open("sub-edit-transform")],
    top: id("sub-edit-transform"),
  },
  {
    name: "second level submenu at the end edge",
    steps: [
      open("sub-edit"),
      open("sub-edit-transform"),
      open("sub-edit-rotate"),
    ],
    top: id("sub-edit-rotate"),
  },
  {
    name: "long form dialog",
    steps: [open("long-dialog")],
    top: id("long-dialog"),
  },
  {
    name: "select in long form dialog",
    steps: [open("long-dialog"), select("long-country")],
    top: `${id("long-country")} option:checked`,
  },
  {
    name: "30 item menu in the middle of the viewport",
    steps: [scroll("long-menu", "center"), open("long-menu")],
    top: id("long-menu"),
  },
  {
    name: "long tooltip",
    steps: [open("long-tooltip")],
    top: id("long-tooltip"),
  },
  {
    name: "40 option select",
    steps: [select("long-select")],
    top: `${id("long-select")} option:checked`,
  },
  {
    name: "dialog from a menu",
    steps: [open("launch-menu"), open("launch-dialog")],
    top: id("launch-dialog"),
  },
  {
    name: "drawer from a menu",
    steps: [open("launch-menu"), open("launch-drawer")],
    top: id("launch-drawer"),
  },
  {
    name: "dialog over toasts",
    steps: [
      { click: '[commandfor="toast-manager"][command="toggle-popover"]' },
      open("toast-dialog"),
    ],
    top: id("toast-dialog"),
  },
  {
    failing:
      "the toast manager sits outside the modal dialog, so its toasts are inert while the dialog is open",
    name: "toasts shown from a dialog",
    steps: [
      open("toast-dialog"),
      { click: '[commandfor="toast-manager"][command="show-popover"]' },
    ],
    top: "#toast-manager .ui-toast",
  },
  { name: "rtl menu", steps: [open("rtl-menu")], top: id("rtl-menu") },
  {
    name: "rtl submenu",
    steps: [open("rtl-menu"), open("rtl-submenu")],
    top: id("rtl-submenu"),
  },
  {
    name: "rtl end aligned menu",
    steps: [open("rtl-end-menu")],
    top: id("rtl-end-menu"),
  },
  {
    name: "rtl tooltip",
    steps: [open("rtl-tooltip")],
    top: id("rtl-tooltip"),
  },
  {
    name: "rtl select",
    steps: [select("rtl-select")],
    top: `${id("rtl-select")} option:checked`,
  },
  {
    name: "rtl inline start drawer",
    steps: [open("rtl-drawer-start")],
    top: id("rtl-drawer-start"),
  },
  {
    name: "rtl inline end drawer",
    steps: [open("rtl-drawer-end")],
    top: id("rtl-drawer-end"),
  },
  {
    name: "rtl menu in drawer",
    steps: [open("rtl-drawer-start"), open("rtl-drawer-menu")],
    top: id("rtl-drawer-menu"),
  },
]

const isOpen = (page: Page, selector: string) =>
  page.locator(selector).evaluate((element) => {
    if (element instanceof HTMLDialogElement) return element.open
    if (element instanceof HTMLSelectElement) return element.matches(":open")
    return element.matches(":popover-open")
  })

const run = async (page: Page, step: Step) => {
  if ("scroll" in step) {
    await page
      .locator(trigger(step.scroll))
      .or(page.locator(id(step.scroll)))
      .first()
      .evaluate(
        (element, block) =>
          element.scrollIntoView({ behavior: "instant", block }),
        step.block,
      )
    return
  }
  if ("click" in step) {
    await page.locator(step.click).first().click()
    return
  }
  const target = "open" in step ? step.open : step.select
  const control =
    "open" in step
      ? page.locator(trigger(target)).first()
      : page.locator(id(target))
  await control.click()
  await expect.poll(() => isOpen(page, id(target)), target).toBe(true)
}

const problems = (page: Page, selector: string) =>
  page
    .locator(selector)
    .first()
    .evaluate((element) => {
      const rect = element.getBoundingClientRect()
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight
      const hit = document.elementFromPoint(
        rect.x + rect.width / 2,
        rect.y + rect.height / 2,
      )
      const box = [rect.left, rect.top, rect.right, rect.bottom]
        .map(Math.round)
        .join(", ")
      return [
        rect.width === 0 || rect.height === 0 ? "has no size" : "",
        rect.left < -0.5 ||
        rect.top < -0.5 ||
        rect.right > width + 0.5 ||
        rect.bottom > height + 0.5
          ? `[${box}] leaves the ${width}x${height} viewport`
          : "",
        hit && element.contains(hit)
          ? ""
          : `is covered by ${hit ? `${hit.tagName.toLowerCase()}.${[...hit.classList].join(".")}` : "nothing"}`,
      ].filter(Boolean)
    })

for (const { failing, name, steps, top } of SCENARIOS) {
  test(`${name} is on top and inside the viewport`, async ({ page }) => {
    test.fail(!!failing, failing)
    await openFixture(page, "html", "stress/overlays")
    for (const step of steps) await run(page, step)
    await expect.poll(() => problems(page, top), name).toEqual([])
  })
}
