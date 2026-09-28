<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  const { children, ...rest }: Props<"tbody"> = $props()

  let element = $state<HTMLTableSectionElement | null>(null)
  export { element as this }
</script>

<tbody bind:this={element} {...rest}>
  {@render children?.()}
</tbody>
