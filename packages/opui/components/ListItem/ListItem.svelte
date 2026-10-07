<script lang="ts">
  import type { Props } from "./types.svelte"
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"

  let {
    as,
    borderTop,
    class: className,
    description,
    for: htmlFor,
    headline,
    href,
    inset,
    type,

    // Snippets
    children,
    end,
    start,
    submenu,
    text,
    ...rest
  }: Props = $props()

  const hasLabel = $derived(
    type === "checkbox" || type === "radio" || type === "switch",
  )
  const Tag = $derived(as ?? (href ? "a" : undefined))
</script>

{#snippet content(
  part: string | Snippet,
)}{#if typeof part === "string"}{part}{:else}{@render part()}{/if}{/snippet}

{#snippet startPart()}
  {#if start}
    <div class="ui-start">
      {@render content(start)}
    </div>
  {/if}
{/snippet}

{#snippet endPart()}
  {#if end}
    <div class="ui-end">
      {@render content(end)}
    </div>
  {/if}
{/snippet}

{#snippet body()}
  {@render startPart()}
  {#if headline || description || text}
    <div class="ui-text">
      {#if headline}<p>{headline}</p>{/if}
      {#if description}<p>{description}</p>{/if}
      {#if text}{@render content(text)}{/if}
      {@render children?.()}
    </div>
  {:else}
    {@render children?.()}
  {/if}
  {@render endPart()}
{/snippet}

<li
  class={[
    {
      "ui-border-top": borderTop,
      "ui-inset": inset,
    },
    className,
  ]}
  {...(Tag ? {} : rest) as HTMLAttributes<HTMLLIElement>}
>
  {#if hasLabel}
    <label class={type && `ui-${type}`} for={htmlFor}>
      {@render startPart()}
      {#if text || headline || description}
        <div class="ui-text">
          {#if headline}<p>{headline}</p>{/if}
          {#if description}<p>{description}</p>{/if}
          {#if text}{@render content(text)}{/if}
        </div>
      {/if}
      {@render endPart()}
      {@render children?.()}
    </label>
  {:else if Tag}
    <svelte:element
      this={Tag}
      {href}
      type={Tag === "button" ? "button" : undefined}
      {...rest as HTMLAttributes<HTMLElement>}
    >
      {@render body()}
    </svelte:element>
  {:else}
    {@render body()}
  {/if}
  {#if submenu}{@render content(submenu)}{/if}
</li>
