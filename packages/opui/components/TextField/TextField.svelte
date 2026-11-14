<script lang="ts">
  import "../../elements/character-count.js"
  import "../../elements/text-field.js"
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import Button from "../Button/Button.svelte"
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
    disabled,
    dropZone,
    error,
    hideLabel,
    id,
    name,
    passwordToggle,
    passwordToggleLabel = "Show password",
    size,
    spread,
    style,
    type = "text",
    value = $bindable(),
    variant,

    // Snippets
    children,
    bottom,
    end,
    endText,
    iconChecked,
    iconUnchecked,
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
  const base = $derived(id || `text-field-${uid}`)
  const hasLabel = $derived(Boolean(label))
  const Root = $derived(
    passwordToggle ? "opui-text-field" : hasLabel ? "label" : "div",
  )
  const Label = $derived(passwordToggle ? "label" : "span")
  const hasStartText = $derived(Boolean(startText))
  const hasEndText = $derived(Boolean(endText || characterCount))
  const inputId = $derived(passwordToggle ? base : id)
  const named = $derived(hasLabel && !passwordToggle)
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
    "ui-text-field",
    {
      "ui-auto-fit": autoFit,
      "ui-drop-zone": dropZone,
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if hasLabel}
    <svelte:element
      this={Label}
      class={[hideLabel ? "ui-sr-only" : "ui-label"]}
      for={passwordToggle ? inputId : undefined}
      id={labelId}
    >
      {@render content(label)}
    </svelte:element>
  {/if}
  {#if hasStartText}
    <span class="ui-start-text" id={startTextId}>
      {@render content(startText)}
    </span>
  {/if}
  <span class="ui-field">
    <input
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
      {disabled}
      id={inputId}
      name={name ?? field?.name}
      {type}
      bind:value={getValue, setValue}
      defaultValue={defaultValue ?? initialValue}
    />
    {#if start}
      <span class="ui-start" id={startId}>
        {@render content(start)}
      </span>
    {/if}
    {#if end || passwordToggle}
      <span class="ui-end" id={endId}>
        {@render content(end)}{#if passwordToggle}
          <Button
            aria-label={passwordToggleLabel}
            aria-pressed="false"
            command="--toggle-password"
            commandfor={inputId}
            {disabled}
            round
          >
            {#if iconUnchecked}
              <span aria-hidden="true" class="ui-icon-unchecked">
                {@render iconUnchecked()}
              </span>
            {:else}
              <svg
                aria-hidden="true"
                class="ui-icon-unchecked"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              ></svg>
            {/if}{#if iconChecked}
              <span aria-hidden="true" class="ui-icon-checked">
                {@render iconChecked()}
              </span>
            {:else}
              <svg
                aria-hidden="true"
                class="ui-icon-checked"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              ></svg>
            {/if}
          </Button>
        {/if}
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
