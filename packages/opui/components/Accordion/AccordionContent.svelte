<script lang="ts">
  import type { AccordionContentProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<div class={["ui-content", className]} {...rest}>
  {@render children?.()}
</div>
