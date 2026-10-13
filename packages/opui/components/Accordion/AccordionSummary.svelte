<script lang="ts">
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
      viewBox="0 0 24 24"
      ><path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      ></path></svg
    >{/if}</summary
>
