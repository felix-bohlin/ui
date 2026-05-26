<script lang="ts">
  import { setContext } from "svelte"
  import type { Props } from "./types.svelte"
  import type * as FieldSet from "../FieldSet/types.svelte"
  export const title = "Field Group" as const

  const {
    children,
    class: className,
    direction,
    name,
    ...rest
  }: Props = $props()

  $effect(() => {
    setContext<FieldSet.Context["name"]>("name", name)
  })

  let element = $state<HTMLDivElement | null>(null)
  export { element as this }
  const classes = $derived([
    "ui-field-group",
    direction && `ui-${direction}`,
    className,
  ])
</script>

<div bind:this={element} class={classes} {...rest} role="group">
  {@render children?.()}
</div>
