const WATCH = Symbol.for("opui-value-watch")

function descriptorOf(object) {
  for (let proto = object; proto; proto = Object.getPrototypeOf(proto)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, "value")
    if (descriptor) return descriptor
  }
}

export function watchValue(control, update) {
  let watch = control[WATCH]
  if (!watch) {
    const own = Object.getOwnPropertyDescriptor(control, "value")
    const { get, set } = own ?? descriptorOf(control)
    const updates = new Set()
    const value = {
      configurable: true,
      get() {
        return get.call(this)
      },
      set(next) {
        set.call(this, next)
        for (const each of updates) each()
      },
    }
    let restore
    if (own) {
      Object.defineProperty(control, "value", { ...own, ...value })
      restore = () => {
        if (
          Object.getOwnPropertyDescriptor(control, "value")?.set === value.set
        )
          Object.defineProperty(control, "value", own)
      }
    } else {
      const proto = Object.getPrototypeOf(control)
      function Watched() {}
      Watched.prototype = Object.create(proto, {
        constructor: { configurable: true, value: Watched, writable: true },
        value,
      })
      Object.setPrototypeOf(control, Watched.prototype)
      restore = () => {
        if (Object.getPrototypeOf(control) === Watched.prototype)
          Object.setPrototypeOf(control, proto)
      }
    }
    watch = { restore, updates }
    control[WATCH] = watch
  }
  watch.updates.add(update)
  return () => {
    watch.updates.delete(update)
    if (watch.updates.size) return
    watch.restore()
    delete control[WATCH]
  }
}

export function ariaDisabled(element) {
  return element?.getAttribute("aria-disabled") === "true"
}

export function mirrorDisabled(button, control, inert = false) {
  if (button.disabled !== control.disabled) button.disabled = control.disabled
  const next = inert || ariaDisabled(control)
  if (next !== ariaDisabled(button)) {
    if (next) button.setAttribute("aria-disabled", "true")
    else button.removeAttribute("aria-disabled")
  }
}

export function followControl(
  part,
  { attributes, button, events = [], fieldsets = false, sync, value = false },
) {
  let controller
  let observer
  let unwatch
  let watched

  const control = () => {
    if (!button) {
      return part.closest(".ui-field")?.querySelector("input, textarea") ?? null
    }
    const id = button()?.getAttribute("commandfor")
    const found = id ? part.getRootNode().getElementById?.(id) : null
    return found instanceof HTMLInputElement ? found : null
  }

  const follow = () => {
    if (value) {
      const current = control()
      if (current !== watched) {
        unwatch?.()
        unwatch = current ? watchValue(current, follow) : undefined
        watched = current
      }
    }
    sync()
  }

  const onForm = (types, listener, options) => {
    for (const type of types) {
      part.getRootNode().addEventListener(
        type,
        (event) => {
          if (event.target === control()?.form) listener(event)
        },
        { ...options, signal: controller.signal },
      )
    }
  }

  return {
    get control() {
      return control()
    },
    connect() {
      controller = new AbortController()
      const { signal } = controller
      const field =
        part.closest(".ui-field") ?? (button ? part.parentNode : null)
      for (const type of events) {
        field.addEventListener(type, follow, { signal })
      }
      if (value) onForm(["reset"], () => setTimeout(follow))
      observer = new MutationObserver(follow)
      if (field) {
        observer.observe(field, {
          attributeFilter: attributes,
          childList: true,
          subtree: true,
        })
      }
      for (
        let fieldset = fieldsets ? part.closest("fieldset") : null;
        fieldset;
        fieldset = fieldset.parentElement?.closest("fieldset")
      ) {
        observer.observe(fieldset, { attributeFilter: ["disabled"] })
      }
      follow()
      queueMicrotask(follow)
      return signal
    },
    disconnect() {
      controller?.abort()
      observer?.disconnect()
      unwatch?.()
      unwatch = undefined
      watched = undefined
    },
    onForm,
  }
}
