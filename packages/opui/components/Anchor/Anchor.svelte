<script lang="ts">
  import type { Props } from "./types.svelte"

  const {
    alignment,
    class: className,
    id: idProp,
    trigger = "always",

    // Snippets
    anchored,
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()

  let element = $state<HTMLSpanElement | null>(null)
  export { element as this }

  const insetMap: Record<string, string> = {
    "start start": "auto 100% 100% auto",
    "start end": "auto auto 100% 100%",
    "end start": "100% 100% auto auto",
    "end end": "100% auto auto 100%",
  }

  const isHover = $derived(trigger === "hover")
  const id = $derived(isHover ? (idProp ?? uid) : undefined)
  const classes = $derived(["ui-anchor", className])
</script>

<span
  bind:this={element}
  class={classes}
  style:--anchor-position-area={alignment}
  style:--_anchor-inset={alignment ? insetMap[alignment] : undefined}
  {...rest}
>
  {#if isHover}
    <span {...{ interestfor: id }}>
      {@render children?.()}
    </span>
  {:else}
    {@render children?.()}
  {/if}
  <span class="ui-anchor-floating" {id} popover={isHover ? "hint" : undefined}>
    {@render anchored?.()}
  </span>
</span>
