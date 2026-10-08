<script lang="ts">
  import type { Props } from "./types.svelte"
  import { cssString } from "./css-string"

  let {
    class: className,
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
</script>

<ol
  aria-label={label}
  class={[
    "ui-stepper",
    { "ui-vertical": orientation === "vertical" },
    size && `ui-${size}`,
    className,
  ]}
  style={[
    completedLabel && `--_completed-label: ${cssString(completedLabel)};`,
    style,
  ]
    .filter(Boolean)
    .join(" ") || undefined}
  {...rest}
>
  {#each items ?? [] as { description, href, label: stepLabel }, index (index)}
    <li aria-current={index === current ? "step" : undefined}>
      {#if check}
        <span aria-hidden="true" class="ui-check">{@render check()}</span>
      {/if}
      {#if href && current !== undefined && index < current}
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
