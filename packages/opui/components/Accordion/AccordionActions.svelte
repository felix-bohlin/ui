<script lang="ts">
  import type { AccordionActionsProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<div class={["ui-actions", className]} {...rest}>
  {@render children?.()}
</div>
