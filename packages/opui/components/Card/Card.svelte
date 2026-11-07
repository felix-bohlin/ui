<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as: Tag = "div",
    class: className,
    color,
    density,
    orientation,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<svelte:element
  this={Tag}
  class={[
    "ui-card",
    color && `ui-${color}`,
    density && density !== "normal" && `ui-${density}`,
    orientation && orientation !== "auto" && `ui-${orientation}`,
    variant && variant !== "plain" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</svelte:element>
