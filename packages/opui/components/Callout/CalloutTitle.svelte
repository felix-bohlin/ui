<script lang="ts">
  import type { CalloutTitleProps as Props } from "./types.svelte"

  let { children, class: className, level = 3, ...rest }: Props = $props()
</script>

<svelte:element this={`h${level}`} class={["ui-title", className]} {...rest}>
  {@render children?.()}
</svelte:element>
