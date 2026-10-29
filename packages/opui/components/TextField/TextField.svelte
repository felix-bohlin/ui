<script lang="ts">
  import "../../elements/character-count.js"
  import "../../elements/text-field.js"
  import Button from "../Button/Button.svelte"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import { hidePath, showPath } from "./icons"
  import type { Props } from "./types.svelte"

  const uid = $props.id()

  let {
    autoFit,
    characterCount,
    characterCountLabel,
    class: className,
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
    label,
    start,
    startText,
    top,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
  const hasEndText = $derived(Boolean(endText || characterCount))
  const inputId = $derived(passwordToggle ? (id ?? `${uid}-text-field`) : id)
  const startTextId = $derived(
    passwordToggle && startText ? `${uid}-start-text` : undefined,
  )
  const endTextId = $derived(
    passwordToggle && hasEndText ? `${uid}-end-text` : undefined,
  )
</script>

<svelte:element
  this={passwordToggle ? "opui-text-field" : "label"}
  class={[
    "ui-text-field",
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
    <svelte:element
      this={passwordToggle ? "label" : "span"}
      class={[hideLabel ? "ui-sr-only" : "ui-label"]}
      for={passwordToggle ? inputId : undefined}
      >{@render content(label)}</svelte:element
    >
  {/if}
  {#if startText}
    <span class="ui-start-text" id={startTextId}
      >{@render content(startText)}</span
    >
  {/if}
  <span class="ui-field">
    <input
      {...rest}
      aria-describedby={idRefs(
        startTextId,
        endTextId,
        rest["aria-describedby"],
      )}
      aria-invalid={error ? "true" : rest["aria-invalid"]}
      bind:value
      id={inputId}
      inputmode={rest.inputmode ?? (type === "numeric" ? "numeric" : undefined)}
      name={name ?? field?.name}
      pattern={rest.pattern ?? (type === "numeric" ? "[0-9]*" : undefined)}
      type={type === "numeric" ? "text" : type}
    />
    {#if start}
      <span class="ui-start">{@render content(start)}</span>
    {/if}
    {#if end || passwordToggle}
      <span class="ui-end"
        >{#if end}{@render content(end)}{/if}{#if passwordToggle}<Button
            aria-label={passwordToggleLabel}
            aria-pressed="false"
            command="--toggle-password"
            commandfor={inputId}
            round
          >
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
          </Button>{/if}</span
      >
    {/if}
    {#if top}
      <span class="ui-top">{@render content(top)}</span>
    {/if}
    {#if bottom}
      <span class="ui-bottom">{@render content(bottom)}</span>
    {/if}
  </span>
  {#if hasEndText}
    <span class="ui-end-text" id={endTextId}
      >{#if endText}{@render content(
          endText,
        )}{/if}{#if characterCount}<opui-character-count
          aria-hidden="true"
          class="ui-value"
          label={characterCountLabel}
        ></opui-character-count>{/if}</span
    >
  {/if}
  {@render children?.()}
</svelte:element>
