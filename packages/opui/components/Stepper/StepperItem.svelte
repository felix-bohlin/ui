<script lang="ts">
  import { content } from "../content.svelte"
  import type { StepperItemProps as Props } from "./types.svelte"

  let {
    class: className,
    complete,
    completedLabel = ", completed",
    current,
    description,
    error,
    errorLabel = ", error",
    href,
    label,

    // Snippets
    iconChecked,
    ...rest
  }: Props = $props()

  const state = $derived(
    error ? errorLabel : complete ? completedLabel : undefined,
  )
</script>

{#snippet text()}
  {#if label}{@render content(label)}{/if}
  {#if state}<span class="ui-sr-only">{state}</span>{/if}
{/snippet}

<li
  aria-current={current ? "step" : undefined}
  class={[{ "ui-complete": complete, "ui-error": error }, className]}
  {...rest}
>
  {#if iconChecked}
    <span aria-hidden="true" class="ui-icon-checked"
      >{@render iconChecked()}</span
    >
  {/if}
  {#if href && !current && (complete || error)}
    <a {href}>{@render text()}</a>
  {:else}
    {@render text()}
  {/if}
  {#if description}
    <span class="ui-description">{@render content(description)}</span>
  {/if}
</li>
