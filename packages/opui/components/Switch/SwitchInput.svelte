<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import type { SwitchInputProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    group = $bindable(),
    name,
    value,
    ...rest
  }: Props = $props()

  const field = getFieldContext()

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
  role="switch"
  bind:checked={getChecked, setChecked}
  name={name ?? field?.name}
  {value}
  {...rest}
/>
