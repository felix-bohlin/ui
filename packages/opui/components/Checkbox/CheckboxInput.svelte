<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import { toggleInGroup } from "../group"
  import type { CheckboxInputProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    group = $bindable(),
    indeterminate,
    name,
    value,
    ...rest
  }: Props = $props()

  const field = getFieldContext()

  const getChecked = () => (group ? group.includes(value) : !!checked)
  const setChecked = (isChecked: boolean) => {
    if (group) group = toggleInGroup(group, value, isChecked)
    else checked = isChecked
  }
</script>

<input
  type="checkbox"
  bind:checked={getChecked, setChecked}
  {@attach (input) => {
    input.indeterminate = Boolean(indeterminate)
  }}
  data-indeterminate={indeterminate ? "" : undefined}
  name={name ?? field?.name}
  {value}
  {...rest}
/>
