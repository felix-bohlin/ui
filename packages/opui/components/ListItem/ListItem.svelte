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
  const labelClass = $derived(type || "")
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
    <div class="start">
      {@render snippetString(start)}
    </div>
  {/if}
  {#if text || headline || description}
    <div class="text">
      {#if headline}
        <p>{@render snippetString(headline)}</p>
      {/if}
      {#if description}
        <p>{@render snippetString(description)}</p>
      {/if}
      {@render snippetString(text)}
    </div>
  {/if}
  {#if end}
    <div class="end">
      {@render snippetString(end)}
    </div>
  {/if}
  {@render children?.()}
{/snippet}

<li
  bind:this={element}
  class={[
    {
      "border-top": borderTop,
      inset,
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
