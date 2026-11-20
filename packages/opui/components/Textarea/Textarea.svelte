<script lang="ts">
  import "../../elements/character-count.js"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { fieldDescribedBy } from "../id"
  import type { Props } from "./types.svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-labelledby": ariaLabelledBy,
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
  const base = $derived(id || `textarea-${uid}`)
  const hasLabel = $derived(Boolean(label))
  const hasStartText = $derived(Boolean(startText))
  const hasEndText = $derived(Boolean(endText || characterCount))
  const textareaId = $derived(hasLabel ? base : id)
  const startId = $derived(start ? `${base}-start` : undefined)
  const endId = $derived(end ? `${base}-end` : undefined)
  const topId = $derived(top ? `${base}-top` : undefined)
  const bottomId = $derived(bottom ? `${base}-bottom` : undefined)
  const startTextId = $derived(hasStartText ? `${base}-start-text` : undefined)
  const endTextId = $derived(hasEndText ? `${base}-end-text` : undefined)
</script>

<div
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
  {#if hasLabel}
    <label class={hideLabel ? "ui-sr-only" : "ui-label"} for={textareaId}>
      {@render content(label)}
    </label>
  {/if}
  {#if hasStartText}
    <span class="ui-start-text" id={startTextId}>
      {@render content(startText)}
    </span>
  {/if}
  <span class="ui-field">
    {#if top}
      <span class="ui-top" id={topId}>
        {@render content(top)}
      </span>
    {/if}
    {#if start}
      <span class="ui-start" id={startId}>
        {@render content(start)}
      </span>
    {/if}
    <textarea
      {...rest}
      aria-describedby={fieldDescribedBy(
        {
          bottom: bottomId,
          end: endId,
          endText: endTextId,
          start: startId,
          startText: startTextId,
          top: topId,
        },
        ariaDescribedBy,
      )}
      aria-invalid={error ? "true" : ariaInvalid}
      aria-labelledby={ariaLabelledBy}
      id={textareaId}
      name={name ?? field?.name}
      bind:value={getValue, setValue}
      {defaultValue}></textarea>
    {#if end}
      <span class="ui-end" id={endId}>
        {@render content(end)}
      </span>
    {/if}
    {#if bottom}
      <span class="ui-bottom" id={bottomId}>
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
</div>
