<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Field Description" as const

  const { children, class: className, ...rest }: Props = $props()

  let element = $state<HTMLParagraphElement | null>(null)
  export { element as this }
</script>

<p bind:this={element} class={["field-description", className]} {...rest}>
  {@render children?.()}
</p>
