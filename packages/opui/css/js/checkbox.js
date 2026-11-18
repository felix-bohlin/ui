/**
 * Checkbox runtime helpers.
 *
 * `indeterminate` is a JavaScript-only property on HTMLInputElement - the
 * attribute alone has no effect. We mark inputs with `data-indeterminate` at
 * render time and apply the property here, on initial load, when the
 * attribute changes and when a checkbox is added, including after Astro's
 * view transitions swap the DOM.
 */

const MARKED = 'input[type="checkbox"][data-indeterminate]'

/** @param {ParentNode} [root] */
export function activateIndeterminate(root = document) {
  root.querySelectorAll(MARKED).forEach((el) => {
    el.indeterminate = true
  })
}

/** @param {HTMLInputElement} input */
export function syncIndeterminate(input) {
  input.indeterminate = input.hasAttribute("data-indeterminate")
}

let observer

export function initCheckbox() {
  activateIndeterminate()
  if (observer) return
  observer = new MutationObserver((records) => {
    for (const record of records) {
      const { target } = record
      if (record.type === "attributes") {
        if (target instanceof HTMLInputElement && target.type === "checkbox") {
          syncIndeterminate(target)
        }
        continue
      }
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue
        if (node.matches(MARKED)) node.indeterminate = true
        if (node.firstElementChild) activateIndeterminate(node)
      }
    }
  })
  observer.observe(document, {
    attributeFilter: ["data-indeterminate"],
    childList: true,
    subtree: true,
  })
}

if (typeof document !== "undefined") initCheckbox()
