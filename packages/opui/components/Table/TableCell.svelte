<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ...rest }: Props<"td"> = $props()
</script>

<td {...rest}>
  {@render children?.()}
</td>
