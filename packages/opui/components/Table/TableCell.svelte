<script lang="ts">
  import type { TableCellProps as Props } from "./types.svelte"

  let {
    class: className,
    numeric,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<td class={[{ "ui-numeric": numeric }, className]} {...rest}>
  {@render children?.()}
</td>
