<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { warnUnnamed } from "../dev"
  import CheckboxInput from "./CheckboxInput.svelte"
  import type { Props } from "./types.svelte"

  let {
    checked = $bindable(),
    card,
    class: className,
    error,
    group = $bindable(),
    hideLabel,
    label,
    orientation,
    size,
    spread,
    variant,
    style,

    // Snippets
    children,
    endText,
    ...rest
  }: Props = $props()

  untrack(() =>
    warnUnnamed(
      "Checkbox",
      label || children || rest["aria-label"] || rest["aria-labelledby"],
    ),
  )
</script>

<label
  class={[
    "ui-checkbox",
    {
      "ui-card": card,
      "ui-spread": spread,
    },
    card && variant && variant !== "outlined" && `ui-${variant}`,
    orientation && orientation !== "horizontal" && `ui-${orientation}`,
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  <CheckboxInput
    {...rest}
    aria-invalid={error ? "true" : rest["aria-invalid"]}
    bind:checked
    bind:group
  />
  {#if label || children}
    <span class={[hideLabel ? "ui-sr-only" : "ui-label"]}>
      {label}{@render children?.()}
    </span>
  {/if}
  {#if endText}
    <span class="ui-end-text">
      {@render content(endText)}
    </span>
  {/if}
</label>
