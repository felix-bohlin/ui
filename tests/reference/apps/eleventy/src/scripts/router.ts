export const PAGE_LOAD = "reference:page-load"

const swap = async (url: string, signal: AbortSignal) => {
  const response = await fetch(url, { signal })
  const next = new DOMParser().parseFromString(
    await response.text(),
    "text/html",
  )
  document.title = next.title
  document.body.replaceWith(next.body)
  document.dispatchEvent(new Event(PAGE_LOAD))
}

export const startRouter = () => {
  navigation.addEventListener("navigate", (event) => {
    if (
      !event.canIntercept ||
      event.hashChange ||
      event.downloadRequest !== null ||
      event.formData
    ) {
      return
    }
    event.intercept({
      handler: () => swap(event.destination.url, event.signal),
    })
  })
  document.dispatchEvent(new Event(PAGE_LOAD))
}
