<script lang="ts">
  import type { DescriptionProps as Props } from "./types.svelte"

  const { children, class: className, ...rest }: Props = $props()

  let element = $state<HTMLElement | null>(null)
  export { element as this }
</script>

<dd bind:this={element} class={["ui-description", className]} {...rest}>
  {@render children?.()}
</dd>
