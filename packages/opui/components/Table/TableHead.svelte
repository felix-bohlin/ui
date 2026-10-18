<script lang="ts">
  import type { TableHeadProps as Props } from "./types.svelte"

  let { children, ...rest }: Props = $props()
</script>

<thead {...rest}>
  {@render children?.()}
</thead>
