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
  const hasGroup = untrack(() => group !== undefined)
  const isChecked = () =>
    hasGroup
      ? group === (value ?? true)
      : (checked ?? group === (value ?? true))
  const initialChecked = untrack(isChecked)
</script>

<input
  type="radio"
  name={name ?? field?.name}
  {...rest}
  checked={isChecked() || undefined}
  defaultChecked={initialChecked}
  onchange={(event) => {
    group = value ?? true
    onchange?.(event)
  }}
  {value}
/>
