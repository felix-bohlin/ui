<script lang="ts">
  import type { TableHeaderCellProps as Props } from "./types.svelte"

  let {
    class: className,
    numeric,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<th class={[{ "ui-numeric": numeric }, className]} {...rest}>
  {@render children?.()}
</th>
