<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import type { Props } from "./types.svelte"
  import type { Snippet } from "svelte"

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
    description,
    endText,
    footer,
    header,
    label,
    prefix,
    suffix,
    ...rest
  }: Props = $props()

  const field = getFieldContext()
</script>

{#snippet content(
  part: string | Snippet,
)}{#if typeof part === "string"}{part}{:else}{@render part()}{/if}{/snippet}

<label
  class={[
    "ui-textarea",
    size && `ui-${size}`,
    {
      "ui-auto-fit": autoFit,
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    className,
  ]}
  {style}
>
  {#if label}
    <span class="ui-label">{@render content(label)}</span>
  {/if}
  {#if description}
    <span class="ui-start-text">{@render content(description)}</span>
  {/if}
  <span class="ui-field">
    <textarea
      {...rest}
      aria-invalid={error ? "true" : rest["aria-invalid"]}
      bind:value
      {id}
      name={name ?? field?.name}
    ></textarea>
    {#if prefix}
      <span class="ui-prefix">{@render content(prefix)}</span>
    {/if}
    {#if suffix}
      <span class="ui-suffix">{@render content(suffix)}</span>
    {/if}
    {#if header}
      <span class="ui-header">{@render content(header)}</span>
    {/if}
    {#if footer}
      <span class="ui-footer">{@render content(footer)}</span>
    {/if}
  </span>
  {#if endText}
    <span class="ui-end-text">{@render content(endText)}</span>
  {/if}
  {@render children?.()}
</label>
