import { createContext, onMount } from "svelte"
import { SvelteMap, SvelteSet } from "svelte/reactivity"

/* Contexts ---------------------------------------- */

/* 1. Field */
// any form field
export type Field = {
  // the field's name, repeated inputs for options
  name: string

  // the id of an associated FieldDescription element
  description?: string

  // valid options (empty if type = "default")
  options: SvelteSet<string>

  // the number of valid value options avaialble
  type: "default" | "group"

  // how many values can this field select
  selection: "single" | "multiple"

  // the value of the input (only 1 value max if selection = "single")
  value: SvelteSet<string>
}

// A standard field un-grouped field
export type SingularField = Omit<Field, "type"> & { type: "single" }

// A field (that's actually a group of inputs) eg. checkbox selection array
export type GroupField = Omit<Field, "type"> & { type: "group" }

// For logging and debugging
export type SerializedField = {
  name: string
  description?: string
  options: string[]
  type: "default" | "group"
  selection: "single" | "multiple"
  value: string[]
}

const [_getFieldContext, _setFieldContext] = createContext<{
  field?: Field | undefined
}>()

export function getField(): Field | undefined {
  try {
    return _getFieldContext().field
  } catch (_e) {
    // not in a Field element
    return
  }
}

export function setFieldContext(field: Field | undefined): void {
  try {
    _setFieldContext({ field })
  } catch (_e) {
    // not in a Field element
    return
  }
}

/**
 * Creates a new Field data object
 */
type CreateFieldSeed = Partial<Field>
type CreateFieldMeta = {
  inputType?: "checkbox" | "radio"
  options?: string[]
  value?: string[]
  id?: string
}
export function createField(
  field: CreateFieldSeed,
  meta?: CreateFieldMeta,
): Field {
  // allow for controlled fields
  const { options = new SvelteSet<string>(), value = new SvelteSet<string>() } =
    field
  meta?.options?.forEach((o) => options.add(o))
  meta?.value?.forEach((v) => value.add(v))

  return {
    name: `field-${meta?.id}`,
    type: meta?.inputType ? "group" : "default",
    selection: meta?.inputType === "checkbox" ? "multiple" : "single",
    ...field,
    value,
    options,
  }
}

/* 2. Form */
// Holds all the fields added within it, cannot be nested
export type Form = {
  name: string
  fields: SvelteMap<string, Field>
}

export type SerializedForm = {
  name: string
  fields: Record<string, SerializedField>
}

export function serializeForm(form: Form): SerializedForm {
  return {
    name: form.name,
    fields: Object.fromEntries(
      Array.from(form.fields.entries()).map(([key, field]) => [
        key,
        {
          name: field.name,
          description: field.description,
          options: Array.from(field.options),
          type: field.type,
          selection: field.selection,
          value: Array.from(field.value),
        },
      ]),
    ),
  }
}

const [_getFormContext, _setFormContext] = createContext<{
  form?: Form | undefined
}>()

export function getForm(): Form | undefined {
  try {
    return _getFormContext().form
  } catch (_e) {
    // not in a <Form />
    return
  }
}

export function setFormContext(form: Form | undefined): void {
  try {
    _setFormContext({ form })
  } catch (_e) {
    // not in a <Form />
    return
  }
}

// Creates a form context data object
type CreateFormSeed = Partial<Form>
type CreateFormMeta = { id: string }
export function createForm(form: CreateFormSeed, meta?: CreateFormMeta): Form {
  return {
    fields: new SvelteMap<string, Field>(),
    ...form,
    name: form?.name ?? `form-${meta?.id}`,
  }
}

/* 3. FieldGroup */
// Provides default metadata to fields added below it.
export type FieldGroup = {
  // adding name and selection turns this group into a GroupField
  name?: string
  selection?: Field["selection"]
}
const [_getFieldGroupContext, _setFieldGroupContext] = createContext<{
  fieldGroup?: FieldGroup | undefined
}>()

export function getFieldGroup(): FieldGroup | undefined {
  try {
    return _getFieldGroupContext().fieldGroup
  } catch (_e) {
    // not in a <FieldGroup />
    return
  }
}

export function setFieldGroupContext(fieldGroup: FieldGroup | undefined): void {
  try {
    _setFieldGroupContext({ fieldGroup })
  } catch (_e) {
    // not in a <FieldGroup />
    return
  }
}

// Creates a new FieldGroup
type CreateFieldGroupSeed = Partial<FieldGroup>
type CreateFieldGroupMeta = { inputType?: "checkbox" | "radio" }
export function createFieldGroup(
  fieldGroup?: CreateFieldGroupSeed,
  meta?: CreateFieldGroupMeta,
): FieldGroup {
  return {
    selection: meta?.inputType === "checkbox" ? "multiple" : "single",
    ...fieldGroup,
  }
}

/* Accessors ---------------------------------------- */

export function addField(
  field: Required<Pick<Field, "name">> & Partial<Field>,
  f?: Form,
): Field | undefined {
  const form = f ?? getForm()
  if (!form) return

  const newField = createField(field)
  form.fields.set(field.name, newField)
  return newField
}

export function removeField(fieldName: string, f?: Form): void {
  const form = f ?? getForm()
  if (!form) return

  const field = form.fields.get(fieldName)
  if (!field) return

  form.fields.delete(field.name)
}

export function addFieldOptions(
  fieldName: string,
  options: string[] | SvelteSet<string>,
  f?: Form,
): Field | undefined {
  const form = f ?? getForm()
  if (!form) return

  const field = form.fields.get(fieldName)
  if (!field) return

  options.forEach((o) => field.options.add(o))
  return field
}

export function removeFieldOptions(
  fieldName: string,
  options: string[] | SvelteSet<string>,
  f?: Form,
): Field | undefined {
  const form = f ?? getForm()
  if (!form) return

  const field = form.fields.get(fieldName)
  if (!field) return

  options.forEach((o) => field.options.delete(o))
  return field
}

/* Actions ------------------------------------------ */

/**
 * Creates a select out of a group of inputs named identically
 * Reads node.name on inputs (or parent FieldGroup) to bind interactivity
 *
 * @param enabled - the name of the inputs to bind
 */
export function useSelect(node: HTMLInputElement, enabled?: boolean) {
  if (!enabled) return

  let field: Field | undefined

  $effect(() => {
    field = getForm()?.fields.get(node.name)
    if (!field) return

    node.checked = field.value.has(node.value)
  })

  function handleChange() {
    if (!field) return

    if (field.selection === "multiple") {
      // checkbox or multi-select
      if (node.checked) {
        field.value.add(node.value)
      } else {
        field.value.delete(node.value)
      }
    } else {
      // radio or single-select
      field.value.clear()
      field.value.add(node.value)
    }
  }

  node.addEventListener("change", handleChange)

  return {
    destroy() {
      node.removeEventListener("change", handleChange)
    },
  }
}

/**
 * Tracks the indeterminate state of inputs tied to this input
 *
 * @param name - the name of the inputs to track
 */
export function useSelectAll(node: HTMLInputElement, name?: string) {
  if (!name) return

  let field: Field | undefined

  $effect(() => {
    field = getForm()?.fields?.get(name)
    if (!field || field.selection !== "multiple") return

    const { options, value } = field
    if (value instanceof Set) {
      // checkbox
      if (value.size === 0) {
        // none selected
        node.indeterminate = false
        node.checked = false
      } else if (new Set(options.keys()).difference(value).size === 0) {
        // all selected
        node.indeterminate = false
        node.checked = true
      } else {
        // some selected
        node.indeterminate = true
        node.checked = true
      }
    } else {
      // radio
      node.indeterminate = false
    }
  })

  function handleChange() {
    if (!field) return

    const { options, value } = field

    if (value instanceof Set) {
      // checkbox
      if (node.checked) {
        new Set(options.keys())
          .difference(value)
          .forEach((field) => value.add(field))
      } else {
        value.clear()
      }
    } else {
      // radio
      value === node.value
    }
  }

  node.addEventListener("change", handleChange)

  return {
    destroy() {
      node.removeEventListener("change", handleChange)
    },
  }
}

/**
 * Registers a form field with the form data object
 */
export const registerFormField: typeof createField = (
  { name, ...field },
  meta,
) => {
  const fieldGroup = getFieldGroup()
  const finalName = $derived(name ?? fieldGroup?.name ?? "")
  const newField = $derived(
    createField(
      {
        name: finalName,
        type: Boolean(fieldGroup?.name && fieldGroup?.selection)
          ? "group"
          : "default",
        ...field,
      },
      meta,
    ),
  )

  $effect(() => {
    if (newField.name) {
      if (newField.type === "group") {
        addFieldOptions(newField.name, newField.options)
      } else {
        addField(newField)
      }
    }
  })

  onMount(() => {
    const form = getForm()
    if (!form) return

    return () => {
      if (form.fields.has(newField.name)) {
        removeField(newField.name, form)
      }
    }
  })
  return newField
}
