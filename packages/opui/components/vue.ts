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

const isInput = (field: Field): field is HTMLInputElement =>
  field.localName === "input"

const isSelect = (field: Field): field is HTMLSelectElement =>
  field.localName === "select"

const checkable = (field: Field): field is HTMLInputElement =>
  isInput(field) && (field.type === "checkbox" || field.type === "radio")

const optionValue = (option: HTMLOptionElement | HTMLInputElement) =>
  "_value" in option ? option._value : option.value

const ownValue = (field: HTMLInputElement, vnode: VNode) =>
  "_value" in field || !(vnode.props && "value" in vnode.props)
    ? optionValue(field)
    : vnode.props.value

const serverIndex = (field: HTMLSelectElement) => {
  const options = [...field.options]
  const marked = options.findLastIndex((option) => option.defaultSelected)
  if (marked !== -1 || field.size > 1) return marked
  return options.findIndex((option) => !option.matches(":disabled"))
}

const serverValue = (field: HTMLInputElement | HTMLTextAreaElement) => {
  if (!isInput(field)) return field.defaultValue
  const probe = document.createElement("input")
  for (const name of ["type", "min", "max", "step", "value"]) {
    const value = field.getAttribute(name)
    if (value !== null) probe.setAttribute(name, value)
  }
  return probe.value
}

const changed = (field: Field) => {
  if (checkable(field)) return field.checked !== field.defaultChecked
  if (isSelect(field)) {
    const options = [...field.options]
    if (field.multiple) {
      return options.some(
        (option) => option.selected !== option.defaultSelected,
      )
    }
    return field.selectedIndex !== serverIndex(field)
  }
  return field.value !== serverValue(field)
}

const pending = new WeakMap<unknown[], unknown[]>()

const toggled = (field: HTMLInputElement, list: unknown[], vnode: VNode) => {
  const base = pending.get(list) ?? list
  const value = ownValue(field, vnode)
  if (base.includes(value) === field.checked) return base
  const next = field.checked
    ? [...base, value]
    : base.filter((item) => item !== value)
  pending.set(list, next)
  queueMicrotask(() => pending.delete(list))
  return next
}

const stateOf = (
  field: Field,
  { modifiers, value: model }: DirectiveBinding,
  vnode: VNode,
) => {
  if (checkable(field)) {
    if (field.type !== "checkbox") return ownValue(field, vnode)
    return Array.isArray(model) ? toggled(field, model, vnode) : field.checked
  }
  if (isSelect(field)) {
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
  const empty = state === undefined || (state === "" && !isSelect(field))
  if (!edited && empty) return
  if (Array.isArray(state) && same(state, model.value)) return
  model.value = state
  assign(vnode, state)
}

const keepDefaults = (field: Field) => {
  if (checkable(field)) {
    if (!field.hasAttribute("checked")) field.defaultChecked = field.checked
    return
  }
  if (isSelect(field)) {
    const options = [...field.options]
    if (options.some((option) => option.hasAttribute("selected"))) return
    for (const option of options) option.defaultSelected = option.selected
    return
  }
  if (isInput(field) ? field.hasAttribute("value") : field.defaultValue) return
  if (field.type !== "file") field.defaultValue = field.value
}

const same = (a: unknown, b: unknown) =>
  Array.isArray(a) && Array.isArray(b)
    ? a.length === b.length && a.every((item, index) => item === b[index])
    : a === b

const groupOf = (field: HTMLInputElement) =>
  field.form && field.name
    ? [...field.form.elements].filter(
        (element): element is HTMLInputElement =>
          element.localName === "input" &&
          (element as HTMLInputElement).type === "radio" &&
          (element as HTMLInputElement).name === field.name,
      )
    : [field]

const latest = new WeakMap<Field, VNode>()

const followReset = (field: Field) => {
  const vnode = latest.get(field)
  const model = vnode && modelOf(vnode)
  if (!vnode || !model) return
  const state = stateOf(field, model, vnode)
  if (field.type === "radio" && !(field as HTMLInputElement).checked) {
    const group = groupOf(field as HTMLInputElement)
    if (group.some((radio) => radio.checked)) return
    if (same(state, model.value)) assign(vnode, undefined)
    return
  }
  if (!same(state, model.value)) assign(vnode, state)
}

const picked = new WeakMap<Field, HTMLOptionElement[]>()
const hydrated = new WeakSet<Field>()
const resets = new WeakMap<Field, () => void>()

export const vSeed: ObjectDirective<Field> = {
  created: (field, _, vnode) => {
    const model = modelOf(vnode)
    if (!model || !field.parentNode) return
    hydrated.add(field)
    const edited = changed(field)
    if (!isSelect(field)) {
      seed(field, model, vnode, edited)
    } else if (edited || model.value == null) {
      picked.set(field, [...field.selectedOptions])
    }
  },
  beforeMount: (field, _, vnode) => {
    const options = picked.get(field)
    const model = modelOf(vnode)
    picked.delete(field)
    if (!options || !model || !isSelect(field)) return
    const values = options.map(optionValue)
    const state = field.multiple ? values : values[0]
    if (state === undefined) return
    model.value = state
    assign(vnode, state)
  },
  mounted: (field, _, vnode) => {
    const model = modelOf(vnode)
    if (!model) return
    seed(field, model, vnode, false)
    latest.set(field, vnode)
    if (!hydrated.has(field)) queueMicrotask(() => keepDefaults(field))
    const { form } = field
    if (!form) return
    const listener = (event: Event) =>
      setTimeout(() => {
        if (!event.defaultPrevented) followReset(field)
      })
    form.addEventListener("reset", listener)
    resets.set(field, () => form.removeEventListener("reset", listener))
  },
  beforeUpdate: (field, _, vnode) => {
    latest.set(field, vnode)
  },
  beforeUnmount: (field) => {
    resets.get(field)?.()
    resets.delete(field)
    latest.delete(field)
  },
}

const wanted = new WeakMap<HTMLInputElement, boolean>()

export const seedChecked = (
  change: (input: HTMLInputElement) => void,
): ObjectDirective<HTMLInputElement, boolean | undefined> => {
  const report = (input: HTMLInputElement) => {
    if (input.checked || input.type === "checkbox") change(input)
  }
  return {
    created: (input, { value }) => {
      wanted.set(input, !!value)
      if (input.parentNode) hydrated.add(input)
      if (input.parentNode && input.checked !== input.defaultChecked) {
        report(input)
      } else input.checked = !!value
    },
    mounted: (input) => {
      if (!hydrated.has(input)) queueMicrotask(() => keepDefaults(input))
      const { form } = input
      if (!form) return
      const listener = (event: Event) =>
        setTimeout(() => {
          if (!event.defaultPrevented && input.checked !== wanted.get(input)) {
            report(input)
          }
        })
      form.addEventListener("reset", listener)
      resets.set(input, () => form.removeEventListener("reset", listener))
    },
    beforeUpdate: (input, { oldValue, value }) => {
      wanted.set(input, !!value)
      if (value !== oldValue) input.checked = !!value
    },
    beforeUnmount: (input) => {
      resets.get(input)?.()
      resets.delete(input)
      wanted.delete(input)
    },
    getSSRProps: ({ value }) => (value ? { checked: true } : undefined),
  }
}
