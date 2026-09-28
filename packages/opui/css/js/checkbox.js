/**
 * Checkbox runtime helpers.
 *
 * `indeterminate` is a JavaScript-only property on HTMLInputElement - the
 * attribute alone has no effect. We mark inputs with `data-indeterminate` at
 * render time and apply the property here, both on initial load and after
 * Astro's view transitions swap the DOM.
 */

export function activateIndeterminate(root = document) {
  root
    .querySelectorAll('input[type="checkbox"][data-indeterminate]')
    .forEach((el) => {
      el.indeterminate = true
    })
}

export function initCheckbox() {
  activateIndeterminate()
  document.addEventListener("astro:after-swap", () => activateIndeterminate())
}
