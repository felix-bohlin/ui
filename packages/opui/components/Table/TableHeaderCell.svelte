<script lang="ts">
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
  class={[{ "ui-numeric": numeric }, className]}
  data-sort={sortable ? "" : undefined}
  {...rest}
>
  {#if sortable}
    <button type="button">{@render children?.()}</button>
  {:else}
    {@render children?.()}
  {/if}
</th>
