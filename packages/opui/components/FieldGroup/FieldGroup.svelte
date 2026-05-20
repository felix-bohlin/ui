<script lang="ts">
  import { setContext } from "svelte"
  import type { Props, Context } from "./types.svelte"
  export const title = "Field Group" as const

  const {
    children,
    class: className,
    direction,
    name,
    ...rest
  }: Props = $props()

  $effect(() => {
    setContext<Context["currentFieldName"]>("currentFieldName", name)
  })

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
