<script lang="ts">
  import type { Props } from "./types.svelte"
  import type { Snippet } from "svelte"
  import type { HTMLLiAttributes } from "svelte/elements"

  let {
    as,
    borderTop,
    class: className,
    for: htmlFor,
    inset,
    ref = $bindable(null),
    type,

    // Snippets
    children,
    description,
    end,
    headline,
    start,
    text,
    ...rest
  }: Props = $props()

  const hasLabel = $derived(
    type === "checkbox" || type === "radio" || type === "switch",
  )
</script>

{#snippet stringOrSnippet(value: string | Snippet)}
  {#if typeof value === "string"}
    {value}
  {:else}
    {@render value()}
  {/if}
{/snippet}

{#snippet startPart()}
  {#if start}
    <div class="ui-start">
      {@render stringOrSnippet(start)}
    </div>
  {/if}
{/snippet}

{#snippet textPart()}
  {#if headline}
    <p>{@render stringOrSnippet(headline)}</p>
  {/if}
  {#if description}
    <p>{@render stringOrSnippet(description)}</p>
  {/if}
  {#if text}
    {@render stringOrSnippet(text)}
  {/if}
{/snippet}

{#snippet endPart()}
  {#if end}
    <div class="ui-end">
      {@render stringOrSnippet(end)}
    </div>
  {/if}
{/snippet}

{#snippet inner()}
  {@render startPart()}
  {#if headline || description || text}
    <div class="ui-text">
      {@render textPart()}
      {@render children?.()}
    </div>
  {:else}
    {@render children?.()}
  {/if}
  {@render endPart()}
{/snippet}

<li
  bind:this={ref}
  class={[
    {
      "ui-border-top": borderTop,
      "ui-inset": inset,
    },
    className,
  ]}
  {...(as ? {} : rest) as HTMLLiAttributes}
>
  {#if hasLabel}
    <label class={`ui-${type}`} for={htmlFor}>
      {@render startPart()}
      {#if text || headline || description}
        <div class="ui-text">
          {@render textPart()}
        </div>
      {/if}
      {@render endPart()}
      {@render children?.()}
    </label>
  {:else if as}
    <svelte:element this={as} {...rest}>
      {@render inner()}
    </svelte:element>
  {:else}
    {@render inner()}
  {/if}
</li>
