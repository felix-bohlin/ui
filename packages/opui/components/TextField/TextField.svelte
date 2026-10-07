<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import type { Props } from "./types.svelte"
  import type { Snippet } from "svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    autoFit,
    class: className,
    error,
    id,
    name,
    size,
    spread,
    startText,
    style,
    type = "text",
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
    supportingText,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const field = getFieldContext()
  const endTextId = $derived(
    endText || supportingText ? `end-text-${uid}` : undefined,
  )
  const describedBy = $derived(
    [endTextId, ariaDescribedBy].filter(Boolean).join(" ") || undefined,
  )
</script>

{#snippet content(
  part: string | Snippet,
)}{#if typeof part === "string"}{part}{:else}{@render part()}{/if}{/snippet}

<label
  class={[
    "ui-text-field",
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
  {#if description || startText}
    <span class="ui-start-text">
      {#if typeof description === "function"}
        {startText}
        {@render description()}
      {:else}
        {description || startText}
      {/if}
    </span>
  {/if}
  <span class="ui-field">
    <input
      {...rest}
      aria-describedby={describedBy}
      aria-invalid={error ? "true" : undefined}
      bind:value
      {id}
      inputmode={type === "numeric" ? "numeric" : undefined}
      name={name ?? field?.name}
      pattern={type === "numeric" ? "[0-9]*" : undefined}
      type={type === "numeric" ? "text" : type}
    />
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
  {#if endText || supportingText}
    <span class="ui-end-text" id={endTextId}>
      {#if endText}{@render content(endText)}{/if}
      {#if supportingText}{@render content(supportingText)}{/if}
    </span>
  {/if}
  {@render children?.()}
</label>
