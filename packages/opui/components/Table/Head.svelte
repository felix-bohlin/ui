<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ref = $bindable(null), ...rest }: Props<"thead"> = $props()
</script>

<thead bind:this={ref} {...rest}>
  {@render children?.()}
</thead>
