<script lang="ts">
  import type { DialogHeaderProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-header", className]} {...rest}>
  {@render children?.()}
</div>
