<script lang="ts">
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import type { RadioInputProps as Props } from "./types.svelte"

  let {
    checked,
    group = $bindable(),
    name,
    onchange,
    value,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
</script>

<input
  type="radio"
  checked={(checked ?? group === (value ?? true)) || undefined}
  name={name ?? field?.name}
  onchange={(event) => {
    group = value ?? true
    onchange?.(event)
  }}
  {value}
  {...rest}
/>
