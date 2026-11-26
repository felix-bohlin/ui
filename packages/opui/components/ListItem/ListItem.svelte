<script lang="ts">
  import { content } from "../content.svelte"
  import { tagAttrs } from "../tag"
  import { defined } from "../attrs"
  import { classAttrs } from "../cx"
  import type { Props } from "./types.svelte"
  import type { SvelteHTMLElements } from "svelte/elements"

  let {
    as,
    borderTop,
    class: className,
    color,
    disabled,
    for: htmlFor,
    href,
    inset,
    type,

    // Snippets
    children,
    description,
    end,
    label,
    start,
    submenu,
    ...rest
  }: Props = $props()

  const hasControl = $derived(
    type === "checkbox" || type === "radio" || type === "switch",
  )
  const Tag = $derived(hasControl ? "label" : (as ?? (href ? "a" : undefined)))
  const restOnItem = $derived(hasControl || !Tag)
  const hasLabel = $derived(!!label)
  const hasDescription = $derived(!!description)
</script>

<li
  {...classAttrs([
    { "ui-border-top": borderTop, "ui-inset": inset },
    color && `ui-${color}`,
    className,
  ])}
  {...restOnItem ? (rest as SvelteHTMLElements["li"]) : {}}
>
  {#if Tag}
    <svelte:element
      this={Tag}
      {...classAttrs([hasControl && `ui-${type}`])}
      for={hasControl ? htmlFor : undefined}
      {...hasControl ? {} : tagAttrs(Tag, disabled, href)}
      {...defined(restOnItem ? {} : (rest as object))}
    >
      {#if start}
        <div class="ui-start">
          {@render start()}
        </div>
      {/if}{#if hasLabel || hasDescription}
        <div class="ui-text">
          {#if hasLabel}
            <p>
              {@render content(label)}
            </p>
          {/if}
          {#if hasDescription}
            <p>
              {@render content(description)}
            </p>
          {/if}
          {@render children?.()}
        </div>
      {:else}
        {@render children?.()}
      {/if}{#if end}
        <div class="ui-end">
          {@render end()}
        </div>
      {/if}
    </svelte:element>
  {:else}
    {#if start}
      <div class="ui-start">
        {@render start()}
      </div>
    {/if}{#if hasLabel || hasDescription}
      <div class="ui-text">
        {#if hasLabel}
          <p>
            {@render content(label)}
          </p>
        {/if}
        {#if hasDescription}
          <p>
            {@render content(description)}
          </p>
        {/if}
        {@render children?.()}
      </div>
    {:else}
      {@render children?.()}
    {/if}{#if end}
      <div class="ui-end">
        {@render end()}
      </div>
    {/if}
  {/if}{@render submenu?.()}
</li>
