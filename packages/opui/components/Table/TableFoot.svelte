<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ...rest }: Props<"tfoot"> = $props()
</script>

<tfoot {...rest}>
  {@render children?.()}
</tfoot>
