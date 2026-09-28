<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  const { children, ...rest }: Props<"thead"> = $props()

  let element = $state<HTMLTableSectionElement | null>(null)
  export { element as this }
</script>

<thead bind:this={element} {...rest}>
  {@render children?.()}
</thead>
