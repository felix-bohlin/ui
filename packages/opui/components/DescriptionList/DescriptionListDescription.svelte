<script lang="ts">
  import type { DescriptionListDescriptionProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<dd class={[className]} {...rest}>
  {@render children?.()}
</dd>
