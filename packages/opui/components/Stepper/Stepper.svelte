<script lang="ts">
  import { mergeStyle } from "../style"
  import type { Props } from "./types.svelte"
  import { cssString } from "./css-string"

  let {
    class: className,
    complete,
    completedLabel,
    current,
    items,
    label,
    orientation,
    size,
    style,

    // Snippets
    check,
    children,
    ...rest
  }: Props = $props()

  const done = $derived(
    complete ||
      (current !== undefined && items !== undefined && current >= items.length),
  )
</script>

<ol
  aria-label={label}
  class={[
    "ui-stepper",
    { "ui-complete": done, "ui-vertical": orientation === "vertical" },
    size && `ui-${size}`,
    className,
  ]}
  style={mergeStyle(
    {
      "--_completed-label": completedLabel
        ? cssString(completedLabel)
        : undefined,
    },
    style,
  )}
  {...rest}
>
  {#each items ?? [] as { description, href, label: stepLabel }, index (index)}
    <li aria-current={index === current ? "step" : undefined}>
      {#if check}
        <span aria-hidden="true" class="ui-check">{@render check()}</span>
      {/if}
      {#if href && (done || (current !== undefined && index < current))}
        <a {href}>{stepLabel}</a>
      {:else}
        {stepLabel}
      {/if}
      {#if description}
        <span class="ui-description">{description}</span>
      {/if}
    </li>
  {/each}
  {@render children?.()}
</ol>
