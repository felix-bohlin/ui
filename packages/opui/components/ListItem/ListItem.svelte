<script lang="ts">
  import { content } from "../content.svelte"
  import type { Props } from "./types.svelte"
  import type { HTMLAttributes } from "svelte/elements"

  let {
    as,
    borderTop,
    class: className,
    color,
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
  const tagProps = $derived(
    hasControl
      ? { class: `ui-${type}`, for: htmlFor }
      : { href, type: Tag === "button" ? "button" : undefined, ...rest },
  )
</script>

{#snippet body()}
  {#if start}
    <div class="ui-start">
      {@render start()}
    </div>
  {/if}
  {#if label || description}
    <div class="ui-text">
      {#if label}<p>{@render content(label)}</p>{/if}
      {#if description}<p>{@render content(description)}</p>{/if}
      {@render children?.()}
    </div>
  {:else}
    {@render children?.()}
  {/if}
  {#if end}
    <div class="ui-end">
      {@render end()}
    </div>
  {/if}
{/snippet}

<li
  class={[
    {
      "ui-border-top": borderTop,
      "ui-inset": inset,
    },
    color && `ui-${color}`,
    className,
  ]}
  {...(hasControl || !Tag ? rest : {}) as HTMLAttributes<HTMLLIElement>}
>
  {#if Tag}
    <svelte:element this={Tag} {...tagProps as HTMLAttributes<HTMLElement>}>
      {@render body()}
    </svelte:element>
  {:else}
    {@render body()}
  {/if}
  {@render submenu?.()}
</li>
