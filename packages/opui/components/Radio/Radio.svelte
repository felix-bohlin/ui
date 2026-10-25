<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { hasName, warnUnnamed } from "../dev"
  import RadioInput from "./RadioInput.svelte"
  import type { Props } from "./types.svelte"

  let {
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

  untrack(() => warnUnnamed("Radio", hasName({ ...rest, label }, children)))
</script>

<label
  class={[
    "ui-radio",
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
  <RadioInput
    {...rest}
    aria-invalid={error ? "true" : rest["aria-invalid"]}
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
