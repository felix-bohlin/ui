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
    choice,
    class: className,
    color,
    disabled,
    for: htmlFor,
    href,
    inset,

    // Snippets
    children,
    description,
    end,
    iconChecked,
    label,
    start,
    submenu,
    ...rest
  }: Props = $props()

  const hasControl = $derived(
    choice === "checkbox" || choice === "radio" || choice === "switch",
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
      {...classAttrs([hasControl && `ui-${choice}`])}
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
      {/if}{#if iconChecked}
        <span aria-hidden="true" class="ui-icon-checked">
          {@render iconChecked()}
        </span>
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
    {/if}{#if iconChecked}
      <span aria-hidden="true" class="ui-icon-checked">
        {@render iconChecked()}
      </span>
    {/if}
  {/if}{@render submenu?.()}
</li>
