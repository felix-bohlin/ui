import { useCallback, useRef, type Ref } from "react"

const assign = <T extends HTMLElement>(
  ref: Ref<T> | undefined,
  element: T | null,
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

export const useSeedChecked = (
  ref: Ref<HTMLInputElement> | undefined,
  change: (input: HTMLInputElement) => void,
) => {
  const seed = useRef<typeof change | undefined>(change)
  return useCallback(
    (input: HTMLInputElement) => {
      const cleanup = assign(ref, input)
      const report = seed.current
      seed.current = undefined
      if (
        report &&
        input.checked !== input.defaultChecked &&
        (input.checked || input.type === "checkbox")
      ) {
        report(input)
      }
      return () => {
        if (typeof cleanup === "function") cleanup()
        else assign(ref, null)
      }
    },
    [ref],
  )
}
