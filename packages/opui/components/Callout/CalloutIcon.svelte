<script lang="ts">
  import { getCalloutContext } from "./context"
  import { icons } from "./icons"
  import type { CalloutIconProps as Props } from "./types.svelte"

  let { class: className, ...rest }: Props = $props()

  const callout = getCalloutContext()
  const icon = $derived(
    callout?.severity === "neutral"
      ? undefined
      : callout?.severity && icons[callout.severity],
  )
</script>

{#if icon}
  <svg
    aria-hidden="true"
    class={[className]}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox={icon.viewBox}
    {...rest}
  >
    <path fill="currentColor" d={icon.d} />
  </svg>
{/if}
