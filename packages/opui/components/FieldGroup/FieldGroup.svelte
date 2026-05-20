<script lang="ts">
  import type { Props } from "./types.svelte"
  export const title = "Field Group" as const

  const {
    children,
    class: className,
    direction,
    name,
    ...rest
  }: Props = $props()

  // TODO: currentFieldName

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }
</script>

<div
  bind:this={element}
  class={["field-group", direction, className]}
  {...rest}
  role="group"
>
  {@render children?.()}
</div>
