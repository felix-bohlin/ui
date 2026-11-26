import {
  computed,
  getCurrentInstance,
  type HTMLAttributes,
  type ObjectDirective,
  onBeforeUpdate,
  shallowRef,
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
  return computed(() => {
    const { style: _style, ...rest } = attrs
    return rest as HTMLAttributes
  })
}

export const useBound = () => {
  const instance = getCurrentInstance()
  const read = () => {
    const props = instance?.vnode.props
    return (
      !!props &&
      ["model-value", "modelValue", "onUpdate:modelValue"].some(
        (key) => key in props,
      )
    )
  }
  const bound = shallowRef(read())
  onBeforeUpdate(() => {
    bound.value = read()
  })
  return bound
}

export const vHydrated: ObjectDirective<Element> = {
  mounted: (element) => element.removeAttribute("data-hydrating"),
}
