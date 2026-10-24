<script lang="ts">
  import type { TableCellProps as Props } from "./types.svelte"

  let { children, ...rest }: Props = $props()
</script>

<td {...rest}>
  {@render children?.()}
</td>
