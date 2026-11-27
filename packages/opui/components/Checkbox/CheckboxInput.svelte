<script lang="ts">
  import "../../css/js/checkbox.js"
  import { untrack } from "svelte"
  import { relayChecked } from "../svelte"
  import { toggleInGroup } from "../group"
  import { defined } from "../attrs"
  import type { CheckboxInputProps as Props } from "./types.svelte"

  let {
    checked = $bindable(),
    defaultChecked,
    group = $bindable(),
    indeterminate,
    value,
    ...rest
  }: Props = $props()

  const initialChecked = untrack(() =>
    group !== undefined && value !== undefined
      ? group.includes(value)
      : checked,
  )
  const relay = (input: HTMLInputElement) => {
    checked = input.checked
    if (value !== undefined) {
      group = toggleInGroup(group ?? [], value, input.checked)
    }
  }
</script>

<input
  type="checkbox"
  data-indeterminate={indeterminate ? "" : undefined}
  {...defined(rest)}
  {@attach relayChecked(
    relay,
    () => checked,
    () =>
      group === undefined || value === undefined
        ? undefined
        : group.includes(value),
  )}
  defaultChecked={defaultChecked ?? initialChecked}
  {value}
/>
