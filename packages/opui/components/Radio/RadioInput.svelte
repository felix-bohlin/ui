<script lang="ts">
  import { untrack } from "svelte"
  import { seedChecked } from "../svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { defined } from "../attrs"
  import type { RadioInputProps as Props } from "./types.svelte"

  let {
    checked,
    defaultChecked,
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
      : (checked ??
        (group !== undefined ? group === (value ?? true) : !!defaultChecked))
  const initialChecked = untrack(isChecked)
  const check = () => {
    group = value ?? true
  }
</script>

<input
  type="radio"
  name={name ?? field?.name}
  {...defined(rest)}
  {@attach seedChecked(isChecked, check)}
  defaultChecked={defaultChecked ?? initialChecked}
  onchange={(event) => {
    check()
    onchange?.(event)
  }}
  {value}
/>
