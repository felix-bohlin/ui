<script lang="ts">
  import type { Props } from "./types.svelte"
  import { getToggleGroupContext } from "../ToggleGroup/context"

  let {
    children,
    class: className,
    disabled,
    id,
    label,
    name,
    pressed,
    ref = $bindable(null),
    size,
    type,
    value,
    ...rest
  }: Props = $props()

  const componentId = $props.id()
  const group = getToggleGroupContext()
  const finalType = $derived(type || group?.inputType || "checkbox")
</script>

<label
  bind:this={ref}
  class={[
    "ui-toggle-button",
    { "ui-disabled": disabled },
    size && `ui-${size}`,
    className,
  ]}
>
  <input
    aria-pressed={finalType === "checkbox" ? pressed : undefined}
    checked={pressed}
    {disabled}
    id={id || `toggle-${componentId}`}
    name={name || group?.groupName}
    type={finalType}
    value={value || label}
    {...rest}
  />
  {@render children?.()}
</label>
