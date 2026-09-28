/**
 * Toast manager.
 *
 * - HTML owns the container (#toast-manager). Server-rendered toasts inside it work without JS.
 * - CSS owns lifetime (via attr(data-duration type(<time>))).
 * - JS owns lifecycle (build the toast, fill title/description via textContent, remove on animationend).
 *
 * No setTimeout. No popovertargetaction. No innerHTML of user data.
 */

const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`

let raisedAbove

export function toast(title, options = {}) {
  const manager = initToastManager()
  const node = element("div", "ui-toast")
  const content = element("div", "ui-content")
  const close = element("button", "ui-close-button")

  close.type = "button"
  close.setAttribute("aria-label", "Close")
  close.innerHTML = CLOSE_ICON
  node.append(element("span", "ui-icon"), content, close)

  let state = {}
  const handle = {
    dismiss: () => node.classList.add("ui-exiting"),
    update(next) {
      state = { ...state, ...next }
      content.replaceChildren(
        ...[
          element("div", "ui-title", state.title),
          element("div", "ui-description", state.description),
        ].filter((child) => child.textContent),
      )
      setData(node, "duration", state.duration)
      setData(node, "severity", state.severity)
      return handle
    },
  }

  handle.update({ ...options, title })
  raise(manager)
  manager.append(node)
  return handle
}

toast.promise = (promise, { error, loading, success }) => {
  const handle = toast(loading, { severity: "loading" })
  promise.then(
    (value) =>
      handle.update({ severity: "success", title: resolve(success, value) }),
    (reason) =>
      handle.update({ severity: "critical", title: resolve(error, reason) }),
  )
  return promise
}

export function initToastManager() {
  let manager = document.getElementById("toast-manager")
  if (!manager) {
    manager = element("output")
    manager.id = "toast-manager"
    manager.popover = "manual"
    manager.setAttribute("aria-live", "polite")
    manager.setAttribute("role", "status")
    document.body.append(manager)
  }
  if (manager.dataset.ready != null) return manager
  manager.dataset.ready = ""

  raise(manager)

  manager.addEventListener("command", (event) => {
    if (event.command !== "--show-toast") return
    const { title, ...options } = event.source?.dataset ?? {}
    toast(title, options)
  })
  manager.addEventListener("click", (event) => {
    if (event.target.closest(".ui-close-button")) {
      event.target.closest(".ui-toast")?.classList.add("ui-exiting")
    }
  })
  manager.addEventListener("animationend", (event) => {
    if (event.animationName === "toast-exit") event.target.remove()
  })

  window.showToast = ({ title, ...options } = {}) => toast(title, options)

  return manager
}

function raise(manager) {
  const modal = [...document.querySelectorAll("dialog:modal")].at(-1)
  if (manager.matches(":popover-open") && modal === raisedAbove) return
  raisedAbove = modal
  if (manager.matches(":popover-open")) manager.hidePopover()
  manager.showPopover()
}

function resolve(message, value) {
  return typeof message === "function" ? message(value) : message
}

function setData(node, key, value) {
  if (value) node.dataset[key] = value
  else delete node.dataset[key]
}

function element(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text) node.textContent = text
  return node
}
