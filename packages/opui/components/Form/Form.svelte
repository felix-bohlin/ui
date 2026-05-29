<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Form" as const

  const {
    as: Tag = "form",
    children,
    class: className,
    ...rest
  }: Props = $props()

  let element = $state<HTMLFormElement | HTMLElement | null>(null)
  export { element as this }
</script>

<svelte:element
  this={Tag}
  bind:this={element}
  class={["ui-form", className]}
  {...rest}
>
  {@render children?.()}
</svelte:element>
