import { afterAll, beforeAll, expect, test, vi } from "vitest"

const link = { closest: () => link }
const field = { closest: () => null }
const drawer = {
  close: vi.fn(),
  contains: (element: object) => element === link,
  matches: (selector: string) => selector === "dialog",
}
const menu = {
  contains: (element: object) => element === link,
  hidePopover: vi.fn(),
  matches: (selector: string) => selector !== "dialog",
}
const popover = {
  contains: (element: object) => element === link,
  hidePopover: vi.fn(),
  matches: (selector: string) => selector !== "dialog",
}
const other = {
  contains: () => false,
  hidePopover: vi.fn(),
  matches: (selector: string) => selector !== "dialog",
}
let activeElement: object | null = null
let navigate = (_event: object) => {}

const closed = (
  navigationType: string,
  url: string,
  rest: {
    defaultPrevented?: boolean
    downloadRequest?: string
    hashChange?: boolean
    sourceElement?: object
  } = {},
) => {
  vi.clearAllMocks()
  navigate({
    defaultPrevented: false,
    destination: { url: new URL(url, "https://example.com").href },
    downloadRequest: null,
    hashChange: false,
    navigationType,
    sourceElement: null,
    ...rest,
  })
  return [
    drawer.close.mock.calls.length && "drawer",
    menu.hidePopover.mock.calls.length && "menu",
    other.hidePopover.mock.calls.length && "other",
    popover.hidePopover.mock.calls.length && "popover",
  ].filter(Boolean)
}

const ALL = ["drawer", "menu", "other", "popover"]
const AROUND_THE_LINK = ["drawer", "menu", "popover"]

beforeAll(async () => {
  vi.stubGlobal("location", { pathname: "/feed" })
  vi.stubGlobal("document", {
    get activeElement() {
      return activeElement
    },
    querySelectorAll: () => [drawer, menu, other, popover],
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
  expect(closed("push", "/elsewhere")).toEqual(ALL)
  expect(closed("push", "/feed?tab=2")).toEqual(ALL)
  expect(closed("replace", "/elsewhere")).toEqual(ALL)
  expect(closed("traverse", "/feed")).toEqual(ALL)
  expect(closed("traverse", "/feed#s-42", { hashChange: true })).toEqual(ALL)
  expect(closed("reload", "/feed")).toEqual(ALL)
})

test("an update of the URL in place keeps them open", () => {
  expect(closed("replace", "/feed?sort=new")).toEqual([])
  expect(closed("replace", "/feed?pages=2")).toEqual([])
  expect(closed("push", "/feed#s-42", { hashChange: true })).toEqual([])
})

test("a link that stays on the page closes the overlays it sits in, and no other", () => {
  expect(
    closed("push", "/feed#s-42", { hashChange: true, sourceElement: link }),
  ).toEqual(AROUND_THE_LINK)
  expect(closed("replace", "/feed#s-42", { sourceElement: link })).toEqual(
    AROUND_THE_LINK,
  )
  expect(
    closed("push", "/feed#s-42", { hashChange: true, sourceElement: {} }),
  ).toEqual([])
})

test("a client router that updates the URL in place closes the overlays around the focused link, and a focused field keeps them open", () => {
  activeElement = link
  expect(closed("replace", "/feed?sort=new")).toEqual(AROUND_THE_LINK)
  expect(closed("push", "/feed#s-42", { hashChange: true })).toEqual(
    AROUND_THE_LINK,
  )
  activeElement = field
  expect(closed("replace", "/feed?sort=new")).toEqual([])
  activeElement = null
})

test("a download and a cancelled navigation keep them open", () => {
  expect(
    closed("push", "/report.pdf", { downloadRequest: "report.pdf" }),
  ).toEqual([])
  expect(closed("push", "/elsewhere", { defaultPrevented: true })).toEqual([])
})
