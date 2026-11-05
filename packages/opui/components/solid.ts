export const callHandler = <E extends Event>(handler: unknown, event: E) => {
  if (typeof handler === "function") handler(event)
  else if (Array.isArray(handler) && typeof handler[0] === "function")
    handler[0](handler[1], event)
}

export const defaultValueProp = (value: unknown): object => ({
  "prop:defaultValue": value,
})
