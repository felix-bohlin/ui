const REGIONS = [
  {
    name: (element: Element) =>
      element
        .closest(".code-block")
        ?.querySelector(".code-title")
        ?.textContent?.trim() || "Code",
    selector: ".code-block pre",
  },
  {
    name: (element: Element) =>
      element
        .closest("section[id]")
        ?.querySelector("[data-heading]")
        ?.getAttribute("data-heading") || "Table",
    selector: ".docs-table > .scroll",
  },
  {
    selector: "#main-content table:not([class], .example-preview *)",
  },
]

const set = (element: Element, name: string, value?: string) => {
  if (value === undefined) {
    if (element.hasAttribute(name)) element.removeAttribute(name)
  } else if (element.getAttribute(name) !== value) {
    element.setAttribute(name, value)
  }
}

const update = (element: Element, scrolls: boolean) => {
  const region = REGIONS.find(({ selector }) => element.matches(selector))
  if (!region) return
  set(element, "tabindex", scrolls ? "0" : undefined)
  if (region.name) {
    set(element, "aria-label", scrolls ? region.name(element) : undefined)
    set(element, "role", scrolls ? "group" : undefined)
  }
}

const observer = new ResizeObserver((entries) => {
  const measured = entries.map(({ target }) => ({
    scrolls: target.scrollWidth > target.clientWidth,
    target,
  }))
  for (const { scrolls, target } of measured) update(target, scrolls)
})

export const observeScrollRegions = () => {
  for (const { selector } of REGIONS) {
    for (const element of document.querySelectorAll(selector)) {
      observer.observe(element)
    }
  }
}

observeScrollRegions()
