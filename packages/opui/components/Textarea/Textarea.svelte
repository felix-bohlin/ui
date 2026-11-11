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
  const initialValue = untrack(getValue)
  const base = $derived(id || `textarea-${uid}`)
  const named = $derived(Boolean(label))
  const Root = $derived(named ? "label" : "div")
  const hasStartText = $derived(Boolean(startText))
  const hasEndText = $derived(Boolean(endText || characterCount))
  const labelId = $derived(named ? `${base}-label` : undefined)
  const startId = $derived(named && start ? `${base}-start` : undefined)
  const endId = $derived(named && end ? `${base}-end` : undefined)
  const topId = $derived(top ? `${base}-top` : undefined)
  const bottomId = $derived(bottom ? `${base}-bottom` : undefined)
  const startTextId = $derived(hasStartText ? `${base}-start-text` : undefined)
  const endTextId = $derived(hasEndText ? `${base}-end-text` : undefined)
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
  {#if named}
    <span class={[hideLabel ? "ui-sr-only" : "ui-label"]} id={labelId}>
      {@render content(label)}
    </span>
  {:else}
    {@render content(label)}
  {/if}
  {#if hasStartText}
    <span class="ui-start-text" id={startTextId}>
      {@render content(startText)}
    </span>
  {/if}
  <span class="ui-field">
    <textarea
      {...rest}
      aria-describedby={idRefs(
        startTextId,
        topId,
        bottomId,
        endTextId,
        ariaDescribedBy,
      )}
      aria-invalid={error ? "true" : ariaInvalid}
      aria-labelledby={named ? idRefs(labelId, startId, endId) : ariaLabelledBy}
      {id}
      name={name ?? field?.name}
      bind:value={getValue, setValue}
      defaultValue={defaultValue ?? initialValue}></textarea>
    {#if start}
      <span class="ui-start" id={startId}>
        {@render content(start)}
      </span>
    {/if}
    {#if end}
      <span class="ui-end" id={endId}>
        {@render content(end)}
      </span>
    {/if}
    {#if top}
      <span class="ui-top" id={topId}>
        {@render content(top)}
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
</svelte:element>
