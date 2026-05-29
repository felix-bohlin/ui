<script lang="ts">
  import type * as FieldSet from "../FieldSet/types.svelte"
  import type { Props } from "./types.svelte"
  import { getContext } from "svelte"

  export const title = "Text Field"

  const {
    autoFit,
    class: className,
    error,
    filled,
    id,
    label,
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
    value,

    // Snippets
    children,
    description: descriptionProp,
    endText,
    footer,
    header,
    prefix,
    suffix,
    supportingText,
    startText,
    ...rest
  }: Props = $props()

  let element = $state<HTMLLabelElement | null>(null)
  export { element as this }
  const componentId = $props.id()
  const currentFieldName = getContext<FieldSet.Context["name"]>("name")
  const description = $derived(descriptionProp || startText)
  const fieldId = $derived(id || `text-field-${componentId}`)
  const fieldName = $derived(name || currentFieldName)
  const classes = $derived([
    "ui-text-field",
    {
      "ui-auto-fit": autoFit,
      "ui-filled": filled,
      "ui-spread": spread,
      "ui-small": small,
    },
    className,
  ])
</script>

<label
  bind:this={element}
  class={classes}
  data-invalid={error || undefined}
  {...rest}
>
  {#if label}
    <span class="ui-label">
      {#if typeof label === "string"}
        {label}
      {:else}
        {@render label()}
      {/if}
    </span>
  {/if}
  {#if description}
    <span class="ui-start-text">
      {#if typeof description === "string"}
        {description}
      {:else}
        {@render description()}
      {/if}
    </span>
  {/if}
  <span class="ui-field">
    <input
      {disabled}
      id={fieldId}
      inputmode={type === "numeric" ? "numeric" : undefined}
      {list}
      {max}
      {min}
      name={fieldName}
      pattern={type === "numeric" ? "[0-9]*" : undefined}
      {placeholder}
      {required}
      {step}
      type={type === "numeric" ? "text" : type}
      {value}
    />
    {#if prefix}
      <span class="ui-prefix">
        {#if typeof prefix === "string"}{prefix}
        {:else}{@render prefix()}
        {/if}
      </span>
    {/if}

    {#if suffix}
      <span class="ui-suffix">
        {#if typeof suffix === "string"}{suffix}
        {:else}{@render suffix()}
        {/if}
      </span>
    {/if}

    {#if header}
      <span class="ui-header">
        {#if typeof header === "string"}{header}
        {:else}{@render header()}
        {/if}
      </span>
    {/if}
    {#if footer}
      <span class="ui-footer">
        {#if typeof footer === "string"}{footer}
        {:else}{@render footer()}
        {/if}
      </span>
    {/if}
  </span>
  {#if endText || supportingText}
    <span class="ui-end-text">
      {#if typeof endText === "string"}{endText}
      {:else if endText}{@render endText()}
      {/if}
      {#if typeof supportingText === "string"}{supportingText}
      {:else if supportingText}{@render supportingText()}
      {/if}
    </span>
  {/if}
  {@render children?.()}
</label>
