<script lang="ts">
  import type { Props } from "./types"

  let {
    class: className = "",
    name,
    open,
    variant,

    // Snippets
    actions,
    children,
    marker,
    summary,
    ...rest
  }: Props<"svelte"> = $props()

  export const title = "Accordion" as const
  let element = $state<HTMLDetailsElement | null>(null)
  export { element as this }

  const id = $props.id()
  const summaryId = `summary-${id}`
  const contentId = `content-${id}`

  const classes = $derived(["accordion", "card", variant, className])
</script>

<details bind:this={element} {open} {name} class={classes} {...rest}>
  <summary id={summaryId} aria-controls={contentId}>
    {#if typeof summary === "string"}
      {summary}
    {:else if summary}
      {@render summary()}
    {/if}
    {#if marker}
      {@render marker()}
    {/if}
  </summary>

  <div id={contentId} class="content" role="region" aria-labelledby={summaryId}>
    {@render children()}
  </div>

  {#if actions}
    <div class="actions">
      {@render actions()}
    </div>
  {/if}
</details>
