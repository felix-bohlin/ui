<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    max,
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
