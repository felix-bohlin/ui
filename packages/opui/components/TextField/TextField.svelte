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
    label,
    ref = $bindable(null),
    small,
    spread,

    // Input Props
    disabled,
    list,
    max,
    min,
    name,
    placeholder,
    required,
    step,
    type = "text",
    value = $bindable(),

    // Snippets
    children,
    description: descriptionProp,
    endText,
    footer,
    header,
    prefix,
    startText,
    suffix,
    supportingText,
    ...rest
  }: Props = $props()

  const componentId = $props.id()
  const field = getFieldContext()
  const description = $derived(descriptionProp || startText)
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
    "ui-text-field",
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
    <input
      bind:value
      {disabled}
      id={id || `text-field-${componentId}`}
      inputmode={type === "numeric" ? "numeric" : undefined}
      {list}
      {max}
      {min}
      name={name || field?.name}
      pattern={type === "numeric" ? "[0-9]*" : undefined}
      {placeholder}
      {required}
      {step}
      type={type === "numeric" ? "text" : type}
    />
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
