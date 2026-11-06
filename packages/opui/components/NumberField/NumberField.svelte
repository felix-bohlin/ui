<script lang="ts">
  import "../../elements/number-field.js"
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import Button from "../Button/Button.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { idRefs } from "../id"
  import { minusPath, plusPath } from "./icons"
  import type { Props } from "./types.svelte"

  let {
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    class: className,
    decreaseLabel = "Decrease",
    error,
    hideLabel,
    id,
    increaseLabel = "Increase",
    name,
    size,
    spread,
    stretch,
    style,
    value = $bindable(),
    variant,

    // Snippets
    decreaseIcon,
    endText,
    increaseIcon,
    label,
    startText,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
  const uid = $props.id()
  const initialValue = untrack(() => value)
  const base = $derived(id ?? `number-field-${uid}`)
  const inputId = $derived(base)
  const startTextId = $derived(startText ? `${base}-start-text` : undefined)
  const endTextId = $derived(endText ? `${base}-end-text` : undefined)
</script>

<opui-number-field
  class={[
    "ui-number-field",
    {
      "ui-filled": variant === "filled",
      "ui-spread": spread,
      "ui-stretch": stretch,
    },
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  {#if label}<label
      class={[hideLabel ? "ui-sr-only" : "ui-label"]}
      for={inputId}>{@render content(label)}</label
    >{/if}
  {#if startText}<span class="ui-start-text" id={startTextId}
      >{@render content(startText)}</span
    >{/if}
  <span class="ui-field">
    <span class="ui-start">
      <Button
        aria-controls={inputId}
        aria-label={decreaseLabel}
        command="--step-down"
        commandfor={inputId}
        round
      >
        {#if decreaseIcon}{@render decreaseIcon()}{:else}
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d={minusPath} />
          </svg>
        {/if}
      </Button>
    </span>
    <input
      {...rest}
      aria-describedby={idRefs(startTextId, endTextId, ariaDescribedBy)}
      aria-invalid={error ? "true" : ariaInvalid}
      id={inputId}
      name={name ?? field?.name}
      type="number"
      bind:value
      defaultValue={initialValue}
    />
    <span class="ui-end">
      <Button
        aria-controls={inputId}
        aria-label={increaseLabel}
        command="--step-up"
        commandfor={inputId}
        round
      >
        {#if increaseIcon}{@render increaseIcon()}{:else}
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d={plusPath} />
          </svg>
        {/if}
      </Button>
    </span>
  </span>
  {#if endText}<span class="ui-end-text" id={endTextId}
      >{@render content(endText)}</span
    >{/if}
</opui-number-field>
