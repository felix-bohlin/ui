<script lang="ts">
  import "../../elements/color-field.js"
  import Button from "../Button/Button.svelte"
  import { content } from "../content.svelte"
  import { getFieldGroupContext } from "../FieldGroup/context.svelte"
  import { channelsFor, COLOR_SPACES } from "./channels"
  import { copyPath, eyedropperPath } from "./icons"
  import type { Props } from "./types.svelte"

  const generatedId = $props.id()

  let {
    autoFit,
    blacknessLabel,
    blueLabel,
    chromaLabel,
    class: className,
    colorSpaceLabel = "Color space",
    contrastLabel,
    copiedLabel,
    copyLabel = "Copy",
    error,
    eyedropperLabel = "Pick from the screen",
    greenLabel,
    hideLabel,
    hueLabel,
    id,
    invalidText,
    lightnessLabel,
    name,
    opacity,
    opacityLabel,
    p3Text,
    pickerLabel = "Pick a color",
    redLabel,
    saturationLabel,
    size,
    spread,
    srgbText,
    style,
    swatchOnly,
    value = $bindable(),
    variant,
    whitenessLabel,
    wideText,

    // Snippets
    endText,
    label,
    startText,
    ...rest
  }: Props = $props()

  const field = getFieldGroupContext()
  const inputId = $derived(id ?? generatedId)
</script>

<opui-color-field
  blackness-label={blacknessLabel}
  blue-label={blueLabel}
  chroma-label={chromaLabel}
  class={["ui-color-field", { "ui-swatch-only": swatchOnly }, className]}
  contrast-label={contrastLabel}
  copied-label={copiedLabel}
  green-label={greenLabel}
  hue-label={hueLabel}
  invalid-text={invalidText}
  lightness-label={lightnessLabel}
  p3-text={p3Text}
  red-label={redLabel}
  saturation-label={saturationLabel}
  srgb-text={srgbText}
  {style}
  whiteness-label={whitenessLabel}
  wide-text={wideText}
>
  {#if swatchOnly}
    <Button
      aria-describedby={rest["aria-describedby"]}
      aria-labelledby={`${inputId}-label`}
      command="toggle-popover"
      commandfor={`${inputId}-picker`}
      round
      {size}
    >
      <span class="ui-indicator"></span>
    </Button>
  {:else}
    <div
      class={[
        "ui-text-field",
        {
          "ui-auto-fit": autoFit,
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
  {/if}
  <div
    aria-labelledby={`${inputId}-label`}
    class="ui-floating"
    id={`${inputId}-picker`}
    popover="auto"
    role="dialog"
  >
    <div class="ui-header">
      <span aria-hidden="true" class="ui-value"></span>
      <span class="ui-actions">
        <Button
          aria-label={eyedropperLabel}
          command="--eyedropper"
          commandfor={inputId}
          hidden
          round
          size="small"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d={eyedropperPath}></path>
          </svg>
        </Button>
        <Button
          aria-label={copyLabel}
          command="--copy"
          commandfor={inputId}
          round
          size="small"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d={copyPath}></path>
          </svg>
        </Button>
      </span>
      <span class="ui-sr-only" role="status"></span>
    </div>
    {#if swatchOnly}
      <div
        class={[
          "ui-text-field",
          {
            "ui-auto-fit": autoFit,
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
    {/if}
    <div aria-hidden="true" class="ui-panel">
      <canvas></canvas>
    </div>
    <label class="ui-select ui-small ui-spread">
      <span class="ui-label" id={`${inputId}-space-label`}
        >{colorSpaceLabel}</span
      >
      <span class="ui-field">
        <select
          aria-describedby={`${inputId}-gamut`}
          aria-labelledby={`${inputId}-space-label`}
          id={`${inputId}-space`}
        >
          {#each COLOR_SPACES as space (space)}
            <option selected={space === "oklch" || undefined} value={space}
              >{space}</option
            >
          {/each}
        </select>
      </span>
    </label>
    {#each channelsFor( opacity, { chroma: chromaLabel, hue: hueLabel, lightness: lightnessLabel, opacity: opacityLabel } ) as slider (slider.name)}
      <label for={`${inputId}-${slider.name}`}>
        <span class="ui-label" id={`${inputId}-${slider.name}-label`}
          >{slider.label}</span
        >
        <output
          aria-live="off"
          class="ui-value"
          for={`${inputId}-${slider.name}`}
        ></output>
        <input
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
    <p class="ui-footer">
      <span aria-hidden="true" data-contrast="light"></span>
      <span aria-hidden="true" data-contrast="dark"></span>
      <span class="ui-sr-only"></span>
    </p>
  </div>
</opui-color-field>
