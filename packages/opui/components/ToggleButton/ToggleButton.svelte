<script lang="ts">
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { getToggleGroupContext } from "../ToggleGroup/context.svelte"
  import { isSelected } from "../ToggleGroup/selection"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    disabled,
    label,
    name,
    onchange,
    pressed,
    size,
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
    group?.inputType === "radio"
      ? "radio"
      : type || group?.inputType || "checkbox",
  )
  const checked = $derived(isSelected(group?.value, value || label) ?? pressed)
</script>

<label class={["ui-toggle-button", size && `ui-${size}`, className]}>
  <input
    {checked}
    {disabled}
    name={finalName}
    type={finalType}
    value={value || label}
    {...rest}
    onchange={(event) => {
      group?.change(event.currentTarget)
      onchange?.(event)
    }}
  />
  {#if children}{@render children()}{:else}{label}{/if}
</label>
