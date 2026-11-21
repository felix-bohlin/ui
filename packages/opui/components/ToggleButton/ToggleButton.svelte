<script lang="ts">
  import { untrack } from "svelte"
  import { seedChecked } from "../svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { getToggleGroupContext } from "../ToggleGroup/context.svelte"
  import { isSelected } from "../ToggleGroup/selection"
  import { warnGroupedChecked } from "../dev"
  import type { Props } from "./types.svelte"

  let {
    checked = $bindable(),
    class: className,
    defaultChecked,
    label,
    name,
    onchange,
    size,
    style,
    type,
    value,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
  const group = getToggleGroupContext()
  const finalName = $derived(name || group?.groupName || field?.name)
  const finalType = $derived(
    group?.inputType === "radio" ? "radio" : (type ?? "checkbox"),
  )
  const grouped = $derived(isSelected(group?.value, value))
  untrack(() =>
    warnGroupedChecked(
      "ToggleButton",
      grouped,
      checked ?? defaultChecked,
      "ToggleGroup",
    ),
  )
  const isChecked = () => grouped ?? checked ?? !!defaultChecked
  const initialChecked = untrack(isChecked)
  const change = (input: HTMLInputElement) => {
    if (grouped === undefined) checked = input.checked
    group?.change?.(input)
  }
</script>

<label
  class={[
    "ui-toggle-button",
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  <input
    {@attach seedChecked(isChecked, change)}
    defaultChecked={grouped === undefined
      ? (defaultChecked ?? initialChecked)
      : initialChecked}
    name={finalName}
    type={finalType}
    {value}
    {...rest}
    onchange={(event) => {
      change(event.currentTarget)
      onchange?.(event)
    }}
  />
  {#if children}
    {@render children()}
  {:else}{label}{/if}
</label>
