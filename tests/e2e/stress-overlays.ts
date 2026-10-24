import { expect } from "@playwright/test"
import type { Page } from "@playwright/test"
import { settle } from "./fixtures"

type Step =
  | { click: string }
  | { hover: string }
  | { open: string }
  | { block: ScrollLogicalPosition; container?: "nearest"; scroll: string }
  | { select: string }

export type Scenario = {
  failing?: string
  failingIn?: Partial<Record<"firefox" | "webkit", string>>
  name: string
  steps: Step[]
  stillOpen?: string[]
  top: string
  unreachableIn?: Partial<Record<"firefox" | "webkit", string>>
}

export const FIREFOX_SELF_RTL =
  "Firefox places a popover with self- position-area keywords toward the wrong inline side in a right-to-left part of a left-to-right page"

const WEBKIT_SCROLLED_ANCHOR =
  "WebKit moves a popover anchored inside a dialog, drawer or menu up by the page scroll"

export const id = (name: string) => `#stress-overlays-${name}`

const trigger = (name: string) =>
  `[commandfor="stress-overlays-${name}"]:is([command="show-modal"], [command="toggle-popover"])`

const hover = (name: string): Step => ({ hover: name })

const open = (name: string): Step => ({ open: name })

const select = (name: string): Step => ({ select: name })

const scroll = (name: string, block: ScrollLogicalPosition): Step => ({
  block,
  scroll: `${trigger(name)}, ${id(name)}`,
})

const scrollInBox = (name: string, block: ScrollLogicalPosition): Step => ({
  block,
  container: "nearest",
  scroll: `${trigger(name)}, ${id(name)}`,
})

const SIDES = ["block-start", "inline-start", "inline-end", "block-end"]

const SIZES = ["x-small", "small", "default", "large"]

export const SCENARIOS: Scenario[] = [
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
    name: "select in accordion in drawer",
    steps: [
      open("drawer"),
      { click: `${id("drawer")} details:nth-child(1) summary` },
      select("drawer-price"),
    ],
    top: `${id("drawer-price")} option:checked`,
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
  ...SIDES.map((side) => ({
    name: `${side} drawer`,
    steps: [open(`side-${side}`)],
    top: id(`side-${side}`),
  })),
  ...SIDES.map((side) => ({
    name: `${side} drawer footer after scrolling the body to the end`,
    steps: [
      open(`side-${side}`),
      {
        block: "end" as const,
        scroll: `${id(`side-${side}`)} .ui-content > :last-child`,
      },
    ],
    top: `${id(`side-${side}`)} .ui-actions`,
  })),
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "menu in block end drawer footer",
    steps: [open("side-block-end"), open("side-block-end-menu")],
    top: id("side-block-end-menu"),
  },
  {
    name: "select at the end of the block end drawer body",
    steps: [
      open("side-block-end"),
      scroll("side-block-end-select", "end"),
      select("side-block-end-select"),
    ],
    top: `${id("side-block-end-select")} option:checked`,
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
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "inline start submenu at the start edge",
    steps: [open("sub-view"), open("sub-view-zoom")],
    top: id("sub-view-zoom"),
  },
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "second level submenu",
    steps: [open("sub-file"), open("sub-file-export"), open("sub-file-image")],
    top: id("sub-file-image"),
    unreachableIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
  },
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "submenu at the end edge",
    steps: [open("sub-edit"), open("sub-edit-transform")],
    top: id("sub-edit-transform"),
  },
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "second level submenu at the end edge",
    steps: [
      open("sub-edit"),
      open("sub-edit-transform"),
      open("sub-edit-rotate"),
    ],
    top: id("sub-edit-rotate"),
    unreachableIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
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
  ...["filled", "outlined"].flatMap((variant) =>
    SIZES.map((size) => ({
      name: `${variant} ${size} split button menu`,
      steps: [
        scroll(`split-${variant}-${size}`, "center"),
        open(`split-${variant}-${size}`),
      ],
      top: id(`split-${variant}-${size}`),
    })),
  ),
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "split button menu in dialog footer",
    steps: [open("split-dialog"), open("split-dialog-menu")],
    top: id("split-dialog-menu"),
  },
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "outlined split button menu in block end drawer footer",
    steps: [open("split-drawer"), open("split-drawer-outlined")],
    top: id("split-drawer-outlined"),
  },
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "filled split button menu in block end drawer footer",
    steps: [open("split-drawer"), open("split-drawer-filled")],
    top: id("split-drawer-filled"),
  },
  {
    name: "row menu at the clipped end of a scrolled table",
    steps: [
      scroll("table-scroll-menu-1", "center"),
      open("table-scroll-menu-1"),
    ],
    top: id("table-scroll-menu-1"),
  },
  {
    name: "row tooltip at the clipped end of a scrolled table",
    steps: [scroll("table-scroll-tip-3", "center"), open("table-scroll-tip-3")],
    top: id("table-scroll-tip-3"),
  },
  {
    name: "row menu right below a sticky header",
    steps: [
      scroll("table-sticky-menu-1", "center"),
      scrollInBox("table-sticky-menu-4", "start"),
      open("table-sticky-menu-4"),
    ],
    top: id("table-sticky-menu-4"),
  },
  {
    name: "row tooltip over a sticky header",
    steps: [
      scroll("table-sticky-menu-1", "center"),
      scrollInBox("table-sticky-tip-4", "start"),
      open("table-sticky-tip-4"),
    ],
    top: id("table-sticky-tip-4"),
  },
  {
    name: "row menu at the end of a sticky header table",
    steps: [scroll("table-sticky-menu-6", "end"), open("table-sticky-menu-6")],
    top: id("table-sticky-menu-6"),
  },
  {
    name: "sticky header tooltip after scrolling the table",
    steps: [
      scroll("table-sticky-menu-6", "end"),
      open("table-sticky-tip-status"),
    ],
    top: id("table-sticky-tip-status"),
  },
  {
    name: "tooltip on a button in a button group",
    steps: [hover("toolbar-tip-align-center")],
    top: id("toolbar-tip-align-center"),
  },
  {
    name: "tooltip on an aria-disabled button",
    steps: [hover("toolbar-tip-delete")],
    top: id("toolbar-tip-delete"),
  },
  {
    name: "tooltip over an open menu in the same toolbar",
    steps: [open("toolbar-menu"), hover("toolbar-tip-share")],
    stillOpen: ["toolbar-menu"],
    top: id("toolbar-tip-share"),
  },
  {
    name: "menu opened after a tooltip in the same toolbar",
    steps: [hover("toolbar-tip-favorite"), open("toolbar-menu")],
    top: id("toolbar-menu"),
  },
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "tooltip on a square button in a dialog",
    steps: [open("toolbar-dialog"), hover("toolbar-dialog-tip-align-left")],
    top: id("toolbar-dialog-tip-align-left"),
  },
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "tooltip on an aria-disabled rounded button in a dialog",
    steps: [open("toolbar-dialog"), hover("toolbar-dialog-tip-clear")],
    top: id("toolbar-dialog-tip-clear"),
  },
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "tooltip on a square button in a drawer header",
    steps: [open("toolbar-drawer"), hover("toolbar-drawer-tip-edit")],
    top: id("toolbar-drawer-tip-edit"),
  },
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "tooltip on an aria-disabled button in a drawer header",
    steps: [open("toolbar-drawer"), hover("toolbar-drawer-tip-share")],
    top: id("toolbar-drawer-tip-share"),
  },
  {
    failingIn: { webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "tooltip on the close button at the drawer edge",
    steps: [open("toolbar-drawer"), hover("toolbar-drawer-tip-close")],
    top: id("toolbar-drawer-tip-close"),
  },
  {
    failingIn: { firefox: FIREFOX_SELF_RTL },
    name: "rtl menu",
    steps: [open("rtl-menu")],
    top: id("rtl-menu"),
  },
  {
    failingIn: { firefox: FIREFOX_SELF_RTL, webkit: WEBKIT_SCROLLED_ANCHOR },
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
    failingIn: { firefox: FIREFOX_SELF_RTL, webkit: WEBKIT_SCROLLED_ANCHOR },
    name: "rtl menu in drawer",
    steps: [open("rtl-drawer-start"), open("rtl-drawer-menu")],
    top: id("rtl-drawer-menu"),
  },
]

export const opened = (steps: Step[]) =>
  steps.flatMap((step) =>
    "open" in step ? [step.open] : "hover" in step ? [step.hover] : [],
  )

export const isOpen = (page: Page, selector: string) =>
  page.locator(selector).evaluate((element) => {
    if (element instanceof HTMLDialogElement) return element.open
    if (element instanceof HTMLSelectElement) return element.matches(":open")
    return element.matches(":popover-open")
  })

export const run = async (page: Page, step: Step) => {
  if ("scroll" in step) {
    await page
      .locator(step.scroll)
      .first()
      .evaluate((element, options) => element.scrollIntoView(options), {
        behavior: "instant" as const,
        block: step.block,
        container: step.container,
      })
    return
  }
  if ("click" in step) {
    await page.locator(step.click).first().click()
    return
  }
  if ("hover" in step) {
    const control = page
      .locator(`[interestfor="stress-overlays-${step.hover}"]`)
      .first()
    await control.hover()
    await control.evaluate((element) => {
      if (!(element instanceof HTMLElement) || "interestForElement" in element)
        return
      document
        .getElementById(element.getAttribute("interestfor")!)
        ?.showPopover({ source: element })
    })
    await expect.poll(() => isOpen(page, id(step.hover)), step.hover).toBe(true)
    await settle(page.locator(id(step.hover)))
    return
  }
  const target = "open" in step ? step.open : step.select
  const control =
    "open" in step
      ? page.locator(trigger(target)).first()
      : page.locator(id(target))
  await control.click()
  await expect.poll(() => isOpen(page, id(target)), target).toBe(true)
  await settle(page.locator(id(target)))
}

export const problems = (page: Page, selector: string) =>
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
      const invoker =
        element.id && element.matches("[popover]")
          ? document.querySelector(
              `[commandfor="${element.id}"][command="toggle-popover"], [interestfor="${element.id}"]`,
            )
          : null
      const anchor = invoker?.getBoundingClientRect()
      const gap = anchor
        ? Math.max(
            anchor.left - rect.right,
            rect.left - anchor.right,
            anchor.top - rect.bottom,
            rect.top - anchor.bottom,
          )
        : 0
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
        gap > 16 ? `is ${Math.round(gap)}px away from its trigger` : "",
      ].filter(Boolean)
    })
