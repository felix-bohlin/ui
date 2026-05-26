<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Field Set" as const

  const {
    as: Tag = "fieldset",
    children,
    class: className,
    ...rest
  }: Props = $props()

  let element = $state<HTMLFieldSetElement | HTMLElement | null>(null)
  export { element as this }
</script>

<svelte:element
  this={Tag}
  bind:this={element}
  class={["ui-fieldset", className]}
  {...rest}
>
  {@render children?.()}
</svelte:element>
