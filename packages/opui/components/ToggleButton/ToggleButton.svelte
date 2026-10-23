<script lang="ts">
  import { warnGroupedChecked } from "../dev"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { getToggleGroupContext } from "../ToggleGroup/context.svelte"
  import { isSelected } from "../ToggleGroup/selection"
  import type { Props } from "./types.svelte"

  let {
    checked = $bindable(),
    class: className,
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
  const grouped = $derived(isSelected(group?.value, value || label))
  $effect(() => warnGroupedChecked("ToggleButton", grouped, checked))
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
    checked={grouped ?? checked}
    name={finalName}
    type={finalType}
    value={value || label}
    {...rest}
    onchange={(event) => {
      if (grouped === undefined) checked = event.currentTarget.checked
      group?.change(event.currentTarget)
      onchange?.(event)
    }}
  />
  {#if children}{@render children()}{:else}{label}{/if}
</label>
