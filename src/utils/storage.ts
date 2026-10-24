export const copySelection = (field: HTMLTextAreaElement) => {
  field.select()
  field.setSelectionRange(0, field.value.length)
  try {
    return document.execCommand("copy")
  } catch {
    return false
  }
}

const copyWithField = (text: string) => {
  const active = document.activeElement
  const field = document.createElement("textarea")
  field.readOnly = true
  field.style.cssText =
    "font-size: 16px; inset-block-start: 0; opacity: 0; position: fixed;"
  field.value = text
  document.body.append(field)
  const copied = copySelection(field)
  field.remove()
  if (active instanceof HTMLElement) active.focus({ preventScroll: true })
  return copied
}

export const copyText = async (text: string) => {
  if (!isSecureContext) return copyWithField(text)
  try {
    await Promise.race([
      navigator.clipboard.writeText(text),
      new Promise((_, reject) => setTimeout(reject, 2000)),
    ])
    return true
  } catch {
    return copyWithField(text)
  }
}

export const readStored = <T>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : JSON.parse(value)
  } catch {
    return fallback
  }
}

export const removeStored = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch {}
}

export const writeStored = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
