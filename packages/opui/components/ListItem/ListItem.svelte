<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "List Item" as const

  const {
    as: Tag,
    borderTop,
    class: className,
    description,
    for: htmlFor,
    headline,
    inset,
    type,

    // Snippets
    children,
    end,
    start,
    text,
    ...rest
  }: Props = $props()

  let element = $state<HTMLLIElement | null>(null)
  export { element as this }
  const hasLabel = $derived(
    type && ["checkbox", "radio", "switch"].includes(type),
  )
  const labelClass = $derived(type || "")
  const liProps = $derived(Tag ? {} : rest)
  const innerProps = $derived(Tag ? rest : {})
</script>

{#snippet inner()}
  {#if start}
    <div class="start">
      {@render start()}
    </div>
  {/if}
  {#if text || headline || description}
    <div class="text">
      {#if headline}
        <p>{headline}</p>
      {/if}
      {#if description}
        <p>{description}</p>
      {/if}
      {@render text?.()}
    </div>
  {/if}
  {#if end}
    <div class="end">
      {@render end()}
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
  {...liProps}
>
  {#if hasLabel}
    <label class={labelClass} for={htmlFor}>
      {@render inner()}
    </label>
  {:else if Tag}
    <svelte:element this={Tag} {...innerProps}>
      {@render inner()}
    </svelte:element>
  {:else}
    {@render inner()}
  {/if}
</li>
