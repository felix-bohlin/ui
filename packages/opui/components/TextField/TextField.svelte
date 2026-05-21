<script lang="ts">
  import type * as FieldSet from "../FieldSet/types.svelte"
  import type { Props } from "./types.svelte"
  import { getContext } from "svelte"

  export const title = "Text Field"

  const {
    autoFit,
    class: className,
    critical,
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
</script>

<label
  bind:this={element}
  class={[
    "text-field",
    {
      "auto-fit": autoFit,
      filled,
      spread,
      small,
    },
    className,
  ]}
  data-invalid={critical || undefined}
  {...rest}
>
  {#if label}
    <span class="label">
      {#if typeof label === "string"}
        {label}
      {:else}
        {@render label()}
      {/if}
    </span>
  {/if}
  {#if description}
    <span class="start-text">
      {#if typeof description === "string"}
        {description}
      {:else}
        {@render description()}
      {/if}
    </span>
  {/if}
  <span class="field">
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
      <span class="prefix">
        {#if typeof prefix === "string"}{prefix}
        {:else}{@render prefix()}
        {/if}
      </span>
    {/if}

    {#if suffix}
      <span class="suffix">
        {#if typeof suffix === "string"}{suffix}
        {:else}{@render suffix()}
        {/if}
      </span>
    {/if}

    {#if header}
      <span class="header">
        {#if typeof header === "string"}{header}
        {:else}{@render header()}
        {/if}
      </span>
    {/if}
    {#if footer}
      <span class="footer">
        {#if typeof footer === "string"}{footer}
        {:else}{@render footer()}
        {/if}
      </span>
    {/if}
  </span>
  {#if endText || supportingText}
    <span class="end-text">
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
