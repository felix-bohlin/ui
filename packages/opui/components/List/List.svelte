<script lang="ts">
  import type { Props } from "./types.svelte.ts"

  export const title = "List" as const

  let {
    bordered,
    class: className,
    dense,
    gutterless,
    variant,

    // Snippets
    children,
    ...rest
  }: Props = $props()

  let element = $state<HTMLUListElement | null>(null)
  export { element as this }
  const classes = $derived([
    "ui-list",
    {
      "ui-bordered": bordered,
      "ui-dense": dense,
      "ui-gutterless": gutterless,
    },
    variant && `ui-${variant}`,
    className,
  ])
</script>

<ul bind:this={element} class={classes} {...rest}>
  {@render children?.()}
</ul>
