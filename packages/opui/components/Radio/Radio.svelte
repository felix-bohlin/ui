<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { warnUnnamed } from "../dev"
  import RadioInput from "./RadioInput.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    error,
    group = $bindable(),
    hideLabel,
    orientation,
    size,
    spread,
    style,

    // Snippets
    children,
    endText,
    ...rest
  }: Props = $props()

  untrack(() =>
    warnUnnamed(
      "Radio",
      children || rest["aria-label"] || rest["aria-labelledby"],
    ),
  )
</script>

<label
  class={[
    "ui-radio",
    {
      "ui-spread": spread,
    },
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
  {#if children}
    <span class={[hideLabel ? "ui-sr-only" : "ui-label"]}>
      {@render children()}
    </span>
  {/if}
  {#if endText}
    <span class="ui-end-text">
      {@render content(endText)}
    </span>
  {/if}
</label>
