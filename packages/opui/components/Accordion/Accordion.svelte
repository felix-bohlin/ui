<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements"
  import type { Snippet } from "svelte"

  type Props = {
    class?: HTMLAttributes<HTMLDetailsElement>["class"]
    name?: string
    open?: boolean
    variant?: "default" | "outlined" | "elevated" | "tonal"

    // Snippets
    actions?: Snippet
    children: Snippet
    marker?: Snippet
    summary: string | Snippet
  } & HTMLAttributes<HTMLDetailsElement>

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
  }: Props = $props()

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
