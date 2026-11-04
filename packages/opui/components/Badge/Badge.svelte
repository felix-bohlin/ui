<script lang="ts">
  import Anchor from "../Anchor/Anchor.svelte"
  import AnchorContent from "../Anchor/AnchorContent.svelte"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    color,
    corner,
    dot,
    hideLabel,
    invisible,
    label,

    // Snippets
    children,
    indicator,
    ...rest
  }: Props = $props()

  const hidden = $derived(dot || hideLabel)
</script>

<Anchor
  class={[
    "ui-badge",
    { "ui-dot": dot, "ui-invisible": invisible },
    color && `ui-${color}`,
    corner && corner !== "start-end" && `ui-${corner}`,
    className,
  ]}
  {...rest}
>
  {@render children?.()}
  <AnchorContent>
    <span class="ui-indicator"
      >{#if hidden}{#if !dot && indicator}<span aria-hidden="true"
            >{@render indicator?.()}</span
          >{/if}{#if label}<span class="ui-sr-only">{label}</span
          >{/if}{/if}{hidden
        ? undefined
        : label}{#if !hidden}{@render indicator?.()}{/if}</span
    >
  </AnchorContent>
</Anchor>
