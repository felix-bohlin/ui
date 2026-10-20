<script lang="ts">
  import type { AccordionActionsProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-actions", className]} {...rest}>
  {@render children?.()}
</div>
