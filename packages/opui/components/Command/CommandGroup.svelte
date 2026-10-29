<script lang="ts">
  import { content } from "../content.svelte"
  import type { CommandGroupProps as Props } from "./types.svelte"

  let {
    class: className,
    label,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const labelId = $derived(label ? `command-group-label-${uid}` : undefined)
</script>

<div class={["ui-command-group", className]} {...rest}>
  {#if label}
    <p class="ui-label" id={labelId}>{@render content(label)}</p>
  {/if}
  <ul aria-labelledby={labelId} class="ui-list ui-transparent">
    {@render children?.()}
  </ul>
</div>
