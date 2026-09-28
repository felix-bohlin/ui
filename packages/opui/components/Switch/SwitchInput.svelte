<script lang="ts">
  import type { SwitchInputProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    group = $bindable(),
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
  type="checkbox"
  role="switch"
  {value}
  {...rest}
/>
