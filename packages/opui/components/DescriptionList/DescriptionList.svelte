<script lang="ts">
  import type { Props } from "./types.svelte"

  export const title = "Description List" as const

  const { bordered, children, class: className, ...rest }: Props = $props()

  let element = $state<HTMLDListElement | null>(null)
  export { element as this }

  const classes = $derived([
    "ui-description-list",
    { "ui-bordered": bordered, "ui-dotted": bordered === "dotted" },
    className,
  ])
</script>

<dl bind:this={element} class={classes} {...rest}>
  {@render children?.()}
</dl>
