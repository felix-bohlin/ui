<script lang="ts">
  import type { CardHeaderProps as Props } from "./types.svelte"

  let {
    as: Tag = "hgroup",
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<svelte:element this={Tag} class={["ui-header", className]} {...rest}>
  {@render children?.()}
</svelte:element>
