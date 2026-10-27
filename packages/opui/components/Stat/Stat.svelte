<script lang="ts">
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
    {#if typeof label === "function"}{@render label()}{:else}{label}{/if}
  </dt>
  <dd class="ui-value">{@render children?.()}</dd>
  {#if description}
    <dd class="ui-description">
      {#if typeof description === "function"}{@render description()}{:else}{description}{/if}
    </dd>
  {/if}
</dl>
