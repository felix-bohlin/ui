/**
 * Toast runtime.
 *
 * - HTML owns structure (a <template> in the toaster, or one a trigger points to).
 * - CSS owns lifetime (enter, stack, expire, pause on hover and focus, leave).
 * - JS only puts toasts in the toaster and takes them out again.
 *
 * No setTimeout. No innerHTML of user data.
 */

const FALLBACK_TEMPLATE = `<div class="ui-toast">
  <div class="ui-content">
    <p class="ui-title"></p>
    <p class="ui-description"></p>
  </div>
</div>`

/**
 * @typedef {object} ToastOptions
 * @property {string} [description]
 * @property {number | string} [duration] Milliseconds, or a CSS time such as "3s".
 * @property {boolean} [persistent] Stays until it is dismissed.
 * @property {"critical" | "info" | "success" | "warning"} [severity]
 * @property {string} [title]
 */

/**
 * @param {string | HTMLTemplateElement | HTMLElement} [content] A title, a <template> to clone or an element.
 * @param {ToastOptions} [options]
 * @returns {HTMLElement}
 */
export function toast(content, options = {}) {
  const toaster = getToaster()
  const node = toToast(content, toaster)
  const { description, duration, persistent, severity } = options

  fillSlot(
    node,
    ".ui-title",
    typeof content === "string" ? content : options.title,
  )
  fillSlot(node, ".ui-description", description)

  if (severity) node.classList.add(`ui-${severity}`)
  if (persistent) node.classList.add("ui-persistent")
  if (duration) {
    node.style.setProperty(
      "--toast-duration",
      typeof duration === "number" ? `${duration}ms` : duration,
    )
  }

  raise(toaster)
  toaster.append(node)
  return node
}

/** @param {HTMLElement} node */
export function dismiss(node) {
  node.hidden = true
  Promise.allSettled(node.getAnimations().map((a) => a.finished)).then(() =>
    node.remove(),
  )
}

function getToaster() {
  return document.querySelector(".ui-toaster") ?? createToaster()
}

function createToaster() {
  const toaster = Object.assign(document.createElement("section"), {
    ariaLabel: "Notifications",
    ariaLive: "polite",
    className: "ui-toaster",
    id: "toaster",
    popover: "manual",
  })
  document.body.append(toaster)
  return toaster
}

function toToast(content, toaster) {
  if (content instanceof Element && !(content instanceof HTMLTemplateElement)) {
    return content
  }
  const template =
    content instanceof HTMLTemplateElement
      ? content
      : (toaster.querySelector(":scope > template") ?? fallbackTemplate())
  return template.content.firstElementChild.cloneNode(true)
}

function fallbackTemplate() {
  const template = document.createElement("template")
  template.innerHTML = FALLBACK_TEMPLATE
  return template
}

function fillSlot(root, selector, text) {
  const el = root.querySelector(selector)
  if (!el) return
  if (text) el.textContent = text
  else if (!el.textContent.trim()) el.remove()
}

function raise(toaster) {
  const modal = [...document.querySelectorAll("dialog:modal")].at(-1)
  if (modal && toaster.parentElement !== modal) {
    const home = toaster.parentElement
    move(toaster, modal)
    modal.addEventListener(
      "close",
      () => {
        move(toaster, home)
        raise(toaster)
      },
      { once: true },
    )
  }
  if (toaster.popover) {
    toaster.hidePopover()
    toaster.showPopover()
  }
}

function move(node, parent) {
  if ("moveBefore" in parent) parent.moveBefore(node, null)
  else parent.append(node)
}

if (typeof document !== "undefined") {
  document.addEventListener(
    "command",
    ({ command, source, target }) => {
      const isToaster = target.matches(".ui-toaster")
      if (
        command === "--show-toast" &&
        (isToaster || target instanceof HTMLTemplateElement)
      ) {
        const { dataset } = source
        toast(isToaster ? dataset.title : target, {
          ...dataset,
          persistent: "persistent" in dataset,
        })
      }
      if (command === "--dismiss-toast" && isToaster) {
        const own = source.closest(".ui-toast")
        for (const node of own ? [own] : target.querySelectorAll(".ui-toast")) {
          dismiss(node)
        }
      }
    },
    { capture: true },
  )

  document.addEventListener("animationend", ({ animationName, target }) => {
    if (animationName === "toast-expire") target.remove()
  })

  raise(getToaster())
}
