<script lang="ts">
  import "../../elements/sortable-table.js"
  import { defined } from "../attrs"
  import type { Props } from "./types.svelte"

  let {
    ascendingLabel,
    class: className,
    descendingLabel,
    onsort,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<opui-sortable-table
  ascending-label={ascendingLabel}
  class={["ui-sortable-table", className]}
  descending-label={descendingLabel}
  {onsort}
  {...defined(rest)}
>
  {@render children?.()}
  <span class="ui-sr-only" role="status"></span>
</opui-sortable-table>
