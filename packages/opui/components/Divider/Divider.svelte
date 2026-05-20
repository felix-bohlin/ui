<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Divider" as const

  const { class: className, variant, ...rest }: Props = $props()
  const variantClass = $derived(variant ? `border-${variant}` : "")

  let element = $state<HTMLHRElement | null>(null)
  export { element as this }
</script>

<hr
  bind:this={element}
  class:list={["divider", className, variantClass]}
  {...rest}
/>
