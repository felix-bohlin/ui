<script lang="ts">
  import TimelineItem from "./TimelineItem.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    items,
    progress,
    size,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<ol
  class={[
    "ui-timeline",
    { "ui-with-progress": progress },
    size && `ui-${size}`,
    className,
  ]}
  {...rest}
>
  {#each items ?? [] as { description, ...item }, index (index)}
    <TimelineItem {...item}>
      {#if description}<p>{description}</p>{/if}
    </TimelineItem>
  {/each}
  {@render children?.()}
</ol>
