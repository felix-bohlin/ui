<script lang="ts">
  import Anchor from "../Anchor/Anchor.svelte"
  import type { Props } from "./types.svelte"

  let {
    alignment,
    class: className,
    color,
    dot,
    invisible,
    label,
    ref = $bindable(null),

    // Snippets
    children,
    indicator,
    ...rest
  }: Props = $props()

  const positionArea = $derived(
    alignment === "start-start"
      ? "start start"
      : alignment === "end-start"
        ? "end start"
        : alignment === "end-end"
          ? "end end"
          : undefined,
  )
</script>

<Anchor
  bind:ref
  alignment={positionArea}
  class={[
    "ui-badge",
    {
      "ui-dot": dot,
      "ui-invisible": invisible,
    },
    alignment && `ui-${alignment}`,
    className,
    color && `ui-${color}`,
  ]}
  {...rest}
>
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
