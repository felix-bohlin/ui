<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import type { RadioInputProps as Props } from "./types.svelte"

  let {
    checked,
    group = $bindable(),
    name,
    onchange,
    value,
    ...rest
  }: Props = $props()

  const field = getFieldContext()
</script>

<input
  type="radio"
  checked={(group === undefined ? checked : group === (value ?? true)) ||
    undefined}
  name={name ?? field?.name}
  onchange={(event) => {
    group = value ?? true
    onchange?.(event)
  }}
  {value}
  {...rest}
/>
