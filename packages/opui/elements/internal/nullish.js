const NULLISH_REMOVES = [
  "accessKey",
  "autocapitalize",
  "autocorrect",
  "className",
  "contentEditable",
  "dir",
  "draggable",
  "enterKeyHint",
  "id",
  "inputMode",
  "lang",
  "slot",
  "spellcheck",
  "tabIndex",
  "title",
  "translate",
  "writingSuggestions",
]

export function removeOnNullish(element) {
  for (const name of NULLISH_REMOVES) {
    let proto = Object.getPrototypeOf(element.prototype)
    while (proto && !Object.hasOwn(proto, name)) {
      proto = Object.getPrototypeOf(proto)
    }
    const descriptor = proto && Object.getOwnPropertyDescriptor(proto, name)
    if (!descriptor?.set) continue
    const attribute = name === "className" ? "class" : name.toLowerCase()
    Object.defineProperty(element.prototype, name, {
      configurable: true,
      get: descriptor.get,
      set(value) {
        if (value == null) this.removeAttribute(attribute)
        else descriptor.set.call(this, value)
      },
    })
  }
}
