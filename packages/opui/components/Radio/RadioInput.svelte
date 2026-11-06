<script lang="ts">
  import { untrack } from "svelte"
  import { seedChecked } from "../svelte"
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
  const check = () => {
    group = value ?? true
  }
</script>

<input
  type="radio"
  name={name ?? field?.name}
  {...rest}
  {@attach seedChecked(isChecked, check)}
  defaultChecked={initialChecked}
  onchange={(event) => {
    check()
    onchange?.(event)
  }}
  {value}
/>
