<script lang="ts">
  import { toggleInGroup } from "../group"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { defined } from "../attrs"
  import type { SwitchInputProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    defaultChecked,
    group = $bindable(),
    name,
    value,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
  const getChecked = () =>
    group ? group.includes(value) : !!(checked ?? defaultChecked)
  const setChecked = (isChecked: boolean) => {
    if (group) group = toggleInGroup(group, value, isChecked)
    else checked = isChecked
  }
</script>

<input
  type="checkbox"
  role="switch"
  name={name ?? field?.name}
  {...defined(rest)}
  bind:checked={getChecked, setChecked}
  {defaultChecked}
  {value}
/>
