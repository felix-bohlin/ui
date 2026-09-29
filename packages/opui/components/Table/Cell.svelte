<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ref = $bindable(null), ...rest }: Props<"td"> = $props()
</script>

<td bind:this={ref} {...rest}>
  {@render children?.()}
</td>
