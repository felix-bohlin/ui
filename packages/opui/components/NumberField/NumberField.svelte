<script lang="ts">
  import "../../elements/number-field.js"
  import { content } from "../content.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    decreaseLabel = "Decrease",
    for: htmlFor,
    hideLabel,
    increaseLabel = "Increase",
    size,
    spread,
    stretch,
    variant,

    // Snippets
    children,
    decreaseIcon,
    endText,
    increaseIcon,
    label,
    startText,
    ...rest
  }: Props = $props()

  const startTextId = $derived(startText ? `${htmlFor}-start-text` : undefined)
  const endTextId = $derived(endText ? `${htmlFor}-end-text` : undefined)
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
  {...rest}
>
  {#if label}
    <label class={hideLabel ? "ui-sr-only" : "ui-label"} for={htmlFor}>
      {@render content(label)}
    </label>
  {/if}
  {#if startText}
    <span class="ui-start-text" id={startTextId}>
      {@render content(startText)}
    </span>
  {/if}
  <span class="ui-field-container">
    <span class="ui-start">
      <button
        class="ui-button ui-round"
        type="button"
        aria-controls={htmlFor}
        aria-label={decreaseLabel}
        command="--step-down"
        commandfor={htmlFor}
      >
        {#if decreaseIcon}
          {@render decreaseIcon()}
        {:else}
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          ></svg>
        {/if}
      </button>
    </span>
    {@render children?.()}
    <span class="ui-end">
      <button
        class="ui-button ui-round"
        type="button"
        aria-controls={htmlFor}
        aria-label={increaseLabel}
        command="--step-up"
        commandfor={htmlFor}
      >
        {#if increaseIcon}
          {@render increaseIcon()}
        {:else}
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          ></svg>
        {/if}
      </button>
    </span>
  </span>
  {#if endText}
    <span class="ui-end-text" id={endTextId}>
      {@render content(endText)}
    </span>
  {/if}
</opui-number-field>
