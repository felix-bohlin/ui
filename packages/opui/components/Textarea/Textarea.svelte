<script lang="ts">
  import { getContext } from "svelte"
  import type { Props } from "./types.svelte"
  import type * as FieldSet from "../FieldSet/types.svelte"

  export const title = "Textarea"

  const {
    autoFit,
    class: className,
    description: descriptionProp,
    critical,
    filled,
    id,
    label,
    spread,
    small,

    // Textarea props
    cols,
    disabled,
    maxlength,
    minlength,
    name,
    placeholder,
    required,
    rows,
    value,

    // Snippets
    children,
    endText,
    footer,
    header,
    prefix,
    suffix,
    startText,
    supportingText,
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
    "textarea",
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
    <textarea
      {cols}
      {disabled}
      id={fieldId}
      {maxlength}
      {minlength}
      name={fieldName}
      {placeholder}
      {required}
      {rows}
      {value}
    ></textarea>
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
