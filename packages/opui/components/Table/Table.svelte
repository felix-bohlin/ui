<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    density,
    flush,
    overflow,
    stickyHeader,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<table
  class={[
    "ui-table",
    { "ui-flush": flush, "ui-sticky-header": stickyHeader },
    density && density !== "normal" && `ui-${density}`,
    overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</table>
