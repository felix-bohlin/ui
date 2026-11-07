<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    as: Tag = "form",
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<svelte:element this={Tag} class={["ui-form", className]} {...rest}>
  {@render children?.()}
</svelte:element>
