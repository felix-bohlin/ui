<script lang="ts">
  import "../../elements/number-stepper.js"
  import Button from "../Button/Button.svelte"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import { minusPath, plusPath } from "./icons"
  import type { Props } from "./types.svelte"

  const generatedId = $props.id()

  let {
    class: className,
    decreaseLabel = "Decrease",
    error,
    hideLabel,
    id,
    increaseLabel = "Increase",
    name,
    size,
    spread,
    style,
    value = $bindable(),
    variant,

    // Snippets
    endText,
    label,
    startText,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
  const inputId = $derived(id ?? generatedId)
  const startTextId = $derived(
    startText ? `${generatedId}-start-text` : undefined,
  )
  const endTextId = $derived(endText ? `${generatedId}-end-text` : undefined)
</script>

<opui-number-stepper
  class={[
    "ui-number-stepper",
    {
      "ui-filled": variant === "filled",
      "ui-spread": spread,
    },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if label}
    <label class={[hideLabel ? "ui-sr-only" : "ui-label"]} for={inputId}
      >{@render content(label)}</label
    >
  {/if}
  {#if startText}
    <span class="ui-start-text" id={startTextId}
      >{@render content(startText)}</span
    >
  {/if}
  <span class="ui-field">
    <span class="ui-start">
      <Button
        aria-label={decreaseLabel}
        command="--step-down"
        commandfor={inputId}
        round
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d={minusPath}></path>
        </svg>
      </Button>
    </span>
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
      name={name ?? field?.name}
      type="number"
    />
    <span class="ui-end">
      <Button
        aria-label={increaseLabel}
        command="--step-up"
        commandfor={inputId}
        round
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d={plusPath}></path>
        </svg>
      </Button>
    </span>
  </span>
  {#if endText}
    <span class="ui-end-text" id={endTextId}>{@render content(endText)}</span>
  {/if}
</opui-number-stepper>
