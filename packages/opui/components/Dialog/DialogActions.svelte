<script lang="ts">
  import type { DialogActionsProps as Props } from "./types.svelte"

  let { align, children, class: className, ...rest }: Props = $props()
</script>

<div class={["ui-actions", align && `ui-align-${align}`, className]} {...rest}>
  {@render children?.()}
</div>
