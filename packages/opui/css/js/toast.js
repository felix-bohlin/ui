/**
 * Toast manager.
 *
 * - HTML owns structure (via <template id="toast-template">).
 * - CSS owns lifetime (via attr(data-duration type(<time>))).
 * - JS owns lifecycle (clone template, fill slots, append, remove on animationend).
 *
 * No setTimeout. No popovertargetaction. No innerHTML of user data.
 */

const FALLBACK_TEMPLATE = `<div class="ui-toast" role="alert">
  <span class="ui-icon" data-toast-icon></span>
  <div class="ui-content">
    <div class="ui-title" data-toast-title></div>
    <div class="ui-description" data-toast-description></div>
  </div>
  <button class="ui-close-button" data-toast-close type="button" aria-label="Close">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  </button>
</div>`

/**
 * @typedef {object} ToastOptions
 * @property {string} [closeLabel] Accessible name for the close button.
 * @property {string} [description]
 * @property {string} [duration] A CSS time such as "3s" or "3000ms".
 * @property {"critical" | "info" | "success" | "warning"} [severity]
 * @property {string} [template] The id of a <template> to clone.
 * @property {string} [title]
 */

export function initToastManager() {
  const manager = document.getElementById("toast-manager")
  if (!manager || manager.dataset.toastManager) return
  manager.dataset.toastManager = ""

  try {
    manager.showPopover()
  } catch {
    /* already open or unsupported */
  }

  manager.addEventListener("command", (event) => {
    if (event.command !== "--show-toast") return
    const trigger = event.source
    if (!trigger) return

    const data = trigger.dataset || {}
    showToast(
      {
        closeLabel: data.closeLabel,
        description: data.description,
        duration: data.duration,
        severity: data.severity,
        template: data.template,
        title: data.title || trigger.textContent?.trim() || "",
      },
      manager,
    )
  })

  window.showToast = (options) => showToast(options || {}, manager)
}

/**
 * @param {ToastOptions} [options]
 * @param {HTMLElement | null} [manager]
 */
export function showToast(
  options = {},
  manager = document.getElementById("toast-manager"),
) {
  if (!manager) return
  const node = buildToast(options.template || "toast-template")
  if (!node) return

  fillSlot(node, "[data-toast-title]", options.title)
  fillSlot(node, "[data-toast-description]", options.description)

  if (options.severity) node.dataset.severity = options.severity
  if (options.duration) node.dataset.duration = options.duration
  if (options.closeLabel) {
    node
      .querySelector("[data-toast-close]")
      ?.setAttribute("aria-label", options.closeLabel)
  }

  wireToast(node)
  manager.appendChild(node)
}

function buildToast(templateId) {
  const tpl = document.getElementById(templateId)
  if (tpl?.content?.firstElementChild) {
    return tpl.content.firstElementChild.cloneNode(true)
  }
  const wrap = document.createElement("div")
  wrap.innerHTML = FALLBACK_TEMPLATE.trim()
  return wrap.firstElementChild
}

function fillSlot(root, selector, text) {
  const el = root.querySelector(selector)
  if (!el) return
  if (text == null || text === "") {
    el.remove()
    return
  }
  el.textContent = text
}

function wireToast(node) {
  node.querySelector("[data-toast-close]")?.addEventListener("click", () => {
    node.classList.add("ui-exiting")
  })
  node.addEventListener("animationend", (event) => {
    if (event.animationName === "toast-exit") node.remove()
  })
}
