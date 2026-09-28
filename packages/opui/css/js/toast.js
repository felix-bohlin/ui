/**
 * Toast manager.
 *
 * - JS owns structure (build the toast, fill title/description via textContent).
 * - CSS owns lifetime (via attr(data-duration type(<time>))).
 * - JS owns lifecycle (append, remove on animationend).
 *
 * No setTimeout. No popovertargetaction. No innerHTML of user data.
 */

const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`

export function initToastManager() {
  const manager = document.getElementById("toast-manager")
  if (!manager || manager.dataset.ready) return
  manager.dataset.ready = ""

  if (!manager.matches(":popover-open")) manager.showPopover()

  manager.addEventListener("command", (event) => {
    if (event.command !== "--show-toast") return
    manager.append(createToast(event.source?.dataset ?? {}))
  })

  window.showToast = (options = {}) => manager.append(createToast(options))
}

function createToast({ description, duration, severity, title }) {
  const toast = element("div", "ui-toast")
  const content = element("div", "ui-content")
  const close = element("button", "ui-close-button")

  if (title) content.append(element("div", "ui-title", title))
  if (description) content.append(element("div", "ui-description", description))

  close.type = "button"
  close.setAttribute("aria-label", "Close")
  close.innerHTML = CLOSE_ICON
  close.addEventListener("click", () => toast.classList.add("ui-exiting"))

  if (duration) toast.dataset.duration = duration
  if (severity) toast.dataset.severity = severity
  toast.addEventListener("animationend", (event) => {
    if (event.animationName === "toast-exit") toast.remove()
  })
  toast.append(element("span", "ui-icon"), content, close)

  return toast
}

function element(tag, className, text) {
  const node = document.createElement(tag)
  node.className = className
  if (text) node.textContent = text
  return node
}
