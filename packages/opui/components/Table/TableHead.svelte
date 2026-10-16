<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  let { children, ...rest }: Props<"thead"> = $props()
</script>

<thead {...rest}>
  {@render children?.()}
</thead>
