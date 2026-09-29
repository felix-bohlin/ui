<script lang="ts">
  import type { RadioInputProps as Props } from "./types.svelte"

  let {
    checked,
    group = $bindable(),
    onchange,
    ref = $bindable(null),
    value,
    ...rest
  }: Props = $props()
</script>

<input
  bind:this={ref}
  type="radio"
  checked={group === undefined ? checked : group === value}
  onchange={(event) => {
    group = value
    onchange?.(event)
  }}
  {value}
  {...rest}
/>
