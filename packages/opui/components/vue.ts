import {
  computed,
  type DirectiveBinding,
  type HTMLAttributes,
  type ObjectDirective,
  type Slot,
  useAttrs,
  type VNode,
  vModelCheckbox,
  vModelDynamic,
  vModelRadio,
  vModelSelect,
  vModelText,
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

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const MODELS: unknown[] = [
  vModelCheckbox,
  vModelDynamic,
  vModelRadio,
  vModelSelect,
  vModelText,
]

const checkable = (field: Field): field is HTMLInputElement =>
  field instanceof HTMLInputElement &&
  (field.type === "checkbox" || field.type === "radio")

const optionValue = (option: HTMLOptionElement | HTMLInputElement) =>
  "_value" in option ? option._value : option.value

const serverValue = (field: HTMLInputElement | HTMLTextAreaElement) => {
  if (field instanceof HTMLTextAreaElement) return field.defaultValue
  const probe = document.createElement("input")
  for (const name of ["type", "min", "max", "step", "value"]) {
    const value = field.getAttribute(name)
    if (value !== null) probe.setAttribute(name, value)
  }
  return probe.value
}

const changed = (field: Field) => {
  if (checkable(field)) return field.checked !== field.defaultChecked
  if (field instanceof HTMLSelectElement) {
    const options = [...field.options]
    if (field.multiple) {
      return options.some(
        (option) => option.selected !== option.defaultSelected,
      )
    }
    const initial = options.findIndex((option) => option.defaultSelected)
    return field.selectedIndex !== Math.max(initial, 0)
  }
  return field.value !== serverValue(field)
}

const stateOf = (
  field: Field,
  { modifiers }: DirectiveBinding,
  vnode: VNode,
) => {
  if (checkable(field)) {
    return field.type === "checkbox"
      ? field.checked
      : (vnode.props?.value ?? field.value)
  }
  if (field instanceof HTMLSelectElement) {
    const selected = [...field.selectedOptions].map(optionValue)
    return field.multiple ? selected : selected[0]
  }
  const value = modifiers.trim ? field.value.trim() : field.value
  if (!modifiers.number && field.type !== "number") return value
  const number = Number.parseFloat(value)
  return Number.isNaN(number) ? value : number
}

const assign = (vnode: VNode, value: unknown) => {
  for (const update of [vnode.props?.["onUpdate:modelValue"]].flat()) {
    if (typeof update === "function") update(value)
  }
}

const modelOf = (vnode: VNode) =>
  vnode.dirs?.find((binding) => MODELS.includes(binding.dir))

const seed = (
  field: Field,
  model: DirectiveBinding,
  vnode: VNode,
  edited: boolean,
) => {
  if (!edited && (model.value != null || checkable(field))) return
  if (field.type === "radio" && !(field as HTMLInputElement).checked) {
    model.value = Symbol("unchecked")
    return
  }
  const state = stateOf(field, model, vnode)
  const empty =
    state === undefined ||
    (state === "" && !(field instanceof HTMLSelectElement))
  if (!edited && empty) return
  model.value = state
  assign(vnode, state)
}

const picked = new WeakMap<Field, HTMLOptionElement[]>()

export const vSeed: ObjectDirective<Field> = {
  created: (field, _, vnode) => {
    const model = modelOf(vnode)
    if (!model || !field.parentNode) return
    const edited = changed(field)
    if (!(field instanceof HTMLSelectElement)) {
      seed(field, model, vnode, edited)
    } else if (edited || model.value == null) {
      picked.set(field, [...field.selectedOptions])
    }
  },
  beforeMount: (field, _, vnode) => {
    const options = picked.get(field)
    const model = modelOf(vnode)
    picked.delete(field)
    if (!options || !model || !(field instanceof HTMLSelectElement)) return
    const values = options.map(optionValue)
    const state = field.multiple ? values : values[0]
    if (state === undefined) return
    model.value = state
    assign(vnode, state)
  },
  mounted: (field, _, vnode) => {
    const model = modelOf(vnode)
    if (model) seed(field, model, vnode, false)
  },
}
