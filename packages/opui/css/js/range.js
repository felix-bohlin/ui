const wired = new WeakSet()

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
    const update = () => {
      output.textContent = `${input.value}${suffix}`
      if (suffix) input.setAttribute("aria-valuetext", output.textContent)
    }
    input.addEventListener("input", update)
    input.form?.addEventListener("reset", () => setTimeout(update))
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
