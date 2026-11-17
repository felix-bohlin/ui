export const callHandler = <E extends Event>(handler: unknown, event: E) => {
  if (typeof handler === "function") handler(event)
  else if (Array.isArray(handler) && typeof handler[0] === "function")
    handler[0](handler[1], event)
}

export const checkedProps = <C, D>(checked: C | undefined, fallback?: D) =>
  checked === undefined
    ? { defaultChecked: fallback }
    : { checked, defaultChecked: checked }

export const seedChecked =
  (report: (input: HTMLInputElement) => void) => (input: HTMLInputElement) => {
    if (
      input.checked !== input.defaultChecked &&
      (input.checked || input.type === "checkbox")
    ) {
      report(input)
    }
  }
