<script lang="ts">
  import { content } from "../content.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    size,

    // Snippets
    children,
    description,
    label,
    ...rest
  }: Props = $props()
</script>

<dl
  class={["ui-stat", size && size !== "medium" && `ui-${size}`, className]}
  {...rest}
>
  <dt class="ui-label">
    {@render content(label)}
  </dt>
  <dd class="ui-value">
    {@render children?.()}
  </dd>
  {#if description}
    <dd class="ui-description">
      {@render content(description)}
    </dd>
  {/if}
</dl>
