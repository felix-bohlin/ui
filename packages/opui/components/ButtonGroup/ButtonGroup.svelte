<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    color,
    orientation,
    ref = $bindable(null),
    size,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div
  bind:this={ref}
  class={[
    "ui-button-group",
    color && `ui-${color}`,
    size && `ui-${size}`,
    variant && `ui-${variant}`,
    orientation && `ui-${orientation}`,
    className,
  ]}
  role="group"
  {...rest}
>
  {@render children?.()}
</div>
