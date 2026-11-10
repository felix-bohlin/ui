<script lang="ts">
  import "../../elements/character-count.js"
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import type { Props } from "./types.svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    autoFit,
    characterCount,
    characterCountLabel,
    class: className,
    defaultValue,
    error,
    hideLabel,
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
  const uid = $props.id()
  const getValue = () => value ?? defaultValue
  const setValue = (next: typeof value) => {
    value = next
  }
  const initialValue = untrack(getValue)
  const base = $derived(id || `textarea-${uid}`)
  const Root = $derived(label ? "label" : "div")
  const hasStartText = $derived(Boolean(startText))
  const hasEndText = $derived(Boolean(endText || characterCount))
  const linked = $derived(!label)
  const startTextId = $derived(
    linked && hasStartText ? `${base}-start-text` : undefined,
  )
  const endTextId = $derived(
    linked && hasEndText ? `${base}-end-text` : undefined,
  )
</script>

<svelte:element
  this={Root}
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
    <span class={[hideLabel ? "ui-sr-only" : "ui-label"]}>
      {@render content(label)}
    </span>
  {/if}
  {#if hasStartText}
    <span class="ui-start-text" id={startTextId}>
      {@render content(startText)}
    </span>
  {/if}
  <span class="ui-field">
    <textarea
      {...rest}
      aria-describedby={idRefs(startTextId, endTextId, ariaDescribedBy)}
      aria-invalid={error ? "true" : ariaInvalid}
      {id}
      name={name ?? field?.name}
      bind:value={getValue, setValue}
      defaultValue={defaultValue ?? initialValue}></textarea>
    {#if start}
      <span class="ui-start">
        {@render content(start)}
      </span>
    {/if}
    {#if end}
      <span class="ui-end">
        {@render content(end)}
      </span>
    {/if}
    {#if top}
      <span class="ui-top">
        {@render content(top)}
      </span>
    {/if}
    {#if bottom}
      <span class="ui-bottom">
        {@render content(bottom)}
      </span>
    {/if}
  </span>
  {#if hasEndText}
    <span class="ui-end-text" id={endTextId}>
      {@render content(endText)}{#if characterCount}
        <opui-character-count
          aria-hidden="true"
          class="ui-value"
          label={characterCountLabel}
        ></opui-character-count>
      {/if}
    </span>
  {/if}
  {@render children?.()}
</svelte:element>
