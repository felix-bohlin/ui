<script lang="ts">
  import type { SectionProps as Props } from "./types.svelte"

  const { children, ...rest }: Props<"tr"> = $props()

  let element = $state<HTMLTableRowElement | null>(null)
  export { element as this }
</script>

<tr bind:this={element} {...rest}>
  {@render children?.()}
</tr>
