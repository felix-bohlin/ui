<script lang="ts">
  import { untrack } from "svelte"
  import { seedChecked } from "../svelte"
  import { defined } from "../attrs"
  import type { RadioInputProps as Props } from "./types.svelte"

  let {
    checked,
    defaultChecked,
    group = $bindable(),
    onchange,
    value,
    ...rest
  }: Props = $props()

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
  {...defined(rest)}
  {@attach seedChecked(isChecked, check)}
  defaultChecked={defaultChecked ?? initialChecked}
  onchange={(event) => {
    check()
    onchange?.(event)
  }}
  {value}
/>
