<script lang="ts">
  import { getFieldContext } from "../FieldGroup/context"
  import type { Props } from "./types.svelte"
  import type { Snippet } from "svelte"

  let {
    autoFit,
    class: className,
    error,
    filled,
    id,
    ref = $bindable(null),
    small,
    spread,

    // Textarea props
    cols,
    disabled,
    maxlength,
    minlength,
    name,
    placeholder,
    required,
    rows,
    value = $bindable(),

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

  const componentId = $props.id()
  const field = getFieldContext()
</script>

{#snippet snippetString(ss: Snippet | string | undefined)}
  {#if typeof ss === "string"}
    {ss}
  {:else}
    {@render ss?.()}
  {/if}
{/snippet}

<label
  bind:this={ref}
  class={[
    "ui-textarea",
    {
      "ui-auto-fit": autoFit,
      "ui-filled": filled,
      "ui-spread": spread,
      "ui-small": small,
    },
    className,
  ]}
  data-invalid={error || undefined}
  {...rest}
>
  {#if label}
    <span class="ui-label">{@render snippetString(label)}</span>
  {/if}
  {#if description}
    <span class="ui-start-text">{@render snippetString(description)}</span>
  {/if}
  <span class="ui-field">
    <textarea
      bind:value
      {cols}
      {disabled}
      id={id || `textarea-${componentId}`}
      {maxlength}
      {minlength}
      name={name || field?.name}
      {placeholder}
      {required}
      {rows}
    ></textarea>
    {#if prefix}
      <span class="ui-prefix">{@render snippetString(prefix)}</span>
    {/if}
    {#if suffix}
      <span class="ui-suffix">{@render snippetString(suffix)}</span>
    {/if}
    {#if header}
      <span class="ui-header">{@render snippetString(header)}</span>
    {/if}
    {#if footer}
      <span class="ui-footer">{@render snippetString(footer)}</span>
    {/if}
  </span>
  {#if endText || supportingText}
    <span class="ui-end-text">
      {@render snippetString(endText)}
      {@render snippetString(supportingText)}
    </span>
  {/if}
  {@render children?.()}
</label>
