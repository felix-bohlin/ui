<script lang="ts">
  import { content } from "../content.svelte"
  import type { TimelineItemProps as Props } from "./types.svelte"

  let {
    class: className,
    color,
    current,
    datetime,
    headingLevel = 3,
    label,
    time,

    // Snippets
    children,
    marker,
    ...rest
  }: Props = $props()
</script>

<li
  aria-current={current === true ? "true" : current || undefined}
  class={[color && `ui-${color}`, className]}
  {...rest}
>
  {#if marker}
    <span class="ui-marker">{@render marker()}</span>
  {/if}
  {#if time}
    <time {datetime}>{time}</time>
  {/if}
  {#if label}
    <svelte:element this={`h${headingLevel}`} class="ui-h6">
      {@render content(label)}
    </svelte:element>
  {/if}
  {@render children?.()}
</li>
