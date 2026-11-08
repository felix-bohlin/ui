const Base = globalThis.HTMLElement ?? class {}

const BUTTON = "th[data-sort] > button"
const LABELS = {
  ascending: "{column}, sorted ascending",
  descending: "{column}, sorted descending",
}

const keyOf = (cell) =>
  cell?.dataset.sortValue ?? cell?.textContent.trim().replace(/\s+/g, " ") ?? ""

export class SortableTable extends Base {
  #controller
  #status
  #text = ""
  #ready = false

  get table() {
    return this.querySelector("table")
  }

  connectedCallback() {
    this.#controller = new AbortController()
    this.addEventListener(
      "click",
      (event) => {
        if (this.hasAttribute("data-hydrating")) return
        const button = event.target.closest?.(BUTTON)
        if (button && this.contains(button)) this.sort(button.parentElement)
      },
      { signal: this.#controller.signal },
    )
  }

  disconnectedCallback() {
    this.#controller?.abort()
  }

  sort(header, direction) {
    const table = this.table
    if (!table || !header) return
    const next =
      direction ??
      (header.getAttribute("aria-sort") === "ascending"
        ? "descending"
        : "ascending")
    const column = header.cellIndex
    const event = new CustomEvent("sort", {
      bubbles: true,
      cancelable: true,
      detail: { column, direction: next, header },
    })
    const rows = this.dispatchEvent(event)
    for (const cell of table.querySelectorAll("th[aria-sort]")) {
      if (cell !== header) cell.removeAttribute("aria-sort")
    }
    header.setAttribute("aria-sort", next)
    if (rows) this.#reorder(table, column, next)
    this.#announce(header, next)
  }

  #announce(header, direction) {
    const name =
      header.querySelector(":scope > button")?.textContent.trim() ?? ""
    const label = this.getAttribute(`${direction}-label`) ?? LABELS[direction]
    this.#text = label.replace("{column}", name)
    if (this.#status?.isConnected) {
      if (this.#ready) this.#status.textContent = this.#text
      return
    }
    const rendered = this.querySelector(':scope > [role="status"]')
    if (rendered) {
      this.#status = rendered
      this.#ready = true
      rendered.textContent = this.#text
      return
    }
    const status = this.ownerDocument.createElement("span")
    status.className = "ui-sr-only"
    status.setAttribute("role", "status")
    this.append(status)
    this.#status = status
    this.#ready = false
    setTimeout(() => {
      this.#ready = true
      status.textContent = this.#text
    }, 100)
  }

  #reorder(table, column, direction) {
    const collator = new Intl.Collator(
      this.closest("[lang]")?.getAttribute("lang") || undefined,
      { numeric: true },
    )
    const sign = direction === "descending" ? -1 : 1
    for (const body of table.tBodies) {
      const rows = [...body.rows]
      rows
        .map((row, index) => ({ index, key: keyOf(row.cells[column]), row }))
        .sort(
          (a, b) => sign * collator.compare(a.key, b.key) || a.index - b.index,
        )
        .forEach(({ row }) => body.append(row))
    }
  }
}

if (globalThis.customElements && !customElements.get("opui-sortable-table")) {
  customElements.define("opui-sortable-table", SortableTable)
}
