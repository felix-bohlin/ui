<script lang="ts">
  import type { Props } from "./types.svelte"
  import type { Snippet } from "svelte"

  export const title = "List Item" as const

  const props: Props = $props()
  const {
    as: Tag,
    borderTop,
    class: className,
    for: htmlFor,
    inset,
    type,

    // Snippets
    children,
    description,
    end,
    headline,
    start,
    text,
    ...rest
  } = $derived(props)

  let element = $state<HTMLLIElement | null>(null)
  export { element as this }
  const hasLabel = $derived(
    type && ["checkbox", "radio", "switch"].includes(type),
  )
  const labelClass = $derived(`ui-${type}` || "")
</script>

{#snippet snippetString(ss: Snippet | string | undefined)}
  {#if typeof ss === "string"}
    {ss}
  {:else}
    {@render ss?.()}
  {/if}
{/snippet}

{#snippet inner()}
  {#if start}
    <div class="ui-start">
      {@render snippetString(start)}
    </div>
  {/if}
  {#if text || headline || description}
    <div class="ui-text">
      {#if headline}
        <p>{@render snippetString(headline)}</p>
      {/if}
      {#if description}
        <p>{@render snippetString(description)}</p>
      {/if}
      {@render snippetString(text)}
      {@render children?.()}
    </div>
  {:else}
    {@render children?.()}
  {/if}
  {#if end}
    <div class="ui-end">
      {@render snippetString(end)}
    </div>
  {/if}
{/snippet}

<li
  bind:this={element}
  class={[
    {
      "ui-border-top": borderTop,
      "ui-inset": inset,
    },
    className,
  ]}
  {...!(props.as || props.as === "li") ? (rest as typeof props) : {}}
>
  {#if hasLabel}
    <label class={labelClass} for={htmlFor}>
      {@render inner()}
    </label>
  {:else if Tag}
    <svelte:element
      this={Tag}
      {...props.as != "li" ? (rest as typeof props) : {}}
    >
      {@render inner()}
    </svelte:element>
  {:else}
    {@render inner()}
  {/if}
</li>
