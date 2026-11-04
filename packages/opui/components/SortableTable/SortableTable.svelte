<script lang="ts">
  import "../../elements/sortable-table.js"
  import type { Props } from "./types.svelte"

  let {
    ascendingLabel,
    class: className,
    descendingLabel,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<opui-sortable-table
  ascending-label={ascendingLabel}
  class={["ui-sortable-table", className]}
  descending-label={descendingLabel}
  {...rest}
>
  {@render children?.()}
</opui-sortable-table>
