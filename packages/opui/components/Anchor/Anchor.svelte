<script lang="ts">
  import type { Props } from "./types.svelte"

  let {
    alignment,
    class: className,
    id: idProp,
    ref = $bindable(null),
    trigger = "always",

    // Snippets
    anchored,
    children,
    ...rest
  }: Props = $props()

  const uid = $props.id()

  const insetMap: Record<string, string> = {
    "start start": "auto 100% 100% auto",
    "start end": "auto auto 100% 100%",
    "end start": "100% 100% auto auto",
    "end end": "100% auto auto 100%",
  }

  const isHover = $derived(trigger === "hover")
  const id = $derived(isHover ? (idProp ?? uid) : undefined)
</script>

<span
  bind:this={ref}
  class={["ui-anchor", className]}
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
