<script lang="ts">
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import type { Props } from "./types.svelte"

  let {
    autoFit,
    class: className,
    error,
    id,
    name,
    size,
    spread,
    style,
    value = $bindable(),
    variant,

    // Snippets
    children,
    bottom,
    end,
    endText,
    label,
    start,
    startText,
    top,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
</script>

<label
  class={[
    "ui-textarea",
    {
      "ui-auto-fit": autoFit,
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if label}
    <span class="ui-label">{@render content(label)}</span>
  {/if}
  {#if startText}
    <span class="ui-start-text">{@render content(startText)}</span>
  {/if}
  <span class="ui-field">
    <textarea
      {...rest}
      aria-invalid={error ? "true" : rest["aria-invalid"]}
      bind:value
      {id}
      name={name ?? field?.name}
    ></textarea>
    {#if start}
      <span class="ui-start">{@render content(start)}</span>
    {/if}
    {#if end}
      <span class="ui-end">{@render content(end)}</span>
    {/if}
    {#if top}
      <span class="ui-top">{@render content(top)}</span>
    {/if}
    {#if bottom}
      <span class="ui-bottom">{@render content(bottom)}</span>
    {/if}
  </span>
  {#if endText}
    <span class="ui-end-text">{@render content(endText)}</span>
  {/if}
  {@render children?.()}
</label>
