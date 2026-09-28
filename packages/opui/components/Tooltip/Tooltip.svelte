<script lang="ts">
  import type { Props } from "./types.svelte"
  import Anchor from "../Anchor/Anchor.svelte"

  const {
    alignment,
    arrow,
    class: className,
    id,
    label,

    // Snippets
    children,
    content,
    ...rest
  }: Props = $props()

  let anchor = $state<ReturnType<typeof Anchor> | null>(null)
  const element = $derived<HTMLSpanElement | null>(anchor?.this ?? null)
  export { element as this }

  const classes = $derived([
    "ui-tooltip",
    { "ui-with-arrow": arrow },
    className,
  ])
</script>

<Anchor
  bind:this={anchor}
  {alignment}
  class={classes}
  {id}
  trigger="hover"
  {...rest}
>
  {@render children?.()}
  {#snippet anchored()}
    {label}
    {@render content?.()}
  {/snippet}
</Anchor>
