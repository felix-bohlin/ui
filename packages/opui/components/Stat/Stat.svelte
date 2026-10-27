<script lang="ts">
  import { content } from "../content.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    description,
    label,
    size,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<dl
  class={["ui-stat", size && size !== "medium" && `ui-${size}`, className]}
  {...rest}
>
  <dt class="ui-label">
    {#if label}{@render content(label)}{/if}
  </dt>
  <dd class="ui-value">{@render children?.()}</dd>
  {#if description}
    <dd class="ui-description">{@render content(description)}</dd>
  {/if}
</dl>
