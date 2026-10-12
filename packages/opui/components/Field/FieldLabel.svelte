<script lang="ts">
  import type { FieldLabelProps as Props } from "./types.svelte"

  let { children, class: className, visuallyHidden, ...rest }: Props = $props()
</script>

<span class={[visuallyHidden ? "ui-sr-only" : "ui-label", className]} {...rest}>
  {@render children?.()}
</span>
