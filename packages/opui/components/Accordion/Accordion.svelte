<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    name,
    open,
    ref = $bindable(null),
    variant,

    // Snippets
    actions,
    children,
    marker,
    summary,
    ...rest
  }: Props = $props()

  const id = $props.id()
  const summaryId = `summary-${id}`
  const contentId = `content-${id}`
</script>

<details
  bind:this={ref}
  {name}
  class={["ui-accordion", "ui-card", variant && `ui-${variant}`, className]}
  {open}
  {...rest}
>
  <summary id={summaryId} aria-controls={contentId}
    >{#if typeof summary === "string"}{summary}{:else}{@render summary()}{/if}{@render marker?.()}</summary
  >

  <div
    id={contentId}
    class="ui-content"
    role="region"
    aria-labelledby={summaryId}
  >
    {@render children()}
  </div>

  {#if actions}
    <div class="ui-actions">
      {@render actions()}
    </div>
  {/if}
</details>
