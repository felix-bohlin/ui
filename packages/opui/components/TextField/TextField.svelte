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
    type = "text",
    value = $bindable(),
    variant,

    // Snippets
    children,
    endText,
    footer,
    header,
    label,
    prefix,
    startText,
    suffix,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
</script>

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
  {#if startText}
    <span class="ui-start-text">{@render content(startText)}</span>
  {/if}
  <span class="ui-field">
    <input
      {...rest}
      aria-invalid={error ? "true" : rest["aria-invalid"]}
      bind:value
      {id}
      inputmode={rest.inputmode ?? (type === "numeric" ? "numeric" : undefined)}
      name={name ?? field?.name}
      pattern={rest.pattern ?? (type === "numeric" ? "[0-9]*" : undefined)}
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
  {#if endText}
    <span class="ui-end-text">{@render content(endText)}</span>
  {/if}
  {@render children?.()}
</label>
