<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    max,
    round,
    style,
    value,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div
  class={[
    "ui-progress",
    { "ui-round": round },
    variant && variant !== "tonal" && `ui-${variant}`,
    className,
  ]}
  {style}
>
  {#key value == null}
    <progress {max} {value} {...rest}>
      {@render children?.()}
    </progress>
  {/key}
</div>
