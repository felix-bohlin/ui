<script lang="ts">
  import type { Props } from "./types.svelte"
  import type { Snippet } from "svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    alphanumeric,
    class: className,
    error,
    grouped,
    id,
    length = 6,
    size,
    style,
    value = $bindable(),

    // Snippets
    endText,
    label,
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const endTextId = $derived(endText ? `end-text-${uid}` : undefined)
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
    "ui-one-time-code",
    {
      "ui-grouped": grouped,
    },
    size && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if label}
    <span class="ui-label">{@render content(label)}</span>
  {/if}
  <span class="ui-field">
    <input
      autocapitalize={alphanumeric ? "characters" : undefined}
      autocomplete="one-time-code"
      inputmode={alphanumeric ? undefined : "numeric"}
      pattern={alphanumeric ? `[A-Za-z0-9]{${length}}` : `[0-9]{${length}}`}
      spellcheck={alphanumeric ? "false" : undefined}
      {...rest}
      aria-describedby={describedBy}
      aria-invalid={error ? "true" : undefined}
      bind:value
      {id}
      maxlength={length}
      type="text"
    />
  </span>
  {#if endText}
    <span class="ui-end-text" id={endTextId}>{@render content(endText)}</span>
  {/if}
</label>
