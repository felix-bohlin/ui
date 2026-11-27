<script lang="ts">
  import { untrack } from "svelte"
  import { relayChecked } from "../svelte"
  import { defined } from "../attrs"
  import type { RadioInputProps as Props } from "./types.svelte"

  let {
    checked,
    defaultChecked,
    group = $bindable(),
    value,
    ...rest
  }: Props = $props()

  const initialChecked = untrack(() =>
    group !== undefined ? group === (value ?? true) : checked,
  )
  const relay = (input: HTMLInputElement) => {
    if (input.checked) group = value ?? true
    else if (group === (value ?? true)) group = undefined
  }
</script>

<input
  type="radio"
  {...defined(rest)}
  {@attach relayChecked(
    relay,
    () => checked ?? undefined,
    () => (group === undefined ? undefined : group === (value ?? true)),
  )}
  defaultChecked={defaultChecked ?? initialChecked}
  {value}
/>
