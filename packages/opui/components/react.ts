import { useCallback, type Ref } from "react"

const assign = <T extends HTMLElement>(
  ref: Ref<T> | undefined,
  element: T | null,
) => {
  if (typeof ref === "function") return ref(element)
  if (ref) ref.current = element
}

export const useListener = <
  E extends Event,
  T extends HTMLElement = HTMLElement,
>(
  ref: Ref<T> | undefined,
  type: string,
  listener: ((event: E) => void) | undefined,
) =>
  useCallback(
    (element: T) => {
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
