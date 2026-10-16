<script lang="ts">
  import type { TimelineItemProps as Props } from "./types.svelte"

  let {
    class: className,
    color,
    current,
    datetime,
    heading,
    headingLevel = 3,
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
  {#if heading}
    <svelte:element this={`h${headingLevel}`} class="ui-h6">
      {heading}
    </svelte:element>
  {/if}
  {@render children?.()}
</li>
