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
  const range = input.closest(".ui-range")
  if (!range) return
  const output = range.querySelector(":scope > output.ui-value[data-live]")
  const suffix = output?.dataset.suffix ?? ""
  if (output) {
    const text = `${value}${suffix}`
    const node = output.firstChild
    if (node instanceof Text && !node.nextSibling) node.data = text
    else output.textContent = text
    if (suffix) {
      input.setAttribute("aria-valuetext", text)
      return
    }
  }
  const options = [...(input.list?.options ?? [])]
  if (!options.some((option) => option.label)) return
  const label = options.find(
    (option) => Number(option.value) === Number(value),
  )?.label
  if (label) input.setAttribute("aria-valuetext", label)
  else input.removeAttribute("aria-valuetext")
}

const RANGES = '.ui-range input[type="range"]'

function sync(root = document) {
  for (const input of root.querySelectorAll(RANGES)) update(input)
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
  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue
        if (isRange(node)) update(node)
        for (const input of node.querySelectorAll(
          '.ui-range input[type="range"]',
        )) {
          update(input)
        }
      }
    }
  }).observe(document, { childList: true, subtree: true })
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => sync(), { once: true })
  } else {
    sync()
  }
  new MutationObserver((records) => {
    for (const { addedNodes } of records) {
      for (const node of addedNodes) {
        if (!(node instanceof Element)) continue
        if (node.matches(RANGES)) update(node)
        else sync(node)
      }
    }
  }).observe(document, { childList: true, subtree: true })
}

export function initRange() {
  sync()
}
