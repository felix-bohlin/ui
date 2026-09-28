<script lang="ts">
  import type { CheckboxInputProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    group = $bindable(),
    indeterminate,
    ref = $bindable(null),
    value,
    ...rest
  }: Props = $props()

  const getChecked = () => (group ? group.includes(value) : !!checked)
  const setChecked = (isChecked: boolean) => {
    if (group) {
      group = isChecked
        ? [...group, value]
        : group.filter((item) => item !== value)
    } else {
      checked = isChecked
    }
  }
</script>

<input
  bind:this={ref}
  bind:checked={getChecked, setChecked}
  {@attach (input) => {
    input.indeterminate = Boolean(indeterminate)
  }}
  type="checkbox"
  data-indeterminate={indeterminate || undefined}
  {value}
  {...rest}
/>
