<script lang="ts">
  import "../../elements/sortable-table.js"
  import { defined } from "../attrs"
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
  {...defined(rest)}
>
  {@render children?.()}
</opui-sortable-table>
