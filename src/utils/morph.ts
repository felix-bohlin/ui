export const morph = (change: () => void) => {
  if (
    typeof document.startViewTransition !== "function" ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    change()
    return Promise.resolve()
  }
  return document.startViewTransition(change).updateCallbackDone
}
