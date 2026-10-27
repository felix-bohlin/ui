const wired = new WeakSet()

function resetValue(input) {
  const probe = document.createElement("input")
  for (const name of ["type", "min", "max", "step", "value"]) {
    const value = input.getAttribute(name)
    if (value !== null) probe.setAttribute(name, value)
  }
  return probe.value
}

// Mirror the slider's current value into its associated <output> on every
// input event. Idempotent: each .ui-range is wired once, and ignores ranges
// without a value display.
function wireRanges() {
  for (const output of document.querySelectorAll(
    ".ui-range > output.ui-value[data-live]",
  )) {
    const input = output.parentElement?.querySelector('input[type="range"]')
    if (!input || wired.has(output)) continue
    wired.add(output)
    const suffix = output.dataset.suffix ?? ""
    const update = (value = input.value) => {
      const text = `${value}${suffix}`
      const node = output.firstChild
      if (node instanceof Text && !node.nextSibling) node.data = text
      else output.textContent = text
      if (suffix) input.setAttribute("aria-valuetext", text)
    }
    input.addEventListener("input", () => update())
    input.form?.addEventListener("reset", (event) =>
      setTimeout(() => {
        if (!event.defaultPrevented) update(resetValue(input))
      }),
    )
    update()
  }
}

let initialized = false

export function initRange() {
  wireRanges()
  if (initialized) return
  initialized = true
  document.addEventListener("astro:after-swap", () => wireRanges())
}
