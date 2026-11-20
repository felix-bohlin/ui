import { useCallback, useInsertionEffect, useRef, type Ref } from "react"

const assign = <T extends HTMLElement>(
  ref: Ref<T> | undefined,
  element: T | null,
) => {
  if (typeof ref === "function") return ref(element)
  if (ref) ref.current = element
}

const attach = <T extends HTMLElement>(ref: Ref<T> | undefined, element: T) => {
  const cleanup = assign(ref, element)
  return () => {
    if (typeof cleanup === "function") cleanup()
    else assign(ref, null)
  }
}

export const useListener = <
  E extends Event,
  T extends HTMLElement = HTMLElement,
>(
  ref: Ref<T> | undefined,
  type: string,
  listener: ((event: E) => void) | undefined,
) => {
  const latest = useRef(listener)
  useInsertionEffect(() => {
    latest.current = listener
  })
  return useCallback(
    (element: T) => {
      const detach = attach(ref, element)
      const handle = (event: Event) => latest.current?.(event as E)
      element.addEventListener(type, handle)
      return () => {
        element.removeEventListener(type, handle)
        detach()
      }
    },
    [ref, type],
  )
}

export const useHydrated = <T extends HTMLElement = HTMLElement>(
  ref: (element: T) => () => void,
) =>
  useCallback(
    (element: T) => {
      const cleanup = ref(element)
      element.removeAttribute("data-hydrating")
      return cleanup
    },
    [ref],
  )
