<script lang="ts">
  import "../../css/js/checkbox.js"
  import { toggleInGroup } from "../group"
  import { defined } from "../attrs"
  import type { CheckboxInputProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    defaultChecked,
    group = $bindable(),
    indeterminate,
    value,
    ...rest
  }: Props = $props()

  const getChecked = () =>
    group ? group.includes(value) : !!(checked ?? defaultChecked)
  const setChecked = (isChecked: boolean) => {
    if (group) group = toggleInGroup(group, value, isChecked)
    else checked = isChecked
  }
</script>

<input
  type="checkbox"
  data-indeterminate={indeterminate ? "" : undefined}
  {...defined(rest)}
  bind:checked={getChecked, setChecked}
  {defaultChecked}
  {value}
/>
