<script lang="ts">
  import type { DescriptionListItemProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<div class={["ui-item", className]} {...rest}>
  {@render children?.()}
</div>
