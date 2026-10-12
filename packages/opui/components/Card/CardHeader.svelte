<script lang="ts">
  import type { CardHeaderProps as Props } from "./types.svelte"

  let { children, class: className, ...rest }: Props = $props()
</script>

<hgroup class={[className]} {...rest}>
  {@render children?.()}
</hgroup>
