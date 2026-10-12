<script lang="ts">
  import { getFieldRoot } from "../Field/context"
  import { getFieldContext } from "../FieldGroup/context"
  import type { CheckboxInputProps as Props } from "./types.svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    checked = $bindable(),
    group = $bindable(),
    indeterminate,
    name,
    value,
    ...rest
  }: Props = $props()

  const field = getFieldContext()
  const root = getFieldRoot()
  const describedBy = $derived(
    [root?.describedBy, ariaDescribedBy].filter(Boolean).join(" ") || undefined,
  )

  const getChecked = () => (group ? group.includes(value) : !!checked)
  const setChecked = (isChecked: boolean) => {
    if (group) {
      group = isChecked
        ? [...group, value]
        : group.filter((item: string | number) => item !== value)
    } else {
      checked = isChecked
    }
  }
</script>

<input
  type="checkbox"
  aria-describedby={describedBy}
  aria-invalid={root?.invalid ? "true" : ariaInvalid}
  bind:checked={getChecked, setChecked}
  {@attach (input) => {
    input.indeterminate = Boolean(indeterminate)
  }}
  data-indeterminate={indeterminate ? "" : undefined}
  name={name ?? field?.name}
  {value}
  {...rest}
/>
