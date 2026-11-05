<script lang="ts">
  import { content } from "../content.svelte"
  import { classAttrs } from "../cx"
  import type { StepperItemProps as Props } from "./types.svelte"

  let {
    class: className,
    complete,
    completedLabel = ", completed",
    current,
    error,
    errorLabel = ", error",
    href,

    // Snippets
    description,
    iconChecked,
    label,
    ...rest
  }: Props = $props()

  const state = $derived(
    error ? errorLabel : complete ? completedLabel : undefined,
  )
  const link = $derived(href && !current && (complete || error))
</script>

<li
  aria-current={current ? "step" : undefined}
  {...classAttrs([{ "ui-complete": complete, "ui-error": error }, className])}
  {...rest}
>
  {#if iconChecked}<span aria-hidden="true" class="ui-icon-checked"
      >{@render iconChecked?.()}</span
    >{/if}
  {#if link}<a {href}
      >{@render content(label)}{#if state}<span class="ui-sr-only">{state}</span
        >{/if}</a
    >{:else}{@render content(label)}{#if state}<span class="ui-sr-only"
        >{state}</span
      >{/if}{/if}
  {#if description}<span class="ui-description"
      >{@render content(description)}</span
    >{/if}
</li>
