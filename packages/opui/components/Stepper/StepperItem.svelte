<script lang="ts">
  import { content } from "../content.svelte"
  import { classAttrs } from "../cx"
  import type { StepperItemProps as Props } from "./types.svelte"

  let {
    "aria-current": ariaCurrent,
    class: className,
    completeLabel = ", completed",
    current,
    errorLabel = ", error",
    href,
    state,

    // Snippets
    description,
    iconComplete,
    label,
    ...rest
  }: Props = $props()

  const stateLabel = $derived(
    state === "error"
      ? errorLabel
      : state === "complete"
        ? completeLabel
        : undefined,
  )
  const link = $derived(href && !current && state)
</script>

<li
  aria-current={ariaCurrent ?? (current ? "step" : undefined)}
  {...classAttrs([state && `ui-state-${state}`, className])}
  {...rest}
>
  {#if iconComplete}
    <span aria-hidden="true" class="ui-icon-complete">
      {@render iconComplete()}
    </span>
  {/if}
  {#if link}
    <a {href}>
      {@render content(label)}{#if stateLabel}
        <span class="ui-sr-only">{stateLabel}</span>
      {/if}
    </a>
  {:else}
    {@render content(label)}{#if stateLabel}
      <span class="ui-sr-only">{stateLabel}</span>
    {/if}
  {/if}
  {#if description}
    <span class="ui-description">
      {@render content(description)}
    </span>
  {/if}
</li>
