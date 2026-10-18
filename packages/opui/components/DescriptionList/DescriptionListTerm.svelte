<script lang="ts">
  import type { DescriptionListTermProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<dt class={[className]} {...rest}>
  {@render children?.()}
</dt>
