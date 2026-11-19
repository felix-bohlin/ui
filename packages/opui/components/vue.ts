import {
  computed,
  getCurrentInstance,
  type HTMLAttributes,
  type ObjectDirective,
  type Slot,
  useAttrs,
} from "vue"

export type Class = {
  class?: HTMLAttributes["class"]
}

export type DefaultSlots = {
  default?: Slot
}

export const useInputAttrs = () => {
  const attrs = useAttrs()
  return computed(
    () =>
      Object.fromEntries(
        Object.entries(attrs).filter(([key]) => key !== "style"),
      ) as HTMLAttributes,
  )
}

export const useBound = () => {
  const props = getCurrentInstance()?.vnode.props
  return (
    !!props &&
    ["model-value", "modelValue", "onUpdate:modelValue"].some(
      (key) => key in props,
    )
  )
}

export const vHydrated: ObjectDirective<Element> = {
  mounted: (element) => element.removeAttribute("data-hydrating"),
}
