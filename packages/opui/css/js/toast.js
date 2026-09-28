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

export function initToastManager() {
  const manager = document.getElementById("toast-manager")
  if (!manager) return

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

function showToast(options, manager) {
  const node = buildToast(options.template || "toast-template")
  if (!node) return

  fillSlot(node, "[data-toast-title]", options.title)
  fillSlot(node, "[data-toast-description]", options.description)

  if (options.severity) node.dataset.severity = options.severity
  if (options.duration) node.dataset.duration = options.duration

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
