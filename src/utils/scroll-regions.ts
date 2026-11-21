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
    selector: ":is(.docs-table, .token-tiers) > .scroll",
  },
  {
    selector: "#main-content table:not([class], .example-preview *)",
  },
]

const update = (element: Element) => {
  const region = REGIONS.find(({ selector }) => element.matches(selector))
  if (!region) return
  if (element.scrollWidth > element.clientWidth) {
    element.setAttribute("tabindex", "0")
    if (region.name) {
      element.setAttribute("aria-label", region.name(element))
      element.setAttribute("role", "group")
    }
  } else {
    element.removeAttribute("tabindex")
    if (region.name) {
      element.removeAttribute("aria-label")
      element.removeAttribute("role")
    }
  }
}

const observer = new ResizeObserver((entries) => {
  for (const { target } of entries) update(target)
})

export const observeScrollRegions = () => {
  for (const { selector } of REGIONS) {
    for (const element of document.querySelectorAll(selector)) {
      observer.observe(element)
    }
  }
}

observeScrollRegions()
