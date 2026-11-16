<script lang="ts">
  import { content } from "../content.svelte"
  import { classAttrs } from "../cx"
  import type { StepperItemProps as Props } from "./types.svelte"

  let {
    "aria-current": ariaCurrent,
    class: className,
    complete,
    completeLabel = ", completed",
    current,
    error,
    errorLabel = ", error",
    href,

    // Snippets
    description,
    iconComplete,
    label,
    ...rest
  }: Props = $props()

  const state = $derived(
    error ? errorLabel : complete ? completeLabel : undefined,
  )
  const link = $derived(href && !current && (complete || error))
</script>

<li
  aria-current={ariaCurrent ?? (current ? "step" : undefined)}
  {...classAttrs([{ "ui-complete": complete, "ui-error": error }, className])}
  {...rest}
>
  {#if iconComplete}
    <span aria-hidden="true" class="ui-icon-complete">
      {@render iconComplete()}
    </span>
  {/if}
  {#if link}
    <a {href}>
      {@render content(label)}{#if state}
        <span class="ui-sr-only">{state}</span>
      {/if}
    </a>
  {:else}
    {@render content(label)}{#if state}
      <span class="ui-sr-only">{state}</span>
    {/if}
  {/if}
  {#if description}
    <span class="ui-description">
      {@render content(description)}
    </span>
  {/if}
</li>
