<script lang="ts">
  import { untrack } from "svelte"
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
  const initialChecked = untrack(() =>
    Boolean(group === undefined ? checked : group === (value ?? true)),
  )
</script>

<input
  type="radio"
  name={name ?? field?.name}
  {...rest}
  checked={(group === undefined ? checked : group === (value ?? true)) ||
    undefined}
  defaultChecked={initialChecked}
  onchange={(event) => {
    group = value ?? true
    onchange?.(event)
  }}
  {value}
/>
