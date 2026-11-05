<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
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

<div
  class={[
    "ui-card",
    color && `ui-${color}`,
    density && density !== "normal" && `ui-${density}`,
    orientation && orientation !== "vertical" && `ui-${orientation}`,
    variant && variant !== "plain" && `ui-${variant}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</div>
