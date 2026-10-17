<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ...rest }: Props<"caption"> = $props()
</script>

<caption {...rest}>
  {@render children?.()}
</caption>
