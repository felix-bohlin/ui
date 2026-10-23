<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    density,
    stickyHeader,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<table
  class={[
    "ui-table",
    { "ui-sticky-header": stickyHeader },
    density && density !== "normal" && `ui-${density}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
</table>
