<script lang="ts">
  import { classAttrs } from "../cx"
  import type { AccordionSummaryProps as Props } from "./types.svelte"

  let {
    class: className,

    // Snippets
    children,
    marker,
    ...rest
  }: Props = $props()
</script>

<summary {...classAttrs([className])} {...rest}>
  {@render children?.()}{" "}{#if marker}
    {@render marker()}
  {:else}
    <svg
      aria-hidden="true"
      class="ui-marker"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    ></svg>
  {/if}
</summary>
