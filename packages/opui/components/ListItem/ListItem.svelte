<script lang="ts">
  import type { Props } from "./types.svelte"
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"

  let {
    as,
    borderTop,
    class: className,
    critical,
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
  const Tag = $derived(hasLabel ? "label" : (as ?? (href ? "a" : undefined)))
  const tagProps = $derived(
    hasLabel
      ? { class: `ui-${type}`, for: htmlFor }
      : { href, type: Tag === "button" ? "button" : undefined, ...rest },
  )
</script>

{#snippet content(
  part: string | Snippet,
)}{#if typeof part === "string"}{part}{:else}{@render part()}{/if}{/snippet}

{#snippet body()}
  {#if start}
    <div class="ui-start">
      {@render content(start)}
    </div>
  {/if}
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
  {#if end}
    <div class="ui-end">
      {@render content(end)}
    </div>
  {/if}
{/snippet}

<li
  class={[
    {
      "ui-border-top": borderTop,
      "ui-critical": critical,
      "ui-inset": inset,
    },
    className,
  ]}
  {...(hasLabel || !Tag ? rest : {}) as HTMLAttributes<HTMLLIElement>}
>
  {#if Tag}
    <svelte:element this={Tag} {...tagProps as HTMLAttributes<HTMLElement>}>
      {@render body()}
    </svelte:element>
  {:else}
    {@render body()}
  {/if}
  {#if submenu}{@render content(submenu)}{/if}
</li>
