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

export const useListener = <E extends Event>(
  ref: Ref<HTMLElement> | undefined,
  type: string,
  listener: ((event: E) => void) | undefined,
) => {
  const latest = useRef(listener)
  useInsertionEffect(() => {
    latest.current = listener
  })
  return useCallback(
    (element: HTMLElement) => {
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

export const useHydrated = (ref: (element: HTMLElement) => () => void) =>
  useCallback(
    (element: HTMLElement) => {
      const cleanup = ref(element)
      element.removeAttribute("data-hydrating")
      return cleanup
    },
    [ref],
  )

const seeded = new WeakSet<HTMLInputElement>()

export const seedChecked =
  (report: (input: HTMLInputElement) => void) =>
  (input: HTMLInputElement | null) => {
    if (!input || seeded.has(input)) return
    seeded.add(input)
    if (
      input.checked !== input.defaultChecked &&
      (input.checked || input.type === "checkbox")
    ) {
      report(input)
    }
  }

export const useSeedChecked = (
  ref: Ref<HTMLInputElement> | undefined,
  report: (input: HTMLInputElement) => void,
) => {
  const first = useRef(report)
  return useCallback(
    (input: HTMLInputElement) => {
      const detach = attach(ref, input)
      seedChecked(first.current)(input)
      return detach
    },
    [ref],
  )
}
