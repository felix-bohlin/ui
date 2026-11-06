<script lang="ts">
  import "../../elements/character-count.js"
  import "../../elements/text-field.js"
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import Button from "../Button/Button.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import { hidePath, showPath } from "./icons"
  import type { Props } from "./types.svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    autoFit,
    characterCount,
    characterCountLabel,
    class: className,
    dropZone,
    error,
    hideLabel,
    id,
    inputmode,
    name,
    passwordToggle,
    passwordToggleLabel = "Show password",
    pattern,
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
  const initialValue = untrack(() => value)
  const base = $derived(id ?? `text-field-${uid}`)
  const Root = $derived(
    passwordToggle ? "opui-text-field" : label ? "label" : "div",
  )
  const Label = $derived(passwordToggle ? "label" : "span")
  const hasStartText = $derived(Boolean(startText))
  const hasEndText = $derived(Boolean(endText || characterCount))
  const inputId = $derived(passwordToggle ? base : id)
  const startTextId = $derived(
    passwordToggle && hasStartText ? `${base}-start-text` : undefined,
  )
  const endTextId = $derived(
    passwordToggle && hasEndText ? `${base}-end-text` : undefined,
  )
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
  {#if label}
    <svelte:element
      this={Label}
      class={[hideLabel ? "ui-sr-only" : "ui-label"]}
      for={passwordToggle ? inputId : undefined}
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
      aria-describedby={idRefs(startTextId, endTextId, ariaDescribedBy)}
      aria-invalid={error ? "true" : ariaInvalid}
      id={inputId}
      inputmode={inputmode ?? (type === "numeric" ? "numeric" : undefined)}
      name={name ?? field?.name}
      pattern={pattern ?? (type === "numeric" ? "[0-9]*" : undefined)}
      type={type === "numeric" ? "text" : type}
      bind:value
      defaultValue={initialValue}
    />
    {#if start}
      <span class="ui-start">
        {@render content(start)}
      </span>
    {/if}
    {#if end || passwordToggle}
      <span class="ui-end">
        {@render content(end)}{#if passwordToggle}
          <Button
            aria-label={passwordToggleLabel}
            aria-pressed="false"
            command="--toggle-password"
            commandfor={inputId}
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
              >
                <path fill="currentColor" d={showPath} />
              </svg>
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
              >
                <path fill="currentColor" d={hidePath} />
              </svg>
            {/if}
          </Button>
        {/if}
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
