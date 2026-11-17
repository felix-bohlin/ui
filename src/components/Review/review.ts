export const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`

export const progressMaps = (onCell: (key: string) => void) => {
  const maps = [
    ...document.querySelectorAll<HTMLElement>("[data-progress-map]"),
  ]
  const cells = new Map<string, HTMLElement[]>()
  for (const map of maps) {
    for (const cell of map.querySelectorAll<HTMLElement>("[data-map-key]")) {
      const key = cell.dataset.mapKey!
      cells.set(key, [...(cells.get(key) ?? []), cell])
    }
    map.addEventListener("click", (event) => {
      const key = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-map-key]",
      )?.dataset.mapKey
      if (!key) return
      event.preventDefault()
      onCell(key)
    })
  }

  const links = [
    ...document.querySelectorAll<HTMLElement>("[data-map-section]"),
  ]
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        for (const link of links) {
          if (link.dataset.mapSection === entry.target.id)
            link.setAttribute("aria-current", "location")
          else link.removeAttribute("aria-current")
        }
      }
    },
    { rootMargin: "-20% 0px -70% 0px" },
  )
  for (const id of new Set(links.map((link) => link.dataset.mapSection!))) {
    const section = document.getElementById(id)
    if (section) observer.observe(section)
  }

  const update = (
    entries: { changed: boolean; key: string; stage: string }[],
  ) => {
    for (const { changed, key, stage } of entries) {
      for (const cell of cells.get(key) ?? []) {
        if (cell.dataset.stage !== stage) {
          cell.toggleAttribute("data-pop", true)
          cell.addEventListener(
            "animationend",
            () => cell.removeAttribute("data-pop"),
            { once: true },
          )
        }
        cell.dataset.stage = stage
        cell.toggleAttribute("data-changed", changed)
      }
    }

    for (const map of maps) {
      const complete = new Set(map.dataset.progressComplete!.split(" "))
      const label = map.dataset.progressLabel!
      const doneIn = (parent: Element) => {
        const own = [...parent.querySelectorAll<HTMLElement>("[data-map-key]")]
        return {
          done: own.filter((cell) => complete.has(cell.dataset.stage!)).length,
          total: own.length,
        }
      }
      const { done, total } = doneIn(map)
      const ratio = total ? done / total : 0
      map.style.setProperty("--ratio", String(ratio))
      map.querySelector("[data-map-percent]")!.textContent =
        `${Math.round(ratio * 100)}%`
      map.querySelector("[data-map-done]")!.textContent = String(done)
      for (const link of map.querySelectorAll<HTMLElement>(
        "[data-map-section]",
      )) {
        const section = doneIn(link)
        link.toggleAttribute(
          "data-map-complete",
          section.done === section.total,
        )
        link.querySelector("[data-map-count]")!.textContent =
          `${section.done}/${section.total}`
        link.querySelector("[data-map-count-text]")!.textContent =
          `, ${section.done} of ${section.total} ${label}`
      }
    }
  }

  return { update }
}

export const disclosure = (
  item: HTMLElement,
  onChange: () => void = () => {},
) => {
  const toggle = item.querySelector<HTMLButtonElement>(".review-toggle")!
  const body = item.querySelector<HTMLElement>(".review-body")!
  const isOpen = () => toggle.getAttribute("aria-expanded") === "true"
  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open))
    item.toggleAttribute("data-open", open)
    if (open) body.removeAttribute("hidden")
    else body.setAttribute("hidden", "until-found")
    onChange()
  }
  toggle.addEventListener("click", () => setOpen(!isOpen()))
  body.addEventListener("beforematch", () => setOpen(true))
  return { isOpen, setOpen, toggle }
}

export const statusLines = (elements: HTMLElement[], active: () => number) => {
  let timer = 0
  const clear = () => {
    clearTimeout(timer)
    for (const element of elements) element.textContent = ""
  }
  const set = (message: string) => {
    clear()
    elements[active()].textContent = message
    timer = window.setTimeout(clear, 6000)
  }
  return { clear, set }
}

export const highlightMatches = (parts: Element[], query: string) => {
  if (!("highlights" in CSS)) return
  if (!query) {
    CSS.highlights.delete("review-match")
    return
  }
  const ranges: Range[] = []
  for (const part of parts) {
    const walker = document.createTreeWalker(part, NodeFilter.SHOW_TEXT)
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent!.toLowerCase()
      for (
        let index = text.indexOf(query);
        index >= 0;
        index = text.indexOf(query, index + query.length)
      ) {
        const range = new Range()
        range.setStart(node, index)
        range.setEnd(node, index + query.length)
        ranges.push(range)
      }
    }
  }
  CSS.highlights.set("review-match", new Highlight(...ranges))
}

export const isTyping = (target: HTMLElement) =>
  Boolean(
    target.closest(
      "input:not([type=checkbox], [type=radio]), textarea, select",
    ),
  )

export const shortcutsOff = (event: KeyboardEvent) =>
  event.metaKey ||
  event.ctrlKey ||
  event.altKey ||
  Boolean(document.querySelector("dialog[open]"))
