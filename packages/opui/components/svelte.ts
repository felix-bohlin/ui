const resets = new WeakMap<Element, () => void>()
const following = new WeakSet<Document>()

const followResets = (document: Document) => {
  if (following.has(document)) return
  following.add(document)
  document.addEventListener(
    "reset",
    (event) => {
      const form = event.target as HTMLFormElement | null
      setTimeout(() => {
        if (event.defaultPrevented) return
        for (const element of form?.elements ?? []) resets.get(element)?.()
      })
    },
    { capture: true },
  )
}

export const relayChecked = (
  write: (input: HTMLInputElement) => void,
  ...reads: (() => boolean | undefined)[]
) => {
  let last: (boolean | undefined)[] | undefined
  return (input: HTMLInputElement) => {
    const values = reads.map((read) => read())
    if (!last) {
      const given = values.find((value) => value !== undefined)
      if (input.checked !== input.defaultChecked) {
        if (input.checked || input.type === "checkbox") write(input)
      } else if (given === undefined) write(input)
      else input.checked = given
    } else {
      const previous = last
      values.forEach((value, index) => {
        if (value !== undefined && value !== previous[index]) {
          input.checked = value
        }
      })
    }
    last = values
    const change = () => write(input)
    input.addEventListener("change", change)
    followResets(input.ownerDocument)
    resets.set(input, () => {
      if (reads.some((read) => read() !== input.checked)) write(input)
    })
    return () => {
      input.removeEventListener("change", change)
      resets.delete(input)
    }
  }
}

export const hydrated = (element: Element) => {
  element.removeAttribute("data-hydrating")
}
