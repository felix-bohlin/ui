<script lang="ts">
  import { markerPath } from "./icons"
  import type { AccordionSummaryProps as Props } from "./types.svelte"

  let { children, class: className, marker, ...rest }: Props = $props()
</script>

<summary class={[className]} {...rest}
  >{@render children?.()}{#if marker}{@render marker()}{:else}<svg
      aria-hidden="true"
      class="ui-marker"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"><path fill="currentColor" d={markerPath}></path></svg
    >{/if}</summary
>
