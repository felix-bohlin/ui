<script lang="ts">
  import type { TermProps as Props } from "./types.svelte"

  const { children, class: className, ...rest }: Props = $props()

  let element = $state<HTMLElement | null>(null)
  export { element as this }
</script>

<dt bind:this={element} class={["ui-term", className]} {...rest}>
  {@render children?.()}
</dt>
