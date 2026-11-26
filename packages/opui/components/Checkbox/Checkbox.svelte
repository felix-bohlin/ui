<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import CheckboxInput from "./CheckboxInput.svelte"
  import { hasName, warnUnnamed } from "../dev"
  import type { Props } from "./types.svelte"

  let {
    "aria-invalid": ariaInvalid,
    card,
    checked = $bindable(),
    class: className,
    error,
    group = $bindable(),
    hideLabel,
    label,
    orientation,
    size,
    spread,
    style,
    variant,

    // Snippets
    children,
    endText,
    ...rest
  }: Props = $props()

  untrack(() => warnUnnamed("Checkbox", hasName({ ...rest, label }, children)))
</script>

<label
  class={[
    "ui-checkbox",
    { "ui-card": card, "ui-spread": spread },
    card && variant && variant !== "outlined" && `ui-${variant}`,
    orientation && orientation !== "horizontal" && `ui-${orientation}`,
    size && size !== "medium" && `ui-${size}`,
    className,
  ]}
  {style}
>
  <CheckboxInput
    {...rest}
    aria-invalid={error ? "true" : ariaInvalid}
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
