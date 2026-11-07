<script lang="ts">
  import { content } from "../content.svelte"
  import { classAttrs } from "../cx"
  import type { TimelineItemProps as Props } from "./types.svelte"

  let {
    class: className,
    color,
    current,
    datetime,
    headingLevel = 3,
    time,

    // Snippets
    children,
    label,
    marker,
    ...rest
  }: Props = $props()

  const Heading = $derived(
    `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6",
  )
</script>

<li
  aria-current={current === true ? "true" : current || undefined}
  {...classAttrs([color && `ui-${color}`, className])}
  {...rest}
>
  {#if marker}
    <span class="ui-marker">
      {@render marker()}
    </span>
  {/if}
  {#if time}
    <time {datetime}>{time}</time>
  {/if}
  {#if label}
    <svelte:element this={Heading} class="ui-h6">
      {@render content(label)}
    </svelte:element>
  {/if}
  {@render children?.()}
</li>
