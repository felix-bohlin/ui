<script lang="ts">
  import "../../elements/color-field.js"
  import Button from "../Button/Button.svelte"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { channelsFor } from "./channels"
  import type { Props } from "./types.svelte"

  const generatedId = $props.id()

  let {
    alpha,
    class: className,
    error,
    hideLabel,
    id,
    name,
    pickerLabel = "Pick a color",
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
</script>

<opui-color-field class={["ui-color-field", className]} {style}>
  <div
    class={[
      "ui-text-field",
      {
        "ui-filled": variant === "filled",
        "ui-spread": spread,
      },
      size && size !== "medium" && `ui-${size}`,
    ]}
  >
    {#if label}
      <label
        class={[hideLabel ? "ui-sr-only" : "ui-label"]}
        for={inputId}
        id={`${inputId}-label`}>{@render content(label)}</label
      >
    {/if}
    {#if startText}
      <span class="ui-start-text">{@render content(startText)}</span>
    {/if}
    <span class="ui-field">
      <span class="ui-start">
        <Button
          aria-label={pickerLabel}
          command="toggle-popover"
          commandfor={`${inputId}-picker`}
          round
        >
          <span class="ui-indicator"></span>
        </Button>
      </span>
      <input
        autocomplete="off"
        spellcheck="false"
        {...rest}
        aria-invalid={error ? "true" : rest["aria-invalid"]}
        bind:value
        id={inputId}
        name={name ?? field?.name}
        type="text"
      />
    </span>
    {#if endText}
      <span class="ui-end-text">{@render content(endText)}</span>
    {/if}
  </div>
  <div
    aria-labelledby={`${inputId}-label`}
    class="ui-floating"
    id={`${inputId}-picker`}
    popover="auto"
    role="dialog"
  >
    {#each channelsFor(alpha) as slider (slider.name)}
      <label class="ui-range" for={`${inputId}-${slider.name}`}>
        <span class="ui-label" id={`${inputId}-${slider.name}-label`}
          >{slider.label}</span
        >
        <output
          aria-live="off"
          class="ui-value"
          for={`${inputId}-${slider.name}`}
        ></output>
        <input
          aria-describedby={slider.channel === "C"
            ? `${inputId}-gamut`
            : undefined}
          aria-labelledby={`${inputId}-${slider.name}-label`}
          data-channel={slider.channel}
          id={`${inputId}-${slider.name}`}
          max={slider.max}
          min="0"
          step={slider.step}
          type="range"
        />
      </label>
    {/each}
    <p class="ui-description" id={`${inputId}-gamut`}></p>
  </div>
</opui-color-field>
