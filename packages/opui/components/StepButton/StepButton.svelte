<script lang="ts">
  import "../../elements/step-button.js"
  import type { Props } from "./types.svelte"

  let {
    command,
    for: htmlFor,
    label,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const name = $derived(
    label ?? (command === "--step-down" ? "Decrease" : "Increase"),
  )
</script>

<opui-step-button {...rest}>
  <button
    class="ui-button ui-round"
    type="button"
    aria-controls={htmlFor}
    aria-label={name}
    {command}
    commandfor={htmlFor}
  >
    {#if children}
      {@render children()}
    {:else}
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      ></svg>
    {/if}
  </button>
</opui-step-button>
