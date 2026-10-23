<script lang="ts">
  import Anchor from "../Anchor/Anchor.svelte"
  import AnchorContent from "../Anchor/AnchorContent.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    color,
    corner,
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
    corner && corner !== "start-end" && `ui-${corner}`,
    color && `ui-${color}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
  <AnchorContent>
    <span class="ui-badge-indicator">
      {dot ? "" : label}
      {#if !dot}{@render indicator?.()}{/if}
      {#if srLabel}<span class="ui-sr-only">{srLabel}</span>{/if}
    </span>
  </AnchorContent>
</Anchor>
