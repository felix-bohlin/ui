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

export type DefaultSlots = {
  default?: Slot
}

export const useInputAttrs = () => {
  const attrs = useAttrs()
  return computed(() => {
    const { class: _class, style: _style, ...rest } = attrs
    return rest as HTMLAttributes
  })
}

export const useRestAttrs = <Attributes = HTMLAttributes>() => {
  const attrs = useAttrs()
  return computed(() => {
    const { class: _class, ...rest } = attrs
    return rest as Attributes
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
