<script lang="ts">
  import "../../css/js/checkbox.js"
  import { untrack } from "svelte"
  import { toggleInGroup } from "../group"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import type { CheckboxInputProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    defaultChecked,
    group = $bindable(),
    indeterminate,
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
  const initialChecked = untrack(getChecked)
</script>

<input
  type="checkbox"
  data-indeterminate={indeterminate ? "" : undefined}
  name={name ?? field?.name}
  {...rest}
  bind:checked={getChecked, setChecked}
  defaultChecked={defaultChecked ?? initialChecked}
  {value}
/>
