<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { hasName, warnUnnamed } from "../dev"
  import SwitchInput from "./SwitchInput.svelte"
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
    iconChecked,
    iconUnchecked,
    ...rest
  }: Props = $props()

  untrack(() => warnUnnamed("Switch", hasName({ ...rest, label }, children)))
</script>

<label
  class={[
    "ui-switch",
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
  {#if iconUnchecked}
    <span class="ui-icon-unchecked" aria-hidden="true">
      {@render iconUnchecked()}
    </span>
  {/if}
  {#if iconChecked}
    <span class="ui-icon-checked" aria-hidden="true">
      {@render iconChecked()}
    </span>
  {/if}
  <SwitchInput
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
