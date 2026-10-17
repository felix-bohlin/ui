<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    children,
    class: className,
    max,
    style,
    value,
    variant,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-progress", variant && `ui-${variant}`, className]} {style}>
  {#key value == null}
    <progress {max} {value} {...rest}>
      {@render children?.()}
    </progress>
  {/key}
</div>
