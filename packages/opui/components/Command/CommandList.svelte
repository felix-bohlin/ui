<script lang="ts">
  import type { CommandListProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-content", className]} {...rest}>
  {@render children?.()}
</div>
