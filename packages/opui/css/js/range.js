function resetValue(input) {
  const probe = document.createElement("input")
  for (const name of ["type", "min", "max", "step", "value"]) {
    const value = input.getAttribute(name)
    if (value !== null) probe.setAttribute(name, value)
  }
  return probe.value
}

const isRange = (target) =>
  target instanceof HTMLInputElement && target.type === "range"

// Mirror the slider's current value into its associated <output> on every
// input event. Ignores ranges without a value display.
function update(input, value = input.value) {
  const output = input
    .closest(".ui-range")
    ?.querySelector(":scope > output.ui-value[data-live]")
  if (!output) return
  const suffix = output.dataset.suffix ?? ""
  const text = `${value}${suffix}`
  const node = output.firstChild
  if (node instanceof Text && !node.nextSibling) node.data = text
  else output.textContent = text
  if (suffix) input.setAttribute("aria-valuetext", text)
}

function sync() {
  for (const input of document.querySelectorAll(
    '.ui-range input[type="range"]',
  )) {
    update(input)
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("input", (event) => {
    if (isRange(event.target)) update(event.target)
  })
  document.addEventListener("reset", (event) => {
    const form = event.target
    if (!(form instanceof HTMLFormElement)) return
    setTimeout(() => {
      if (event.defaultPrevented) return
      for (const input of form.elements) {
        if (isRange(input)) update(input, resetValue(input))
      }
    })
  })
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", sync, { once: true })
  } else {
    sync()
  }
}

export function initRange() {
  sync()
}
