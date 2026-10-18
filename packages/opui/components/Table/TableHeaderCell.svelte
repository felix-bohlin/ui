<script lang="ts">
  import type { TableHeaderCellProps as Props } from "./types.svelte"

  let { children, ...rest }: Props = $props()
</script>

<th {...rest}>
  {@render children?.()}
</th>
