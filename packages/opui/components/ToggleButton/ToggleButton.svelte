<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import { getToggleGroupContext } from "../ToggleGroup/context"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    disabled,
    id,
    label,
    name,
    pressed,
    size,
    type,
    value,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const field = getFieldContext()
  const group = getToggleGroupContext()
  const uid = $props.id()

  const finalName = $derived(name || group?.groupName || field?.name)
  const finalType = $derived(
    group?.inputType === "radio"
      ? "radio"
      : type || group?.inputType || "checkbox",
  )
</script>

<label class={["ui-toggle-button", size && `ui-${size}`, className]}>
  <input
    checked={pressed}
    {disabled}
    id={id || `toggle-${uid}`}
    name={finalName}
    type={finalType}
    value={value || label}
    {...rest}
  />
  {#if children}{@render children()}{:else}{label}{/if}
</label>
