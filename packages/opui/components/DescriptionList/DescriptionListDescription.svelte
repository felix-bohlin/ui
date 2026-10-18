<script lang="ts">
  import type { DescriptionProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<dd class={[className]} {...rest}>
  {@render children?.()}
</dd>
