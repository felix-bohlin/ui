<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    class: className,
    max,
    value,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()
</script>

<div class={["ui-progress", variant && `ui-${variant}`, className]}>
  {#key value == null}
    <progress {max} {value} {...rest}>
      {@render children?.()}
    </progress>
  {/key}
</div>
