<script lang="ts">
  import { defined } from "../attrs"
  import { classAttrs } from "../cx"
  import type { TableHeaderCellProps as Props } from "./types.svelte"

  let {
    class: className,
    numeric,
    sortable,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<th
  {...classAttrs([{ "ui-numeric": numeric }, className])}
  data-sort={sortable ? "" : undefined}
  {...defined(rest)}
>
  {#if sortable}
    <button type="button">
      {@render children?.()}
    </button>
  {:else}
    {@render children?.()}
  {/if}
</th>
