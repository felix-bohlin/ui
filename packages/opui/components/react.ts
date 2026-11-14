import { useCallback, type Ref } from "react"

const assign = (
  ref: Ref<HTMLElement> | undefined,
  element: HTMLElement | null,
) => {
  if (typeof ref === "function") return ref(element)
  if (ref) ref.current = element
}

export const useListener = <E extends Event>(
  ref: Ref<HTMLElement> | undefined,
  type: string,
  listener: ((event: E) => void) | undefined,
) =>
  useCallback(
    (element: HTMLElement) => {
      const cleanup = assign(ref, element)
      const handle = listener as EventListener | undefined
      if (handle) element.addEventListener(type, handle)
      return () => {
        if (handle) element.removeEventListener(type, handle)
        if (typeof cleanup === "function") cleanup()
        else assign(ref, null)
      }
    },
    [listener, ref, type],
  )

export const useHydrated = (ref: (element: HTMLElement) => () => void) =>
  useCallback(
    (element: HTMLElement) => {
      const cleanup = ref(element)
      element.removeAttribute("data-hydrating")
      return cleanup
    },
    [ref],
  )
