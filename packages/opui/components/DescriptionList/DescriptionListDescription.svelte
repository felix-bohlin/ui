<script lang="ts">
  import type { DescriptionProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<dd class={["ui-description", className]} {...rest}>
  {@render children?.()}
</dd>
