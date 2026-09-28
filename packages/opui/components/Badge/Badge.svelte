<script lang="ts">
  import Anchor from "../Anchor/Anchor.svelte"
  import type { Props } from "./types.svelte"

  const {
    alignment,
    class: className,
    color,
    dot,
    invisible,
    label,

    // Snippets
    children,
    indicator,
    ...rest
  }: Props = $props()

  let anchor = $state<ReturnType<typeof Anchor> | null>(null)
  const element = $derived<HTMLSpanElement | null>(anchor?.this ?? null)
  export { element as this }

  const positionArea = $derived(
    alignment === "start-start"
      ? "start start"
      : alignment === "end-start"
        ? "end start"
        : alignment === "end-end"
          ? "end end"
          : undefined,
  )

  const classes = $derived([
    "ui-badge",
    {
      "ui-dot": dot,
      "ui-invisible": invisible,
    },
    alignment && `ui-${alignment}`,
    className,
    color && `ui-${color}`,
  ])
</script>

<Anchor bind:this={anchor} alignment={positionArea} class={classes} {...rest}>
  {@render children?.()}
  {#snippet anchored()}
    <span class="ui-badge-indicator" aria-label={label?.toString()}>
      {dot ? "" : label}
      {#if !dot}
        {@render indicator?.()}
      {/if}
    </span>
  {/snippet}
</Anchor>
