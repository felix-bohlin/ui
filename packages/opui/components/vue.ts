import { computed, type HTMLAttributes, type Slot, useAttrs } from "vue"

export type Class = {
  class?: HTMLAttributes["class"]
}

export type DefaultSlots = {
  default?: Slot
}

export const useInputAttrs = () => {
  const attrs = useAttrs()
  return computed(() =>
    Object.fromEntries(
      Object.entries(attrs).filter(([key]) => key !== "style"),
    ),
  )
}
