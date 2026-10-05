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
    srLabel,

    // Snippets
    children,
    indicator,
    ...rest
  }: Props = $props()
</script>

<Anchor
  class={[
    "ui-badge",
    {
      "ui-dot": dot,
      "ui-invisible": invisible,
    },
    alignment && `ui-${alignment}`,
    color && `ui-${color}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
  {#snippet anchored()}
    <span class="ui-badge-indicator">
      {dot ? "" : label}
      {#if !dot}{@render indicator?.()}{/if}
      {#if srLabel}<span class="ui-sr-only">{srLabel}</span>{/if}
    </span>
  {/snippet}
</Anchor>
