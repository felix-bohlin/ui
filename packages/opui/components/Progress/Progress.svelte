<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    children,
    class: className,
    max,
    value,
    variant,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-progress", variant && `ui-${variant}`, className]}>
  <progress {max} {value} {...rest}>
    {@render children?.()}
  </progress>
</div>
