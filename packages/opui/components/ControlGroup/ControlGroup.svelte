<script lang="ts">
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    color,
    orientation,
    overflow,
    size,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div
  class={[
    "ui-control-group",
    { "ui-vertical": orientation === "vertical" },
    color && `ui-${color}`,
    overflow && overflow !== "shrink" && `ui-overflow-${overflow}`,
    size && size !== "medium" && `ui-${size}`,
    variant && variant !== "transparent" && `ui-${variant}`,
    className,
  ]}
  role="group"
  {...defined(rest)}
>
  {@render children?.()}
</div>
