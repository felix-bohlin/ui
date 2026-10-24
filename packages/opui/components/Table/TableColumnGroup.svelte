<script lang="ts">
  import type { TableColumnGroupProps as Props } from "./types.svelte"

  let { children, ...rest }: Props = $props()
</script>

<colgroup {...rest}>
  {@render children?.()}
</colgroup>
