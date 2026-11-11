import { afterAll, beforeAll, expect, test, vi } from "vitest"

const link = {}
const popover = {
  contains: (element: object) => element === link,
  hidePopover: vi.fn(),
  matches: (selector: string) => selector !== "dialog",
}
const drawer = {
  close: vi.fn(),
  contains: (element: object) => element === link,
  matches: (selector: string) => selector === "dialog",
}
let navigate = (_event: object) => {}

const closes = (
  navigationType: string,
  url: string,
  rest: {
    defaultPrevented?: boolean
    downloadRequest?: string
    hashChange?: boolean
    sourceElement?: object
  } = {},
) => {
  popover.hidePopover.mockClear()
  drawer.close.mockClear()
  navigate({
    defaultPrevented: false,
    destination: { url: new URL(url, "https://example.com").href },
    downloadRequest: null,
    hashChange: false,
    navigationType,
    ...rest,
  })
  expect(drawer.close.mock.calls).toHaveLength(
    popover.hidePopover.mock.calls.length,
  )
  return popover.hidePopover.mock.calls.length === 1
}

beforeAll(async () => {
  vi.stubGlobal("location", { pathname: "/feed" })
  vi.stubGlobal("document", {
    querySelectorAll: () => [popover, drawer],
  })
  vi.stubGlobal("navigation", {
    addEventListener: (_type: string, listener: typeof navigate) => {
      navigate = listener
    },
  })
  await import("../../packages/opui/elements/close-on-navigate.js")
})

afterAll(() => {
  vi.unstubAllGlobals()
})

test("a navigation to another page closes the open overlays", () => {
  expect(closes("push", "/elsewhere")).toBe(true)
  expect(closes("push", "/feed?tab=2")).toBe(true)
  expect(closes("replace", "/elsewhere")).toBe(true)
  expect(closes("traverse", "/feed")).toBe(true)
  expect(closes("reload", "/feed")).toBe(true)
})

test("an update of the URL in place keeps them open", () => {
  expect(closes("replace", "/feed?sort=new")).toBe(false)
  expect(closes("replace", "/feed?pages=2")).toBe(false)
  expect(closes("push", "/feed#s-42", { hashChange: true })).toBe(false)
  expect(closes("traverse", "/feed#s-42", { hashChange: true })).toBe(false)
})

test("a link that stays on the page closes the overlays it sits in", () => {
  expect(
    closes("push", "/feed#s-42", { hashChange: true, sourceElement: link }),
  ).toBe(true)
  expect(closes("replace", "/feed#s-42", { sourceElement: link })).toBe(true)
  expect(
    closes("push", "/feed#s-42", { hashChange: true, sourceElement: {} }),
  ).toBe(false)
})

test("a download and a cancelled navigation keep them open", () => {
  expect(closes("push", "/report.pdf", { downloadRequest: "report.pdf" })).toBe(
    false,
  )
  expect(closes("push", "/elsewhere", { defaultPrevented: true })).toBe(false)
})
