<script lang="ts">
  import { getCalloutContext } from "./context.svelte"
  import { defined } from "../attrs"
  import { classAttrs } from "../cx"
  import type { CalloutIconProps as Props } from "./types.svelte"

  let { class: className, ...rest }: Props = $props()

  const callout = getCalloutContext()
  const severity = $derived(callout?.severity)
</script>

{#if severity && severity !== "neutral"}
  <svg
    aria-hidden="true"
    {...classAttrs([className])}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    {...defined(rest)}
  ></svg>
{/if}
