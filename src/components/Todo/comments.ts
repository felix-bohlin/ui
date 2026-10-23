import { copyText, readStored, writeStored } from "../../utils/storage"

export const copyOrSelect = async (
  text: string,
  fallback: HTMLDialogElement,
) => {
  const copied = await copyText(text)
  if (!copied) {
    const field = fallback.querySelector("textarea")!
    field.value = text
    fallback.showModal()
    field.focus()
    field.setSelectionRange(0, text.length)
  }
  return copied
}

type CommentOptions = {
  items: HTMLElement[]
  keyOf: (item: HTMLElement) => string
  onError: () => void
  storageKey: string
}

export const trackComments = ({
  items,
  keyOf,
  onError,
  storageKey,
}: CommentOptions) => {
  const fieldOf = (item: HTMLElement) => item.querySelector("textarea")!
  const savedOf = (item: HTMLElement) =>
    item.querySelector("[data-comment-saved]")!
  const pending = new Map<HTMLElement, number>()

  const save = (item: HTMLElement) => {
    clearTimeout(pending.get(item))
    pending.delete(item)
    const value = fieldOf(item).value
    const comments = readStored<Record<string, string>>(storageKey, {})
    if (value.trim()) comments[keyOf(item)] = value
    else delete comments[keyOf(item)]
    if (writeStored(storageKey, comments)) {
      savedOf(item).textContent = value.trim() ? "Saved" : ""
    } else {
      savedOf(item).textContent = "Not saved"
      onError()
    }
  }

  const saveAll = () => [...pending.keys()].forEach(save)

  const saved = readStored<Record<string, string>>(storageKey, {})
  for (const item of items) {
    const field = fieldOf(item)
    field.value = saved[keyOf(item)] ?? ""
    field.addEventListener("input", () => {
      clearTimeout(pending.get(item))
      pending.set(
        item,
        window.setTimeout(() => save(item), 500),
      )
    })
    field.addEventListener("blur", () => {
      if (pending.has(item)) save(item)
    })
  }

  addEventListener("pagehide", saveAll)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") saveAll()
  })

  const clear = () => {
    for (const item of items) {
      clearTimeout(pending.get(item))
      fieldOf(item).value = ""
      savedOf(item).textContent = ""
    }
    pending.clear()
    writeStored(storageKey, {})
  }

  return {
    clear,
    commentOf: (item: HTMLElement) => fieldOf(item).value.trim(),
    saveAll,
  }
}
