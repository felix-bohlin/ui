<script lang="ts">
  import { classAttrs } from "../cx"
  import type { TableCellProps as Props } from "./types.svelte"

  let {
    class: className,
    numeric,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<td {...classAttrs([{ "ui-numeric": numeric }, className])} {...rest}>
  {@render children?.()}
</td>
