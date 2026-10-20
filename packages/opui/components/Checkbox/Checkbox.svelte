<script lang="ts">
  import { untrack } from "svelte"
  import { content } from "../content.svelte"
  import { warnUnnamed } from "../dev"
  import CheckboxInput from "./CheckboxInput.svelte"
  import type { Props } from "./types.svelte"

  let {
    checked = $bindable(),
    class: className,
    error,
    group = $bindable(),
    hideLabel,
    size,
    spread,
    stack,
    style,

    // Snippets
    children,
    endText,
    ...rest
  }: Props = $props()

  untrack(() =>
    warnUnnamed(
      "Checkbox",
      children || rest["aria-label"] || rest["aria-labelledby"],
    ),
  )
</script>

<label
  class={[
    "ui-checkbox",
    {
      "ui-spread": spread,
      "ui-stack": stack,
    },
    size && `ui-${size}`,
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
